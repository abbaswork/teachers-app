import React from "react";
import auth from "./../auth/auth";

/* Ui imports */
import {
  Form, FormGroup, Label, Input, Button, FormFeedback //Forms
} from 'reactstrap';

/* Request Library */
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { text: '', valid: false, msg: '* Required' },
      name: { text: '', valid: false, msg: '* Required' },
      password: { text: '', valid: false, msg: '* Required' },
      confirm: { text: '', valid: false, msg: '* Required' },
    }
  }

  /* Using public class field syntax to avoid binding in constructor */
  handleChange = (field, e) => {

    /* Only update the text field and set the others in the next handler */
    this.setState(prevState => ({
      [field]: {                   // object that we want to update
        ...prevState[field],    // keep all other key-value pairs
        text: e.target.value     // update the value of specific key
      }
    }),
      /* Use callback to reference immediate value and validate it */
      function () {
        this.valid(field);
      });
  }

  /* Validation Handler */
  valid = async (field) => {

    var value = this.state[field].text;

    switch (field) {

      case 'email':

        /* Check if email is valid using Regex expression*/
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(value).toLowerCase())) {

          try { /* If email is valid, check if it already exists */
            const resp = await axios.get(process.env.REACT_APP_SERVER_URL + `/teachers/exists/${value}`);
            /* validate */
            this.setState(prevState => ({
              [field]: {
                ...prevState[field],
                valid: !resp.data,
                msg: (resp.data ? 'Email already exist' : '')
              }
            }));

          } catch (error) {
            console.error(error);
          }

        } else { /* If email is not valid */
          this.setState(prevState => ({
            [field]: {
              ...prevState[field],
              valid: false,
              msg: 'Please enter a valid email'
            }
          }));
        }

        break;

      case 'name':
        /* Check field not empty */
        this.setState(prevState => ({
          [field]: {
            ...prevState[field],
            valid: (value.length >= 1 ? true : false),
          }
        })); break;

      case 'password':
        /* Check for at least 8 chars */
        this.setState(prevState => ({
          [field]: {
            ...prevState[field],
            valid: (value.length >= 8 ? true : false),
            msg: (value.length >= 8 ? '* Required' : 'Password must have at least 8 characters')
          }
        })); break;

      case 'confirm':
        /* Check that passwords match */
        this.setState(prevState => ({
          [field]: {
            ...prevState[field],
            valid: (value === prevState.password.text && value.length > 0 ? true : false),
            msg: (value === prevState.password.text && value.length > 0 ? '* Required' : 'Password must match')
          }
        })); break;

      default: break;
    }
  }

  handleSignUp = async (e) => {

    e.preventDefault();

    try { /* Send a request to sign up the new teacher if all the fields are valid */
      if (this.state.email.valid && this.state.name.valid && this.state.password.valid && this.state.confirm.valid) {
        await axios.post(process.env.REACT_APP_SERVER_URL + '/teachers/signup', {
          email: this.state.email.text,
          password: this.state.password.text,
          name: this.state.name.text,
        });

        /* Redirect and login to home after succesful signup */
        auth.login(this.state.email.text, this.state.password.text, () => {
          this.props.history.push("/home");
        });

      }
    } catch (error) {
      console.error(error);
    }

  }

  render() {

    return (
      <>
        <Form>
          <FormGroup className="mt-5" row>
            <Label for="emailId" hidden>Email</Label>
            {/* Using Function prototype bind syntax to avoid extra callback vs arrow function callback*/}
            <Input
              type="email" name="email" id="emailId" placeholder="Email" className="rounded-0" bsSize="lg" //html tags
              value={this.state.email.text} onChange={this.handleChange.bind(this, 'email')} //controlled
              invalid={!this.state.email.valid} required //validation
            />
            <FormFeedback invalid>{this.state.email.msg}</FormFeedback>
          </FormGroup>

          <FormGroup className="mb-5" row>
            <Label for="nameId" hidden>Name</Label>
            <Input
              type="text" name="name" id="nameId" placeholder="Name" className="rounded-0" bsSize="lg" //html tags
              value={this.state.name.text} onChange={this.handleChange.bind(this, 'name')} //controlled
              invalid={!this.state.name.valid} required //validation
            />
            <FormFeedback invalid>{this.state.name.msg}</FormFeedback>
          </FormGroup>

          <FormGroup row>
            <Label for="passwordId" hidden>Password</Label>
            <Input
              type="password" name="password" id="passwordId" className="rounded-0" placeholder="Password" bsSize="lg" //html tags
              value={this.state.password.text} onChange={this.handleChange.bind(this, 'password')} //controlled
              invalid={!this.state.password.valid} required //validation
            />
            <FormFeedback invalid>{this.state.password.msg}</FormFeedback>
          </FormGroup>

          <FormGroup row>
            <Label for="confirmId" hidden>Confirm Password</Label>
            <Input
              type="password" name="confirm" id="confirmId" className="rounded-0" placeholder="Confirm Password" bsSize="lg" //html tags
              value={this.state.confirm.text} onChange={this.handleChange.bind(this, 'confirm')} //controlled
              invalid={!this.state.confirm.valid} required //validation
            />
            <FormFeedback invalid>{this.state.confirm.msg}</FormFeedback>
          </FormGroup>

          <FormGroup className="mt-5" row>
            <Button className="theme-color rounded-0 border-0 shadow" onClick={this.handleSignUp} size="lg" block>Sign Up</Button>
          </FormGroup>
        </Form>

        <h5 className="text-center">
          Already have an Account?
          <a href="/" className="text-dark"> Login</a>
        </h5>
      </>
    );
  }
}
