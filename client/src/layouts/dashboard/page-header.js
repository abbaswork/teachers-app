import React from 'react';
import { Container } from 'reactstrap';


/* Rendered as functional component */
const PageHeader = (props) => {

    return (
        <Container fluid className={props.className + ''}>
            <button className="collapse-icon m-0"
                style={{
                    fontSize: '1.5rem',
                    outline: 'none',
                    color: props.sidebar ? 'white' : 'orange',
                    cursor: props.sidebar ? 'default' : 'pointer'
                }} onClick={props.toggle}>&#9776;</button>
            <h3 className="d-inline">{props.title}</h3>
        </Container >);
}

export default PageHeader;