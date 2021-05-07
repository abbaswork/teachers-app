import React from "react";
import { Container, Form, FormGroup, Label, Row, Col, Input, Button } from "reactstrap";


export default class sideForum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initial: false
        }
    }

    handleSave = async () => {
        this.setState({
            initial: true
        });

        this.props.handleSideMenuOpen(false);
    }

    render() {

        console.log(this.props)

        return (
            <>
                {/* render fixed sidebar for task menu options */}
                <div className="sideforum shadow" style={{ width: this.props.width, padding: this.props.padding }}>

                    <h2>Assesment Settings</h2>

                    {/* Name */}
                    <FormGroup row className="mt-4">
                        <Label for="name" sm={3}>Name</Label>
                        <Col>
                            <Input type="text" name="name" id="name" placeholder="name of assesment" />
                        </Col>
                    </FormGroup>

                    {/* Type */}
                    <FormGroup row>
                        <Label for="type" sm={3}>Type</Label>
                        <Col>
                            <Input type="select" name="type" id="type">
                                <option>Assignment</option>
                                <option>Quiz</option>
                                <option>Test</option>
                                <option>Other</option>
                            </Input>
                        </Col>
                    </FormGroup>

                    {/* Score */}
                    <FormGroup row>
                        <Label for="points" sm={3}>Points</Label>
                        <Col>
                            <Input type="number" min="0" name="points" id="points" placeholder="Out of" />
                        </Col>
                    </FormGroup>

                    {/* Weight */}
                    <FormGroup row>
                        <Label for="weight" sm={3}>Weight</Label>
                        <Col>
                            <Input type="number" min="0" max="100" name="weight" id="weight" placeholder="% of 100" />
                        </Col>
                    </FormGroup>

                    {/* Dynamically render sections for the classroom */}
                    <FormGroup row>
                        <Label for="section" sm={3}>Section</Label>
                        <Col>
                            <Input type="select" name="section" id="section">
                                <option>Unit 1</option>
                                <option>Unit 2</option>
                                <option>Unit 3</option>
                            </Input>
                        </Col>
                    </FormGroup>

                    {/* Notes Section */}
                    <FormGroup row>
                        <Label for="notes" sm={3}>Notes</Label>
                        <Col>
                            <Input type="textarea" name="notes" id="section" />
                        </Col>
                    </FormGroup>

                    <Row className="mt-5">
                        <Col sm={3}>
                        </Col>
                        <Col className="display-inline">
                            <Button className="mr-3 btn btn-success" onClick={() => this.handleSave()}>Save</Button>
                            <Button className="btn btn-outline-danger" onClick={() => this.props.handleSideMenuOpen(false)}>Cancel</Button>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }

}