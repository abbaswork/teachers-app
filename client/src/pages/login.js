import React from "react";
import auth from "./../auth/auth";

/* Ui imports */
import {
  Form, FormGroup, Label, Input, Button //Forms
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
      <>

        <Form>
          <FormGroup className="mt-5 mb-3" row>
            <Label for="emailId" hidden>Email</Label>
            <Input type="email" name="email" id="emailId" placeholder="Email" className="rounded-0" bsSize="lg" />
          </FormGroup>

          <FormGroup row>
            <Label for="passwordId" hidden>Password</Label>
            <Input type="password" name="password" id="passwordId" className="rounded-0" placeholder="Password" bsSize="lg" />
          </FormGroup>

          <FormGroup className="mt-5" row>
            <Button className="theme-color rounded-0 border-0 shadow" size="lg" block>Login</Button>
          </FormGroup>
        </Form>

        <h5 className="text-center">
          <a href="#" className="text-dark">Sign Up</a>
        </h5>

      </>
    );

    /* Column for login form
    <Col className="d-flex align-items-center justify-content-center" sm="12" md="6">
      <Form className="text-center">

        <img src={logo} />

        <FormGroup className="mt-5" row>
          <Label for="emailId" hidden>Email</Label>
          <Input type="email" name="email" id="emailId" placeholder="Email" bsSize="lg" />
        </FormGroup>

        <FormGroup row>
          <Label for="passwordId" hidden>Password</Label>
          <Input type="password" name="password" id="passwordId" placeholder="Password" bsSize="lg" />
        </FormGroup>

        <FormGroup className="mt-5" row>
          <Button className="theme-color" size="lg" block><h5>Login</h5></Button>
        </FormGroup>

        <h5 className="text-center" row>
          <a href="#" class="text-dark">Sign Up</a>
        </h5>

      </Form>
    </Col>
    */

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
  }
}
