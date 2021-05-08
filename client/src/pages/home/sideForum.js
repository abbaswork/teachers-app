import React from "react";
import { FormGroup, Label, Row, Col, Input, Button } from "reactstrap";

/* import connection libraries */
import axios from 'axios';
import auth from './../../auth/auth';


export default class sideForum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* load default values from active task */
            assesment: this.props.activeTask.assesment,
            points: this.props.activeTask.points,
            weight: this.props.activeTask.weight,
            notes: this.props.activeTask.notes
        }
    }


    handleSave = async () => {

        try { /* Send request to update task and re mount component*/
            await axios.put(process.env.REACT_APP_SERVER_URL + '/task/assesment/' + this.props.activeTask.id,
                {
                    assesment: {
                        assesment: this.state.assesment,
                        points: this.state.points,
                        weight: this.state.weight,
                        notes: this.state.notes
                    }
                },
                { auth: { username: auth.email, password: auth.password } });

        } catch (e) {
            console.log(e);
        }

        this.props.handleSideMenuOpen(false);
    }

    handleCancel = async () => {

        /* rest input to default and close */
        this.setState({
            assesment: this.props.activeTask.assesment,
            points: this.props.activeTask.points,
            weight: this.props.activeTask.weight,
            notes: this.props.activeTask.notes
        })
        this.props.handleSideMenuOpen(false);
    }

    render() {

        return (
            <>
                {/* render fixed sidebar for task menu options */}
                <div className="sideforum shadow" style={{ width: this.props.width, padding: this.props.padding }}>

                    <h2 className="mb-5">Assesment Settings</h2>

                    {/* Type */}
                    <FormGroup row>
                        <Label for="type" sm={3}>Type</Label>
                        <Col>
                            <Input type="select" name="type" id="type"
                                value={this.state.assesment || this.props.activeTask.assesment}
                                onChange={(e) => this.setState({ assesment: e.target.value })}
                            >
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
                            <Input type="number" min="0" name="points" id="points" placeholder="Out of"
                                value={this.state.points || this.props.activeTask.points}
                                valid={this.state.points ? true : false} invalid={!this.state.points && !this.props.activeTask.points ? true : false}
                                onChange={(e) => this.setState({ points: e.target.value })} />
                        </Col>
                    </FormGroup>

                    {/* Weight */}
                    <FormGroup row>
                        <Label for="weight" sm={3}>Weight</Label>
                        <Col>
                            <Input type="number" min="0" max="100" name="weight" id="weight" placeholder="% of 100"
                                value={this.state.weight || this.props.activeTask.weight}
                                valid={this.state.weight ? true : false} invalid={!this.state.weight && !this.props.activeTask.weight ? true : false}
                                onChange={(e) => this.setState({ weight: e.target.value })} />
                        </Col>
                    </FormGroup>

                    {/* Notes Section */}
                    <FormGroup row>
                        <Label for="notes" sm={3}>Notes</Label>
                        <Col>
                            <Input type="textarea" name="notes" id="section" value={this.state.notes || this.props.activeTask.notes} onChange={(e) => this.setState({ notes: e.target.value })} />
                        </Col>
                    </FormGroup>

                    <Row className="mt-5">
                        <Col sm={3}>
                        </Col>
                        <Col className="display-inline">
                            <Button className="mr-3 btn btn-success" disabled={!this.state.points || !this.state.weight} onClick={() => this.handleSave()}>Save</Button>
                            <Button className="btn btn-outline-danger" onClick={() => this.handleCancel()}>Cancel</Button>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }

}