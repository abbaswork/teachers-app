import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, Row, Col, Nav, NavItem, Container, } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { BsClipboard, BsFillTrashFill, BsPencil, BsFillPlusSquareFill, BsBoxArrowInRight } from "react-icons/bs";


import logo from './../../assets/images/logo.png';
import heroImage from './../../assets/images/hero.jpg';

/* Rendered as functional component */
const PageHeader = (props) => {


    return (
        <Container fluid className={props.className}>
            <Button className="collapse-icon h5" /*onClick={toggle} style={{ display: (isOpen ? 'none' : 'block') }}*/>&#9776;</Button>
            <h3 className="mt-2 d-inline">Title Page Component</h3>
        </Container >);
}

export default PageHeader;