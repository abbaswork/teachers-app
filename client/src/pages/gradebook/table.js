import React, { useState, useEffect } from 'react';
import axios from 'axios';
import auth from './../../auth/auth';
import { useTable, usePagination } from 'react-table';
import makeData from './makeData';

/* UI Libraries */
import { Button } from 'reactstrap';



// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  column: {disabled},
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
// Set our editable cell renderer as the default Cell renderer


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
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
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

  // Render the UI for your table
  return (
    <div className="tableContainer">
      <div className="tableWrap">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps({ style: {width: '10px'}})}>{column.render('Header')}</th>
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
      
      {/* Adding pagination to table */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      </div>
    </div>
  )
}


function GraphTable(props) {

  /* declare states and columns */
  const [data, setData] = React.useState([]);
  const [assesments, setAssesments] = React.useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const columns =
    [
      {
        Header: 'Student',
        columns: [
          {
            Header: 'First Name',
            accessor: 'first',
            Cell: ({ row}) => <span>{row.values.first}</span>
          },
          {
            Header: 'Last Name',
            accessor: 'last',
            Cell: ({ row}) => <span>{row.values.first}</span>
          },
        ],
      }, ...assesments, 
      {
        Header: 'Actions',
        id: 'actions',
        Cell: ({ row }) => (
          <span>
            <Button color="primary" onClick={() => updateStudentRow(row)}>Save</Button>
            <Button color="primary" onClick={() => deleteStudentRow(row)}>Delete</Button>
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

        /* map columns */
        var assignmentHeaders = [];
        resp.data.assignments.map((assignment, index) => {
          assignmentHeaders.push({
            Header: `${assignment.name}`,
            columns: [
              {
                Header: 'grade',
                accessor: `${assignment.id}.grade`,
                Cell: ({row}) => <span>{row.values[`${assignment.id}.grade`]}</span>
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
          })
        });
        setAssesments(assignmentHeaders);
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
      await axios.put(process.env.REACT_APP_SERVER_URL + '/student/' + props.classId,
        { studentRow: row.original },
        { auth: { username: auth.email, password: auth.password } });
    } catch (e) {
      console.log(e);
    }

  }

    /* function that deletes student row */
    const deleteStudentRow = async (row) => {

      /* update data to remove rows */
      setSkipPageReset(true);
      setData(old =>
        old.filter(item => item.id != row.original.id)
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
          return {
            ...old[rowIndex],
            [colId]: colName ? {[colName]: value} : value,
          }
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
      {/* Button that creates a new student row in the table */}
      <Button color="primary" onClick={addStudentRow}>Create Student</Button>
      <Table
        columns={columns}
        data={data || []}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </>
  )
}

export default GraphTable;
