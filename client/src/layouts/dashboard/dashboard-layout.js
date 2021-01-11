import React, { useState } from "react";

/* Ui imports */
import { Container } from 'reactstrap';
import Sidebar from './sidebar/sidebar';
import PageHeader from "./page-header";

export default function DashboardLayout(props) {

    /* Hook that controls responsive sidebar toggle */
    const [sidebar, setSidebar] = useState(true);
    const toggle = () => setSidebar(prevState => !prevState);

    /* Adjust sidebar width based on view port */
    const setVw = (Number(window.innerHeight) > 900 ? '15vw' : '100vw');
    
    return (
        <Container className="h-100" fluid>
            <Sidebar sidebar={sidebar} toggle={toggle} setVw={setVw} />
            <Container fluid id="main" style={{ marginLeft: sidebar ? setVw : '0px' }}>
                <PageHeader className="mb-5" toggle={toggle} sidebar={sidebar} />
                {props.children}
            </Container>
        </Container>
    );
}

