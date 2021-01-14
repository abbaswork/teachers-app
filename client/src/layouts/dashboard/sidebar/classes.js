import React from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

/* Ui imports */
import {
    Col, Row,
    Input,
} from 'reactstrap';
import { BsFillTrashFill, BsFillPlusSquareFill, BsFillXSquareFill } from "react-icons/bs";

import auth from "./../../../auth/auth";

/* Component is responsible for returning a list of classes with the ability to edit or delete a class */
export default class Classes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            addRow: false,
            editRow: false,
            newRow: ''
        }
    }

    /* Retrieve Classes from Server API */
    async componentDidMount() {
        try {
            const resp = await axios.get(process.env.REACT_APP_SERVER_URL + '/class', {
                auth: {
                    username: auth.email,
                    password: auth.password
                }
            });
            this.setState({ data: resp.data });
        } catch (e) {
            console.log(e);
        }

    }

    handleCreate = async (e) => {

        /* When adding input check if row is active and button click, otherwise check if enter key was clicked*/
        if (((this.state.addRow && e === undefined) || e.key === 'Enter') && this.state.newRow !== '') {

            try { /* Logic: Send request to server to add class and remount component */
                await axios.post(process.env.REACT_APP_SERVER_URL + '/class',
                    {
                        name: this.state.newRow
                    }, {
                    auth: {
                        username: auth.email,
                        password: auth.password
                    }
                });

                this.setState({
                    //data: [{ name: this.state.newRow, id: '1' }, ...this.state.data],
                    newRow: '',
                    addRow: false
                }, function () {
                    this.componentDidMount()
                });

            } catch (e) {
                console.log(e);
            }
        }
    }

    /* Using public class field syntax to avoid binding in constructor */
    handleUpdate = (field, e) => {
        this.setState({ [field]: e.target.value })
    }

    handleDelete = async (id) => {

        try { /* try to send request to delete current class and remount classes */
            await axios.delete(process.env.REACT_APP_SERVER_URL + '/class/' + id, {
                auth: {
                    username: auth.email,
                    password: auth.password
                }
            });
            this.componentDidMount()
        } catch (e) {
            console.log(e);
        }
    }

    render() {

        console.log('props: ', this.props);

        return (
            <>
                {this.state.data.map((classes) =>
                    <Row key={classes.id}>
                        <Col xs="2"> </Col>
                        <Col xs="8">
                            <NavLink to={"/home/" + classes.id} className="no-overflow p-0 pl-2" style={{ fontSize: '1.3rem' }} activeClassName="border rounded">
                                <h4>{classes.name}</h4>
                            </NavLink>
                        </Col>
                        <Col className="p-0" xs="2">
                            <BsFillTrashFill className="mr-2" style={{ cursor: 'pointer' }} onClick={() => this.handleDelete(classes.id)} />
                            {/* Future Implementation; requires lifting states and functionality upwards into parent class: <BsPencil style={{ cursor: 'pointer' }} /> */}
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
