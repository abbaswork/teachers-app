import React from "react";


export default class sideForum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <>
                {/* render fixed sidebar for task menu options */}
                <div className="sideforum shadow" style={{ width: this.props.sidebar }}>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>
            </>
        )
    }

}