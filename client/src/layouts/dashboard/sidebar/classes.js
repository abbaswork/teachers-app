import React from "react";
import { NavLink } from 'react-router-dom';

/* Ui imports */
import { Col, Row } from 'reactstrap';
import { BsFillTrashFill, BsPencil, BsFillPlusSquareFill } from "react-icons/bs";

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
        }
    }

    /* Retrieve Classes from Server API */
    componentDidMount() {
        this.setState({ data: db });
    }

    /* Using public class field syntax to avoid binding in constructor */
    handleUpdate = (field, e) => {
        this.setState({ [field]: e.target.value })
    }

    handleDelete = (field, e) => {
        this.setState({ [field]: e.target.value })
    }

    render() {

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
                <Row>
                    <Col xs="2"></Col>
                    <Col xs="8">
                        <BsFillPlusSquareFill style={{ cursor: 'pointer' }} />
                    </Col>
                </Row>
            </>
        );
    }
}
