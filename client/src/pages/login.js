import React from "react";
import auth from "./../auth/auth";
import { withCookies } from 'react-cookie';


/* Ui imports */
import {
  Form, FormGroup, Label, Input, Button //Forms
} from 'reactstrap';

class Login extends React.Component {
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
    const { cookies } = this.props;

    /* Auth login takes callback, provide function to redirect when authenticated + save login cookies */
    auth.login(this.state.email, this.state.password, () => {
      cookies.set('auth', auth, { path: '/' });
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
              onChange={this.handleChange.bind(this, 'password')} //controlled
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

export default withCookies(Login);