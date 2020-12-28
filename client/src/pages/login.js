import React from "react";
import auth from "./../auth/auth";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    }
  }

  /* Using public class field syntax to avoid binding in constructor */
  handleChange = (field, e) => {
    this.setState({ [field]: e.target.value })
  }

  handleLogin = () => {

    /* Auth login takes callback, provide function to redirect when authenticated */
    auth.login(this.state.userName, this.state.password, () => {
      this.props.history.push("/home");
    });
  }

  render() {
    return (
      <div>
        <h1>
          Login Page
      </h1>
        {/* Using Function prototype bind syntax to avoid extra callback vs arrow function callback */}
        <input type="text" value={this.state.userName} onChange={this.handleChange.bind(this, 'userName')} />
        <br />
        <input type="text" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
        <br />
        <button onClick={this.handleLogin}> Login </button>
      </div>
    );
  }
}
