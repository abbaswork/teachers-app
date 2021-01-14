import React from "react";

/* Ui imports */
import {
    Container, Jumbotron, Row, Col, //Layout
} from 'reactstrap';
import logo from './../../assets/images/logo.png';
import heroImage from './../../assets/images/hero.jpg';

export default function AuthLayout(props) {

    return (
        <Container className="h-100" fluid>
            <Row className="h-100">

                {/* Column for jumbotron only displays above mobile*/}
                <Col className="d-none d-md-block m-0 p-0" md="6" style={{ backgroundColor: 'blue' }}>
                    <Jumbotron className="h-100 rounded-0" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)' }}>
                        <h1 className="display-3 text-white" style={{ marginTop: '8rem' }}>Stay on Top of <div className="theme-text">Classes</div> and Focus on What Really Matters</h1>
                    </Jumbotron>
                </Col>

                <Col className="d-flex align-items-center mt-5 mt-md-0 mx-3 mx-md-0" style={{ marginBottom: '15rem' }} sm="12" md="6">
                    <Container>
                        <Row className="mt-5 mt-md-0" style={{ cursor: 'default' }}>
                            <Col md="8" className="mx-auto mt-5 mt-md-0">

                                {props.children.props.location.pathname === '/signup' &&
                                    <div className="text-center mt-10">
                                        <img className="mx-auto" src={logo} alt="Teachers Toolkit Logo" />
                                    </div>
                                }

                                {props.children.props.location.pathname !== '/signup' &&
                                    <div className="text-center">
                                        <img className="mx-auto" src={logo} alt="Teachers Toolkit Logo" />
                                    </div>
                                }

                                {props.children}

                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

