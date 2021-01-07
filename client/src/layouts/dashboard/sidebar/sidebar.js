/* React Imports */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

/* Component Imports */
import Classes from './classes';

/* UI Imports */
import { Row, Col } from 'reactstrap';
import { BsClipboard, BsFillTrashFill, BsPencil, BsFillPlusSquareFill, BsBoxArrowInRight } from "react-icons/bs";
import heroImage from './../../../assets/images/hero.jpg';

/* Rendered as functional component */
const Sidebar = (props) => {

    /* Toggle States
    const [sidebar, setSidebar] = useState(true);
    const toggleSidebar = () => setSidebar(!sidebar);
    */

    const [classes, setClasses] = useState(false);
    const toggleClasses = () => setClasses(!classes);

    return (
        /* Style sidebar with background image and orange overlay */
        <div id="mySidebar" className="sidebar text-white" style={{
            width: (props.sidebar ? props.setVw : '0px'), //set width using toggle
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover', boxShadow: 'inset 0 0 0 2000px rgba(255, 127, 80, 0.8)'
        }}>
            {/* First Row includes toggle button for sidebar and Title */}
            <Row className="border-divider pb-1">
                <Col xs="2">
                    <button className="collapse-icon text-white m-0" onClick={props.toggle} >&#9776;</button>
                </Col>
                <Col xs="10" className="d-flex align-items-center">
                    <h3 className="m-0">Classroom</h3>
                </Col>
            </Row>

            {/* Following rows contain defined routes */}
            <Row className="mt-3">
                <Col xs="2">
                    <BsClipboard className="side-icon text-white h5" />
                </Col>
                <Col xs="10">
                    <a className="p-0" href="javascript:void(0)" onClick={toggleClasses}>Classes</a>
                    {/* Child Rows with collapse*/}
                </Col>
            </Row>
            <div className="content" style={{ maxHeight: (classes ? '100vh' : '0px') }}>
                {/* Each child row comes with button */}
                <Classes />
            </div>

            <Row style={{ position: 'fixed', bottom: '10px', left: '0px' }}>
                <Col xs="2">
                    <button className="collapse-icon text-white"><BsBoxArrowInRight /></button>
                </Col>
                <Col xs="10" className="d-flex align-items-center">
                    <a className="m-0 p-0 ml-3" href="/login">Logout</a>
                    {/* Child Rows with collapse*/}
                </Col>
            </Row>
        </div>
    );
}

export default Sidebar;