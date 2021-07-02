/* React Imports */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';

/* Component Imports */
import Classes from './classes';
import auth from './../../../auth/auth';

/* UI Imports */
import { Row, Col } from 'reactstrap';
import { BsClipboard, BsBoxArrowInRight, BsPersonLinesFill } from "react-icons/bs";
import heroImage from './../../../assets/images/hero.jpg';

/* Rendered as functional component */
const Sidebar = (props) => {

    /* Toggle States
    const [sidebar, setSidebar] = useState(true);
    const toggleSidebar = () => setSidebar(!sidebar);
    */

    const [classes, setClasses] = useState(true);
    const toggleClasses = () => setClasses(!classes);
    const [cookies, removeCookie] = useCookies(['auth']);

    /* Get class id if available */
    const classId = props.location.pathname.split('/') || props.location.pathname.split('/gradebook/');

    const logout = () => {
        auth.logout(() => {
            if (cookies) {
                removeCookie('auth');
            }
            props.history.push("/login");
        });
    }

    return (
        /* Style sidebar with background image and orange overlay */
        <div id="mySidebar" className="sidebar text-white" style={{
            width: (props.sidebar ? props.setVw : '0px'), //set width using toggle
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover', boxShadow: 'inset 0 0 0 2000px rgba(255, 127, 80, 0.8)'
        }}>
            {/* First Row includes toggle button for sidebar and Title */}
            <Row className="border-divider pb-1">
                {/*
                <Col xs="2" md="3" >
                    <button className="collapse-icon text-white m-0" onClick={props.toggle} >&#9776;</button>
                </Col>
                <Col xs="10" md="9" className="d-flex align-items-center">
                    <h3 className="m-0">Classroom</h3>
                </Col> 
                */}

                <button className="pl-0 ml-5" onClick={props.toggle} >&#9776;</button>
                <button onClick={toggleClasses}><h4 className="m-0 p-0">Classroom</h4></button>

            </Row>

            {/* Following rows contain defined routes */}
            <Row className="mt-3">
                <BsClipboard className="side-icon text-white h5 ml-5" />
                <button onClick={toggleClasses}><h4 className="m-0 p-0">Classes</h4></button>
            </Row>
            {/* Child Rows with collapse*/}
            <div className="content" style={{ maxHeight: (classes ? '100vh' : '0px') }}>
                {/* Each child row comes with button */}
                <Classes />
            </div>

            {/* Links that only showup when class is already selected, ex.home/75*/}
            { classId[2] !== undefined &&
                <Row className="mt-3">
                    <BsPersonLinesFill className="side-icon text-white h5 ml-5" />
                    <button onClick={() => props.history.push(`/gradebook/${classId[2]}`)}><h4 className="m-0 p-0">Gradebook</h4></button>
                </Row>
            }

            <Row style={{ position: 'fixed', bottom: '10px', left: '0px' }}>
                <Col xs="2">
                    <button className="collapse-icon text-white"><BsBoxArrowInRight /></button>
                </Col>
                <Col xs="10" className="d-flex align-items-center">
                    <button className="m-0 p-0 ml-3" href="/login" onClick={() => logout()}>Logout</button>
                </Col>
            </Row>
        </div>
    );
}

export default withRouter(Sidebar);