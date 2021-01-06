import React from "react";

/* Ui imports */
import { Container, Row } from 'reactstrap';
import Sidebar from './sidebar';
import Home from './../../pages/home';

export default function AuthLayout(props) {
    return (
        <Container className="h-100" fluid>
            <Sidebar />
            <div id="main" style={{ marginLeft: '15vw' }}>
                <button className="openbtn" style={{ display: 'none' }} /*onClick={toggle} style={{ display: (isOpen ? 'none' : 'block') }}*/>&#9776;</button>
                <h2>Page Title</h2>
                <Home />
            </div>
        </Container>
    );
}

