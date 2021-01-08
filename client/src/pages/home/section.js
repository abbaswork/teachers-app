import React from "react";

/* Component Imports */
import SectionCard from './section-card';

/* Ui imports */
import {
    Container, Row, Col,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input
} from 'reactstrap';
import { BsThreeDots } from "react-icons/bs";
import { TwitterPicker } from 'react-color';

/* Example data to request from server api */
const db = [
    {
        id: '123',
        name: 'Bear Hunt',
        date: new Date(),
    },
    {
        id: '1234',
        name: 'Arts & Crafts',
        date: new Date()
    },
    {
        id: '12345',
        name: 'Phonics ABCs',
        date: new Date()
    }
];

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
    componentDidMount() {
        this.setState({ data: db });
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
    handleCreateTask = () => {

        /* Create new task and allow the user to edit it themselves */
        this.setState({ data: [{ id: '2', name: 'New Task', date: new Date() }, ...this.state.data] })

    }

    handleUpdateTask = (id, field, value) => {

        /* find index to update, and update state with updated copy */
        var tasks = this.state.data;
        var idIndex = tasks.findIndex((task => task.id === id));
        tasks[idIndex][field] = value;
        this.setState({ data: tasks });
    }

    handleDeleteTask = (id) => {

        /* find index to delete */
        console.log('passed id to delete: ', id);
        var rmTask = this.state.data.filter(task => task.id !== id);
        this.setState({ data: rmTask });
    }


    render() {

        return (
            <Container className="border p-4 shadow" style={{ height: '80vh', overflowY: 'scroll' }} fluid>

                {/* show contents for valid sections only*/}
                { this.props.section !== null &&
                    <div>

                        {/* Header Row with dropdown settings for section */}
                        <Row className="mb-5">
                            <Col xs="10">
                                <h4 className="d-inline">
                                    <span className="badge text-white rounded-0" style={{ backgroundColor: this.props.section.color }}>
                                        {/* If updating name, use this field to add name instead */}
                                        {!this.state.updateName ?
                                            this.props.section.name : //use name

                                            //use component that handles updating new name
                                            <Input type="text" value={this.state.newName} onChange={(e) => this.setState({ newName: e.target.value })}

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
                                        <DropdownItem onClick={() => this.handleCreateTask()}>Create New Task</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>

                        {/* Map section tasks */}
                        {this.state.data.map((task) =>
                            <SectionCard className="mt-4 shadow" task={task} handleUpdateTask={this.handleUpdateTask} handleDeleteTask={this.handleDeleteTask} />
                        )}
                    </div>
                }

                {/* content to create new section */}
                {this.props.section === null &&
                    <div className="d-flex align-items-center justify-content-center h-100 w-100">
                        <h4 className="d-inline">
                            <span className="badge text-white rounded-0" style={{ backgroundColor: 'orange', cursor: 'pointer' }} onClick={() => this.setState({ createSection: true })}>
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
