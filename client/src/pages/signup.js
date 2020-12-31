import React from "react";
import auth from "./../auth/auth";

/* Ui imports */
import {
  Container, Row, Col, //Layout
  Form, FormGroup, Label, Input, FormFeedback, FormText //Forms
} from 'reactstrap';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  /* Using public class field syntax to avoid binding in constructor */
  handleChange = (field, e) => {
    this.setState({ [field]: e.target.value })
  }

  handleLogin = () => {

    /* Auth login takes callback, provide function to redirect when authenticated */
    auth.login(this.state.email, this.state.password, () => {
      this.props.history.push("/home");
    });
  }

  render() {

    return (

      <Row>

        {/* Column for hero display, on mobile does not display */}
        <Col className="d-none d-md-block" md="6" style={{ backgroundColor: 'blue' }}>
          <h1>Place holder</h1>
        </Col>

        {/* Col for login form */}
        <Col sm="12" md="6" style={{ backgroundColor: 'red' }}>

          {/* Consists of 4 rows for login form */}
          <Form>
            <FormGroup row>
              <Col className="mx-auto" sm={10}>
                <Label for="emailId" hidden>Email</Label>
                <Input type="email" name="email" id="emailId" placeholder="Email" bsSize="lg" valid />
                <FormFeedback valid={false}>Sweet! that name is available</FormFeedback>
                <FormText>Email will be used as login</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col className="mx-auto" sm={10}>
                <Label for="passwordId" hidden>Password</Label>
                <Input type="password" name="password" id="passwordId" placeholder="Password" bsSize="lg" valid />
                <FormFeedback valid={false}>Sweet! that name is available</FormFeedback>
                <FormText>Email will be used as login</FormText>
              </Col>
            </FormGroup>
          </Form>

        </Col>
      </Row>

      /*
      <div>
          <h1>
            Login Page
      </h1>
          {/* Using Function prototype bind syntax to avoid extra callback vs arrow function callback }
        <input type="text" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
          <br />
          <input type="text" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
          <br />
          <button onClick={this.handleLogin}> Login </button>
          <Button>Test</Button>
        </div>
      */
    );
  }
}
