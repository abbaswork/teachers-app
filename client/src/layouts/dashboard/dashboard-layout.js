import React from "react";

/* Ui imports */
import { Container, Row } from 'reactstrap';
import Sidebar from './sidebar/sidebar';
import Home from '../../pages/home/home';
import PageHeader from "./page-header";

export default function DashboardLayout(props) {
    return (
        <Container className="h-100" fluid>
            <Sidebar />
            <Container fluid id="main" style={{ marginLeft: '15vw' }}>
                <PageHeader className="mb-5" />
                <Home />
            </Container>
        </Container>
    );
}

