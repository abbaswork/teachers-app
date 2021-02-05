import React, { useState } from "react";

/* Ui imports */
import { Container } from 'reactstrap';
import Sidebar from './sidebar/sidebar';
import PageHeader from "./page-header";

export default function DashboardLayout(props) {

    /* Hook that controls responsive sidebar toggle, default for mobile is off and true for desktop */
    const [sidebar, setSidebar] = useState(Number(window.innerWidth) > 480 ? true : false);
    const toggle = () => setSidebar(prevState => !prevState);

    /* Adjust sidebar width based on view port */
    const setVw = (Number(window.innerWidth) > 480 ? '18rem' : '100vw');
    console.log('dashboard: ', props);

    return (
        <Container className="h-100" fluid>
            <Sidebar sidebar={sidebar} toggle={toggle} setVw={setVw} />
            <Container fluid id="main" style={{ marginLeft: sidebar ? setVw : '0px' }}>
                <PageHeader className="mb-5" toggle={toggle} sidebar={sidebar}
                    title={'Dashboard'}
                />
                {props.children}
            </Container>
        </Container>
    );
}

