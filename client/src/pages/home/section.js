import React from "react";

/* Component Imports */
import SectionCard from './section-card';

/* Ui imports */
import {
    Container, Row, Col,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { BsThreeDots } from "react-icons/bs";

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
            data: [],
            section: props.section,
            dropdownOpen: false,
        }
    }

    componentDidMount() {
        this.setState({ data: db });
    }

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

    render() {

        return (
            <Container className="border p-4 shadow" style={{ height: '80vh', overflowY: 'scroll' }} fluid>

                {/* Header Row with dropdown settings for section */}
                <Row className="mb-5">
                    <Col xs="10">
                        <h4 className="d-inline"><span className="badge text-white rounded-0" style={{ backgroundColor: this.props.section.color }}>{this.props.section.name}</span></h4>
                    </Col>
                    <Col className="text-right" xs="2">

                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle tag="div" style={{ cursor: 'pointer' }}>
                                <BsThreeDots />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Options</DropdownItem>
                                <DropdownItem>Delete Section</DropdownItem>
                                <DropdownItem >Rename Section</DropdownItem>
                                <DropdownItem >Pick Color</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Create New Task</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>

                {/* Map section tasks */}
                {this.state.data.map((task) =>
                    <SectionCard className="mt-4 shadow" task={task} />
                )}

            </Container>
        );
    }
}
