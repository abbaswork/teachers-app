import React from "react";
import axios from 'axios';

export default class Pupils extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }


    /* Retrieve Classes from Server API */
    async componentDidMount() {

    }

    render() {
        return (
            <>
                <h1>Pupils Page</h1>
            </>
        );
    }
}
