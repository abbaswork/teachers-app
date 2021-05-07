import React from "react";
//import dateFormat from "dateformat";
import axios from 'axios';

/* Component Import */
import Subtask from './subtask';
import auth from './../../auth/auth';

/* Ui imports */
import {
    Row, Col,
    Card, CardText,
    ListGroup, ListGroupItem,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    FormGroup, Label,
    Input
} from 'reactstrap';
import { BsFillClockFill, BsCardChecklist, BsFillPlusSquareFill, BsThreeDots, BsBriefcaseFill, BsGear } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class SectionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dropdownOpen: false,
            collapse: true,
            subTasks: [],

            /* Edit fields */
            editName: false,
            newName: '',
            editDate: false,
            newDate: new Date(),
            addSubtask: false,
            newSubTask: '',
            type: 'Task'
        }
    }

    /* Internal Event Handlers */
    async componentDidMount() {
        if (this.props.task) {
            try {
                const resp = await axios.get(process.env.REACT_APP_SERVER_URL + '/subtask/' + this.props.task.id, {
                    auth: { username: auth.email, password: auth.password }
                });
                this.setState({ data: resp.data });

            } catch (e) {
                console.log(e);
            }
        }
    }

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });
    collapse = () => this.setState({ collapse: !this.state.collapse });


    handleUpdate = (field, value, toggle) => {

        /* Turn off new field and update through passed function handler */
        this.setState({ [toggle]: false });
        this.props.handleUpdateTask(this.props.task.id, field, value);
    }

    /* Subtask Handlers to pass to children  */
    handleDeleteSubtask = async (id) => {
        try { /* Send request to delete subtask and re mount component*/
            await axios.delete(process.env.REACT_APP_SERVER_URL + '/subtask/' + id,
                { auth: { username: auth.email, password: auth.password } });

            this.componentDidMount();

        } catch (e) {
            console.log(e);
        }
    }

    /* Handler for updating sections name and color */
    handleUpdateSubtask = async (id, field, value) => {

        try { /* Send request to update task and re mount component*/
            await axios.put(process.env.REACT_APP_SERVER_URL + '/subtask/' + id,
                { field: field, value: value },
                { auth: { username: auth.email, password: auth.password } });

            this.componentDidMount();

        } catch (e) {
            console.log(e);
        }

    }

    handleAddSubtask = async (value) => {
        try { /* Create new task and allow the user to edit it themselves */
            await axios.post(process.env.REACT_APP_SERVER_URL + '/subtask/' + this.props.task.id,
                { name: value, status: false },
                { auth: { username: auth.email, password: auth.password } });

            this.setState({ addSubtask: false }, function () { this.componentDidMount() });



        } catch (e) {
            console.log(e);
        }
    }

    handleTypeSelect = async (e) => {

        /* set value and check if menu is required */
        this.setState({ type: e.target.value })

        e.target.value === "Assesment" ?
            this.props.handleSideMenuOpen(true)
            : this.props.handleSideMenuOpen(false)
    }

    render() {
        return (
            <Card className={this.props.className + " home"} body>
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
                                <BsFillClockFill style={{ color: this.props.color }} />
                            </Col>
                            <Col xs="10">
                                <DatePicker
                                    selected={new Date(this.props.task.date)}
                                    onChange={(e) => this.handleUpdate('date', e, 'editDate')}
                                    timeInputLabel="Time:"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    showTimeInput
                                    shouldCloseOnSelect={false}
                                />
                            </Col>
                        </Row>
                    </ListGroupItem>

                    {/* Input select for task type */}
                    <ListGroupItem tag="div" className="pl-0" style={{ outline: 'none' }} action>
                        <Row>
                            <Col xs="1">
                                <BsBriefcaseFill style={{ color: this.props.color }} />
                            </Col>
                            <Col xs="8">
                                <Input type="select" name="select" id="exampleSelect"
                                    onChange={(e) => this.handleTypeSelect(e)} value={this.state.type}
                                >
                                    <option>Task</option>
                                    <option>Assesment</option>
                                </Input>
                            </Col>
                            <Col xs="2">
                                {this.state.type === 'Assesment' &&
                                    <BsGear className="btn-icon" onClick={() => this.props.handleSideMenuOpen(true)} />
                                }
                            </Col>

                        </Row>
                    </ListGroupItem>

                    {/* Toggle for subtasks with subtasks */}
                    <ListGroupItem tag="button" className="pl-0 border-bottom-0" onClick={this.collapse} action>
                        <Row>
                            <Col xs="1">
                                <BsCardChecklist style={{ color: this.props.color }} />
                            </Col>
                            <Col xs="10">
                                <CardText className="">Sub Tasks</CardText>
                            </Col>
                        </Row>
                    </ListGroupItem>

                    {/* Render Subtask */}
                    <div className="content" style={{ maxHeight: (this.state.collapse ? '100vh' : '0px'), overflow: (this.state.collapse ? 'visible' : 'hidden') }}>
                        {this.state.data.map((subtask) =>
                            <Subtask key={subtask.id} subtask={subtask} color={this.props.color} handleDeleteSubtask={this.handleDeleteSubtask} handleUpdateSubtask={this.handleUpdateSubtask} />
                        )}

                        {/* Add Subtask*/}
                        <Row>
                            <Col xs="2">
                                <BsFillPlusSquareFill style={{ cursor: 'pointer', color: this.props.color }} onClick={() => this.setState({ addSubtask: true })/*this.handleAddSubtask.bind(this, 'new Subtask')*/} />
                            </Col>
                            <Col xs="10">
                                {this.state.addSubtask &&
                                    <Input className="pl-0" type="text" value={this.state.newSubTask} onChange={(e) => this.setState({ newSubTask: e.target.value })} onKeyPress={(e) => e.key === 'Enter' ? this.handleAddSubtask(this.state.newSubTask) : null} />
                                }
                            </Col>
                        </Row>
                    </div>

                </ListGroup>
            </Card>
        );
    }
}
