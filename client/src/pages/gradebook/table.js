import React, { useEffect } from 'react';
import axios from 'axios';
import auth from './../../auth/auth';
import { useTable, usePagination } from 'react-table';

/* UI Libraries */
import { Button, Alert, Row, Col, Container } from 'reactstrap';
import { BsFillTrashFill} from "react-icons/bs";
import ConfirmAlert from '../../core/confirmAlert';

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  column: { disabled },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} disabled={disabled} />
}

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const defaultColumn = React.useMemo(
    () => ({
      Cell: EditableCell,
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination
  )

  console.log('page inde: ', pageIndex);
  console.log('page count: ', pageCount);


  // Render the UI for your table
  return (
    <div className="tableContainer shadow">
      <div className="tableWrap">
        <table {...getTableProps()}>
          <thead className="shadow">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps({ style: { width: '10px' } })}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

        <Row>
          <Col>
            <div className="pagination">
              <button Click={() => gotoPage(0)} disabled={!canPreviousPage}>&laquo;</button>
              {[1, 2, 3, 4, 5].map((row) =>
                <button id={row} key={row} className={pageIndex === (row - 1) ? 'active' : ''} onClick={() => gotoPage(row - 1)} disabled={!(pageCount >= row)}>{row}</button>
              )}
              <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>&raquo;</button>
            </div>
          </Col>
          <Col className="text-right pr-5 my-auto">
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[5, 10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Col>
        </Row>
      </div>
    </div>
  )
}


function GraphTable(props) {

  /* declare states and columns */
  const [data, setData] = React.useState([]);
  const [assesments, setAssesments] = React.useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [updateData, setUpdateData] = React.useState({ title: '', message: '', visible: false });
  const [rowDelete, setRowDelete] = React.useState(null);

  const columns =
    [
      {
        Header: 'Student',
        columns: [
          {
            Header: 'First Name',
            accessor: 'first',
          },
          {
            Header: 'Last Name',
            accessor: 'last',
          },
        ],
      }, ...assesments,
      {
        Header: 'Options',
        id: 'actions',
        Cell: ({ row }) => (
          <span>
            <BsFillTrashFill className="mr-2"
              style={{ cursor: 'pointer', color: 'red', fontSize: '1.5rem' }}
              onClick={() => {
                setRowDelete(row);
                setConfirmDelete(true);
              }} />
          </span>
        ),
      }
    ];


  /* Mount data for table */
  useEffect(() => {
    async function fetchData() {

      try { /* fetch student grades and set table data */
        const resp = await axios.get(process.env.REACT_APP_SERVER_URL + '/student/' + props.classId, {
          auth: { username: auth.email, password: auth.password }
        });
        setData(resp.data.students);
        console.log(resp.data.assignments);

        /* map columns */
        var assignmentHeaders = [];
        resp.data.assignments.map((assignment) => {
          assignmentHeaders.push({
            Header: () => <div style={{ padding: '.25rem .5rem', backgroundColor: assignment.color, color: 'white', textAlign: 'center' }}>{assignment.name}</div>,
            id: assignment.id,
            columns: [
              {
                Header: 'grade',
                accessor: `${assignment.id}.grade`,
              },
              {
                Header: 'points',
                accessor: `${assignment.id}.points`,
                Cell: () => assignment.points,
                disabled: true
              },
              {
                Header: 'weight',
                accessor: `${assignment.id}.weight`,
                Cell: () => assignment.weight,
                disabled: true,
              },
            ],
          });
          setAssesments(assignmentHeaders);
        });
      } catch (e) {
        console.log(e);
      }
    }

    /* call async function */
    fetchData();
  }, []);

  /* Function to add a new student full of empty values that can then be updated */
  const addStudentRow = () => {
    setData([...data,
    {
      id: undefined,
      class_id: props.classId,
      first: '',
      last: '',
    }
    ]);
  };

  /* function that updates student row */
  const updateStudentRow = async (row) => {
    try { /* try to update row */
      var resp = await axios.put(process.env.REACT_APP_SERVER_URL + '/student/' + props.classId,
        { studentRow: row },
        { auth: { username: auth.email, password: auth.password } });

      /* display alert based on server response */
      if (resp.status !== 200) {
        setUpdateData({ type: 'warning', message: 'Student was not updated due to error please refresh page and try again' });
      }
    } catch (e) {
      setUpdateData({ type: 'danger', message: 'Internal Server Error' });
      console.log(e);
    }

  }

  /* function that deletes student row */
  const deleteStudentRow = async (row) => {

    /* update data to remove rows */
    setSkipPageReset(true);
    setData(old =>
      old.filter(item => item.id !== row.original.id)
    );

    try { /* try to remove row by passing student id */
      await axios.delete(process.env.REACT_APP_SERVER_URL + '/student/' + row.original.id,
        { auth: { username: auth.email, password: auth.password } });
    } catch (e) {
      console.log(e);
    }

  }

  /* When our cell renderer calls updateMyData, we'll use the rowIndex, columnId and new value to update the original data */
  const updateMyData = (rowIndex, columnId, value) => {
    /* don't reset page to maintian proper id's */
    setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          /*Split the string using dot notation*/
          var colId = columnId.split(".")[0];
          var colName = columnId.split(".")[1];
          var update = {
            ...old[rowIndex],
            [colId]: colName ? { [colName]: value } : value,
          };
          updateStudentRow(update);
          return update;
        }
        return row
      })
    );
  }

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  return (
    <>
      {/* Model Component to handle confirmation */}
      <ConfirmAlert confirm={confirmDelete} setConfirm={setConfirmDelete}
        title="Delete Student"
        message="Are you sure you want to delete student?"
        confirmAction={deleteStudentRow} confirmData={rowDelete} />

      <Row>
        <Col xs="12">
          {/* non intrusive alert to let the user now about the update, possibly want to include a revert button here */}
          <Alert isOpen={updateData.visible} toggle={() => setUpdateData({ ...updateData, visible: false })} color={updateData.type}>
            {updateData.message}
          </Alert >
        </Col>
      </Row>

      {/* Button that creates a new student row in the table */}
      <Container fluid>
        <Table
          columns={columns}
          data={data || []}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
        <Button style={{backgroundColor: 'orange', border: 'none', float: 'right', marginTop: '1rem'}} onClick={addStudentRow}>Create Student</Button>
      </Container>
    </>
  )
}

export default GraphTable;
