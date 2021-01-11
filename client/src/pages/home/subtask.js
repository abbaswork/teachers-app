import React from "react";

/* Ui imports */
import {
    Row, Col,
    CardText,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Input
} from 'reactstrap';
import { BsThreeDots } from "react-icons/bs";

export default class SubTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,

            /* edit Fields */
            editName: false,
            newName: '',
        }
    }

    toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

    handleEdit = (field, value, editField) => {
        this.setState({ [editField]: false });
        this.props.handleUpdateSubtask(this.props.subtask.id, field, value);
    }

    render() {

        return (
            <Row>
                <Col xs="2">
                    <label className="container">
                        <input className="custom-checkbox" type="checkbox" checked={this.props.subtask.status} onClick={() => this.props.handleUpdateSubtask(this.props.subtask.id, 'status', !this.props.subtask.status)} />
                        <span className="checkmark" />
                    </label>
                </Col>
                <Col xs="7" md="8" style={{ textOverflow: 'ellipsis' }}>
                    <CardText >
                        {
                            this.state.editName ?
                                <Input type="text" onChange={(e) => this.setState({ newName: e.target.value })} onKeyPress={(e) => e.key === 'Enter' ? this.handleEdit('name', this.state.newName, 'editName') : null} />
                                : this.props.subtask.name
                        }
                    </CardText>
                </Col>

                <Col className="text-orange" xs="1">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle tag="div" style={{ cursor: 'pointer' }}>
                            <BsThreeDots />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Subtask Options</DropdownItem>
                            <DropdownItem onClick={() => this.setState({ editName: true })}>Edit</DropdownItem>
                            <DropdownItem onClick={this.props.handleDeleteSubtask.bind(this, this.props.subtask.id)}>Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>

        );
    }
}
