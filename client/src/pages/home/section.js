import React from "react";
import axios from 'axios';

/* Component Imports */
import SectionCard from './section-card';
import auth from './../../auth/auth';

/* Ui imports */
import {
    Container, Row, Col,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input
} from 'reactstrap';
import { BsThreeDots, BsFilePlus } from "react-icons/bs";
import { TwitterPicker } from 'react-color';

export default class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            /* default states */
            data: [],
            dropdownOpen: false,

            /* Editing/Creating States */
            updateName: false,
            newName: '',
            pickColor: false,
            color: '',
            createSection: false,
            newSection: '',
        }
    }

    /* Internal Section Event Handlers*/
    async componentDidMount() {
        if (this.props.section) {
            try {
                const resp = await axios.get(process.env.REACT_APP_SERVER_URL + '/task/' + this.props.section.id, {
                    auth: { username: auth.email, password: auth.password }
                });
                this.setState({ data: resp.data });

            } catch (e) {
                console.log(e);
            }

            /* Add event listner for out of component clicks */
            document.addEventListener('mousedown', this.handleClickOutside);
        }
    }

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

    handleUpdate = (field, value, toggle) => {
        this.setState({ [toggle]: false });
        this.props.handleUpdateSection(this.props.section.id, field, value);
    }

    createSection = (value) => {
        this.setState({ createSection: false });
        this.props.handleCreateSection(value);
    }


    /* Event Handlers for to pass to children components */
    handleCreateTask = async () => {

        try { /* Create new task and allow the user to edit it themselves */
            await axios.post(process.env.REACT_APP_SERVER_URL + '/task/' + this.props.section.id,
                { name: 'New Task', date: new Date() },
                { auth: { username: auth.email, password: auth.password } });

            this.componentDidMount();

        } catch (e) {
            console.log(e);
        }

    }

    handleDeleteTask = async (id) => {

        try { /* Send request to delete task and re mount component*/
            await axios.delete(process.env.REACT_APP_SERVER_URL + '/task/' + id,
                { auth: { username: auth.email, password: auth.password } });

            this.componentDidMount();

        } catch (e) {
            console.log(e);
        }
    }


    handleUpdateTask = async (id, field, value) => {

        /* find index to update, and update state with updated copy 
        var tasks = this.state.data;
        var idIndex = tasks.findIndex((task => task.id === id));
        tasks[idIndex][field] = value;
        this.setState({ data: tasks }); */

        try { /* Send request to update task and re mount component*/
            await axios.put(process.env.REACT_APP_SERVER_URL + '/task/' + id,
                { field: field, value: value },
                { auth: { username: auth.email, password: auth.password } });

            this.componentDidMount();

        } catch (e) {
            console.log(e);
        }
    }


    render() {
        return (
            <Container className="border p-4 shadow" style={{ height: '80vh', overflowY: 'scroll', minWidth: '375px' }} fluid>

                {/* show contents for valid sections only*/}
                { this.props.section !== null &&
                    <div>
 
                        {/* Header Row with dropdown settings for section */}
                        <Row className="mb-5">
                            <Col xs="8">
                                <h4 className="d-inline">
                                    <span className="badge text-white rounded-0" style={{ backgroundColor: this.props.section.color }}>
                                        {/* If updating name, use this field to add name instead */}
                                        {!this.state.updateName ?
                                            this.props.section.name : //use name

                                            /*use component that handles updating new name and contains ref */
                                            <Input type="text" value={this.state.newName} onChange={(e) => this.setState({ newName: e.target.value })}

                                                /* On Focus handle */
                                                onBlur={() => this.setState({ updateName: false })}

                                                /* On key press enter, call update handler */
                                                onKeyPress={(e) =>
                                                    e.key === 'Enter' ? this.handleUpdate('name', this.state.newName, 'updateName') : null
                                                }
                                            />
                                        }
                                    </span>
                                </h4>

                                {/* Color picker that only appears when editing color, on complete call update handler */}
                                {this.state.pickColor &&
                                    <TwitterPicker onChangeComplete={(color, event) => this.handleUpdate('color', color.hex, 'pickColor')} />
                                }
                            </Col>

                            {/* Section Options with dropdown */}
                            <Col xs="2" className="text-right">
                                <BsFilePlus style={{ color: this.props.section.color, fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => this.handleCreateTask()} />
                            </Col>
                            <Col className="text-right" xs="2">
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle tag="div" style={{ cursor: 'pointer' }}>
                                        <BsThreeDots />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem header>Options</DropdownItem>
                                        <DropdownItem onClick={this.props.handleDeleteSection.bind(this, this.props.section.id)}>Delete Section</DropdownItem>
                                        <DropdownItem onClick={() => this.setState({ updateName: true })}>Rename Section</DropdownItem>
                                        <DropdownItem onClick={() => this.setState({ pickColor: !this.state.pickColor })}>Pick Color</DropdownItem>
                                        <DropdownItem divider />
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>

                        {/* Map section tasks */}
                        {this.state.data.map((task) =>
                            <SectionCard key={task.id} className="mt-4 shadow" task={task} color={this.props.section.color}
                                handleDeleteTask={this.handleDeleteTask}
                                handleSideMenuOpen={this.props.handleSideMenuOpen}
                                handleActiveTask={this.props.handleActiveTask} handleUpdateTask={this.handleUpdateTask}
                            />
                        )}
                    </div>
                }

                {/* content to create new section */}
                {this.props.section === null &&
                    <div className="d-flex align-items-center justify-content-center h-100 w-100">
                        <h4 className="d-inline">
                            <span className="badge text-white rounded-0" style={{ backgroundColor: 'green', cursor: 'pointer' }} onClick={() => this.setState({ createSection: true })}>
                                {this.state.createSection ?
                                    <Input type="text" onChange={(e) => this.setState({ newSection: e.target.value })} onKeyPress={(e) => e.key === 'Enter' ? this.createSection(this.state.newSection) : null} />
                                    : 'Create Section'
                                }
                            </span>
                        </h4>
                    </div>
                }
            </Container>
        );
    }
}
