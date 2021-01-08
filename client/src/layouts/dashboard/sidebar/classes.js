import React from "react";
import { NavLink } from 'react-router-dom';

/* Ui imports */
import {
    Col, Row,
    Input,
} from 'reactstrap';
import { BsFillTrashFill, BsPencil, BsFillPlusSquareFill, BsFillXSquareFill } from "react-icons/bs";

/* Example Data, that would be retrieved from server API */
const db = [
    {
        id: '123',
        name: 'English 1,2,3,4,5,6,7,8,9'
    },
    {
        id: '1234',
        name: 'English 2'
    },
    {
        id: '12345',
        name: 'Phonics 2'
    }
];

/* Component is responsible for returning a list of classes with the ability to edit or delete a class */
export default class Classes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            addRow: false,
            newRow: ''
        }
    }

    /* Retrieve Classes from Server API */
    componentDidMount() {
        this.setState({ data: db });
    }

    handleCreate = (e) => {

        /* When adding input check if row is active and button click, otherwise check if enter key was clicked*/
        if (((this.state.addRow && e === undefined) || e.key === 'Enter') && this.state.newRow !== '') {

            /* Logic: Send request to server to add and remount component in callback */
            this.setState({
                data: [{ name: this.state.newRow, id: '1' }, ...this.state.data],
                newRow: '',
                addRow: false
            });
        }
    }

    /* Using public class field syntax to avoid binding in constructor */
    handleUpdate = (field, e) => {
        this.setState({ [field]: e.target.value })
    }

    handleDelete = (field, e) => {
        this.setState({ [field]: e.target.value })
    }

    render() {

        console.log(this.state);

        return (
            <>
                {this.state.data.map((classes) =>
                    <Row key={classes.id}>
                        <Col xs="2"> </Col>
                        <Col xs="8">
                            <NavLink to="/about" className="no-overflow p-0" style={{ fontSize: '1.3rem' }}>{classes.name}</NavLink>
                        </Col>
                        <Col className="p-0" xs="2">
                            <BsFillTrashFill className="mr-2" style={{ cursor: 'pointer' }} />
                            <BsPencil style={{ cursor: 'pointer' }} />
                        </Col>
                    </Row>
                )}

                {/* Row is used to add new class */}
                <Row hidden={!this.state.addRow}>
                    <Col xs="2"></Col>
                    <Col xs="8">
                        <Input type="text" className="bg-none" value={this.state.newRow} onChange={(e) => this.setState({ newRow: e.target.value })} onKeyPress={this.handleCreate} placeholder="Enter Name" />
                    </Col>
                    <Col xs="1" className="p-0 d-flex align-items-center">
                        <BsFillXSquareFill style={{ cursor: 'pointer' }} onClick={() => this.setState({ addRow: false, newRow: '' })} />
                    </Col>
                </Row>

                <Row>
                    <Col xs="2"></Col>
                    <Col xs="8">
                        <BsFillPlusSquareFill style={{ cursor: 'pointer' }} onClick={() =>
                            this.state.addRow ? //if row is already active
                                this.handleCreate() : //create 
                                this.setState({ addRow: true }) //else make row active
                        }
                        />
                    </Col>
                </Row>
            </>
        );
    }
}
