import React from 'react';
import { Button, Container, } from 'reactstrap';


/* Rendered as functional component */
const PageHeader = (props) => {

    return (
        <Container fluid className={props.className}>
            <Button className="collapse-icon h5" onClick={props.toggle} style={{ display: (props.sidebar ? 'none' : 'inline') }}>&#9776;</Button>
            <h3 className="mt-2 d-inline">Dashboard</h3>
        </Container >);
}

export default PageHeader;