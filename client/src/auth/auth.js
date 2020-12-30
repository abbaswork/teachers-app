import axios from 'axios';

/* ES6 Class module to create auth class to act as auth interface */
class Auth {
  constructor() {
    /* Using standard login fields */
    this.email = '';
    this.password = '';
    this.authenticated = false;
  }

  /* Login/Logout functions with callbacks */
  async login(email, password, cb) {

    /* Assign constructor values, referenced in other auth operations */
    this.email = email;
    this.password = password;

    /* Function to send authentication request to server */
    try {
      const response = await axios.get('http://localhost:5000/', {
        auth: {
          username: 'jack',
          password: 'secret'
        }
      });

      console.log(response);
      this.authenticated = true;

    } catch (error) {
      console.log(error);
    }


    //this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
