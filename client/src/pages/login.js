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

  handleLogin = (e) => {

    e.preventDefault();

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
            <Input
              type="email" name="email" id="emailId" placeholder="Email" className="rounded-0" bsSize="lg"
              value={this.state.email} onChange={this.handleChange.bind(this, 'email')} //controlled
            />
          </FormGroup>

          <FormGroup row>
            <Label for="passwordId" hidden>Password</Label>
            <Input
              type="password" value={this.state.password} name="password" id="passwordId" className="rounded-0" placeholder="Password" bsSize="lg"
              value={this.state.password} onChange={this.handleChange.bind(this, 'password')} //controlled
            />
          </FormGroup>

          <FormGroup className="mt-5" row>
            <Button className="theme-color rounded-0 border-0 shadow" size="lg" onClick={this.handleLogin} block>Login</Button>
          </FormGroup>
        </Form>

        <h5 className="text-center">
          <a href="/signup" className="text-dark">Sign Up</a>
        </h5>

      </>
    );
  }
}
