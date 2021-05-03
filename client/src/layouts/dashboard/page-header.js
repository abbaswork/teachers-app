import React from 'react';
import {
    Row,
} from 'reactstrap';


/* Rendered as functional component */
const PageHeader = (props) => {

    return (
        <Row className="header border-divider pb-1">

            <button className="pl-0" onClick={props.toggle} style={{
                color: !props.sidebar ? 'orange' : 'white',
                marginLeft: !props.sidebar ? '2rem' : '0rem'
                //width: '0px',
                //overflow: 'hidden'
            }} >&#9776;</button>
            <button className="pl-0 ml-2"><h4 className="m-0 p-0">{props.title}</h4></button>

        </Row>
    );

}

export default PageHeader;