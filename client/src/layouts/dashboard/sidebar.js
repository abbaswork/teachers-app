import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, Row, Col, Nav, NavItem, } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { BsClipboard, BsFillTrashFill, BsPencil, BsFillPlusSquareFill, BsBoxArrowInRight } from "react-icons/bs";


import logo from './../../assets/images/logo.png';
import heroImage from './../../assets/images/hero.jpg';

/* Rendered as functional component */
const Sidebar = (props) => {

    /* Toggle States and functions for Sidebar toggle and routes */
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    const [isOpen2, setIsOpen2] = useState(false);
    const toggle2 = () => setIsOpen2(!isOpen2);

    const setVw = (window.innerHeight > 900 ? '15vw' : '100vw')

    console.log('view port: ', window.innerHeight);

    return (

        <div>
            {/* Style sidebar with background image and orange overlay */}
            <div id="mySidebar" className="sidebar text-white" style={{
                width: (isOpen ? setVw : '0px'),
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover', boxShadow: 'inset 0 0 0 2000px rgba(255, 127, 80, 0.8)'
            }}>
                {/* First Row includes toggle button and Title */}
                <Row className="border-divider pb-1">
                    <Col sm="2">
                        <button className="openbtn text-white m-0" onClick={toggle} >&#9776;</button>
                    </Col>
                    <Col sm="10" className="d-flex align-items-center">
                        <h3 className="m-0">Classroom</h3>
                    </Col>
                </Row>

                {/* Following rows contain defined routes */}
                <Row className="mt-3">
                    <Col sm="2">
                        <button className="openbtn text-white pt-0" onClick={toggle} ><BsClipboard /></button>
                    </Col>
                    <Col sm="10" className="">
                        <a className="p-0" href="javascript:void(0)" onClick={toggle2}>Classes</a>
                        {/* Child Rows with collapse*/}
                    </Col>
                </Row>
                <div className="content" style={{ maxHeight: (isOpen2 ? '100vh' : '0px') }}>
                    {/* Each child row comes with button */}
                    <Row>
                        <Col sm="10">
                            <NavLink to="/about" className="no-overflow pt-0" style={{ fontSize: '1.3rem' }}>Class 1</NavLink>
                        </Col>
                        <Col className="p-0" sm="2">
                            <a className="p-0 mr-2" href="jajavascript:void(0)" style={{ fontSize: '1.0rem', display: 'inline' }} ><BsFillTrashFill /></a>
                            <a className="p-0" href="jajavascript:void(0)" style={{ fontSize: '1.0rem', display: 'inline' }} ><BsPencil /></a>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="10">
                            <NavLink to="/about" className="no-overflow pt-0" style={{ fontSize: '1.3rem' }}>Class 2</NavLink>
                        </Col>
                        <Col className="p-0" sm="2">
                            <a className="p-0 mr-2" href="jajavascript:void(0)" style={{ fontSize: '1.0rem', display: 'inline' }} ><BsFillTrashFill /></a>
                            <a className="p-0" href="jajavascript:void(0)" style={{ fontSize: '1.0rem', display: 'inline' }} ><BsPencil /></a>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="10">
                            <NavLink to="/about" className="no-overflow pt-0" style={{ fontSize: '1.3rem' }}>Class 3</NavLink>
                        </Col>
                        <Col className="p-0" sm="2">
                            <a className="p-0 mr-2" href="jajavascript:void(0)" style={{ fontSize: '1.0rem', display: 'inline' }} ><BsFillTrashFill /></a>
                            <a className="p-0" href="jajavascript:void(0)" style={{ fontSize: '1.0rem', display: 'inline' }} ><BsPencil /></a>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="2">
                            <a className="pt-0" href="jajavascript:void(0)" style={{ fontSize: '1.3rem' }}><BsFillPlusSquareFill /></a>
                        </Col>
                    </Row>
                </div>

                <Row style={{ position: 'fixed', bottom: '10px', left: '0px' }}>
                    <Col sm="2">
                        <button className="openbtn text-white m-0" onClick={toggle} ><BsBoxArrowInRight /></button>
                    </Col>
                    <Col sm="10" className="d-flex align-items-center">
                        <a className="m-0 p-0 ml-2" href="#" onClick={toggle2}>Logout</a>
                        {/* Child Rows with collapse*/}
                    </Col>
                </Row>

            </div>
            {/*
            <div id="main" style={{ marginLeft: (isOpen ? setVw : '0px') }}>
                <button className="openbtn" onClick={toggle} style={{ display: (isOpen ? 'none' : 'block') }}>&#9776;</button>
                <h2>Collapsed Sidebar</h2>
                <p>Content...</p>
            </div> */}
        </div>
    );
}

export default Sidebar;