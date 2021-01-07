import React from "react";

/* Component Import */
import Subtask from './subtask';

/* Ui imports */
import {
    Row, Col,
    Card, CardText,
    ListGroup, ListGroupItem,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { BsFillClockFill, BsCardChecklist, BsFillPlusSquareFill, BsThreeDots } from "react-icons/bs";

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
            subTasks: []
        }
    }

    componentDidMount() {
        this.setState({ data: db });
    }

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });
    collapse = () => this.setState({ collapse: !this.state.collapse });

    render() {

        return (
            <Card className={this.props.className} body>
                <Row className="mb-2">
                    <Col xs="10">
                        <CardText tag="h5">{this.props.task.name}</CardText>
                    </Col>
                    <Col className="text-right" xs="2">

                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle tag="div" style={{ cursor: 'pointer' }}>
                                <BsThreeDots />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Task Options</DropdownItem>
                                <DropdownItem>Edit Task</DropdownItem>
                                <DropdownItem >Delete it</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
                <ListGroup flush>
                    {/* Card Date and Sub task sections */}
                    <ListGroupItem tag="button" className="pl-0" style={{ outline: 'none' }} action>
                        <Row>
                            <Col xs="1">
                                <BsFillClockFill className="text-orange" />
                            </Col>
                            <Col className="" xs="10">
                                <CardText>{this.props.task.date.toString()}</CardText>
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
                            <Subtask subTask={subTask} />
                        )}
                    </div>
                </ListGroup>

                {/* Add more Subtasks */}
                <Row>
                    <Col xs="2">
                        <BsFillPlusSquareFill className="text-orange" style={{ cursor: 'pointer' }} />
                    </Col>
                </Row>

            </Card>
        );
    }
}
