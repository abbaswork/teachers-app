import React from "react";
import dateFormat from "dateformat";

/* Component Import */
import Subtask from './subtask';

/* Ui imports */
import {
    Row, Col,
    Card, CardText,
    ListGroup, ListGroupItem,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Input
} from 'reactstrap';
import { BsFillClockFill, BsCardChecklist, BsFillPlusSquareFill, BsThreeDots } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const db = [
    {
        id: '123',
        name: 'Print Worksheets that field has overflow',
        date: new Date(),
    },
    {
        id: '1234',
        name: 'Download Video',
        date: new Date()
    },
];

export default class SectionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dropdownOpen: false,
            collapse: false,
            subTasks: [],

            /* Edit fields */
            editName: false,
            newName: '',
            editDate: false,
            newDate: new Date(),
            addSubtask: false,
            newSubTask: ''
        }
    }

    /* Internal Event Handlers */
    componentDidMount() {
        this.setState({ data: db });
    }

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });
    collapse = () => this.setState({ collapse: !this.state.collapse });


    handleUpdate = (field, value, toggle) => {

        console.log(field, value, toggle);

        /* Turn off new field and update through passed function handler */
        this.setState({ [toggle]: false }, function () { console.log('callback: ', this.state) });
        this.props.handleUpdateTask(this.props.task.id, field, value);
    }

    /* Subtask Handlers to pass to children  */
    handleDeleteSubtask = (id) => {

        console.log(id);

        /* filter array based on id and set as new sections */
        var rmSubtasks = this.state.data.filter(subtask => subtask.id !== id);
        this.setState({ data: rmSubtasks });
    }

    /* Handler for updating sections name and color */
    handleUpdateSubtask = (id, field, value) => {

        /* find index to update, and update state with updated copy */
        var subtasks = this.state.data;
        var idIndex = subtasks.findIndex((subtask => subtask.id === id));
        subtasks[idIndex][field] = value;
        this.setState({ data: subtasks });

    }

    handleAddSubtask = (value) => {
        this.setState({ data: [{ id: '26', name: value, date: new Date() }, ...this.state.data] })
    }

    render() {

        return (
            <Card className={this.props.className} body>
                <Row className="mb-2">
                    <Col xs="10">
                        <CardText tag="h5">
                            {this.state.editName ?
                                <Input type="text" onChange={(e) => this.setState({ newName: e.target.value })}
                                    onKeyPress={(e) => e.key === 'Enter' ? this.handleUpdate('name', this.state.newName, 'editName') : null} />
                                : this.props.task.name
                            }
                        </CardText>
                    </Col>
                    <Col className="text-right" xs="2">

                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle tag="div" style={{ cursor: 'pointer' }}>
                                <BsThreeDots />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Task Options</DropdownItem>
                                <DropdownItem onClick={() => this.setState({ editName: true })}>Edit Task</DropdownItem>
                                <DropdownItem onClick={this.props.handleDeleteTask.bind(this, this.props.task.id)} >Delete it</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
                <ListGroup flush>
                    {/* Card Date and Sub task sections */}
                    <ListGroupItem tag="div" className="pl-0" style={{ outline: 'none' }} action>
                        <Row>
                            <Col xs="1">
                                <BsFillClockFill className="text-orange" />
                            </Col>
                            <Col className="" xs="10">

                                {this.state.editDate ?
                                    <DatePicker
                                        selected={this.props.task.date}
                                        onChange={(e) => this.handleUpdate('date', e, 'editDate')}
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        showTimeInput
                                    />
                                    : <CardText onClick={() => this.setState({ editDate: true })} style={{ cursor: 'pointer' }} >
                                        {dateFormat(this.props.task.date, "	ddd mmm dd yyyy, HH:MM TT")}
                                    </CardText>
                                }
                            </Col>
                        </Row>
                    </ListGroupItem>
                    {/* Toggle for subtasks with subtasks */}
                    <ListGroupItem tag="button" className="pl-0 border-bottom-0" onClick={this.collapse} action>
                        <Row>
                            <Col xs="1">
                                <BsCardChecklist className="text-orange" />
                            </Col>
                            <Col xs="10">
                                <CardText className="">Sub Tasks</CardText>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <div className="content" style={{ maxHeight: (this.state.collapse ? '100vh' : '0px'), overflow: (this.state.collapse ? 'visible' : 'hidden') }}>
                        {this.state.data.map((subTask) =>
                            <Subtask subTask={subTask} handleDeleteSubtask={this.handleDeleteSubtask} handleUpdateSubtask={this.handleUpdateSubtask} />
                        )}
                    </div>
                </ListGroup>

                {/* Add more Subtasks */}
                <Row>
                    <Col xs="1">
                        <BsFillPlusSquareFill className="text-orange" style={{ cursor: 'pointer' }} onClick={() => this.setState({ addSubtask: true })/*this.handleAddSubtask.bind(this, 'new Subtask')*/} />
                    </Col>
                    <Col xs="10">
                        {this.state.addSubtask &&
                            <Input className="pl-0" type="text" value={this.state.newSubTask} onChange={(e) => this.setState({ newSubTask: e.target.value })} onKeyPress={(e) => e.key === 'Enter' ? this.setState({ data: [...this.state.data, { id: '123', name: this.state.newSubTask }], addSubtask: false }) : null} />
                        }
                    </Col>
                </Row>

            </Card>
        );
    }
}
