import React from "react";

/* Ui imports */
import {
    Row, Col,
    CardText,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { BsThreeDots } from "react-icons/bs";

export default class SubTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
        }
    }

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen })

    render() {

        return (
            <Row>
                <Col xs="2">
                    <label className="container">
                        <input className="custom-checkbox" type="checkbox" />
                        <span className="checkmark" />
                    </label>
                </Col>
                <Col xs="7" md="8" style={{ textOverflow: 'ellipsis' }}>
                    <CardText >{this.props.subTask.name}</CardText>
                </Col>

                <Col className="text-orange" xs="1">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle tag="div" style={{ cursor: 'pointer' }}>
                            <BsThreeDots />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Subtask Options</DropdownItem>
                            <DropdownItem>Edit</DropdownItem>
                            <DropdownItem>Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>

        );
    }
}
