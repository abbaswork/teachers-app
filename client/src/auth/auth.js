import axios from 'axios';

/* ES6 Class module to create auth class to act as auth interface */
class Auth {
  constructor() {
    /* Using standard login fields */
    this.email = '';
    this.password = '';
    this.authenticated = false;
  }

  /* Passed cookies in current session, check if valid */
  checkSession(session) {
    this.email = session.email || '';
    this.password = session.password || '';
    this.authenticated = session.authenticated || '';
  }

  /* Login/Logout functions with callbacks */
  async login(email, password, cb) {

    /* Assign constructor values, referenced in other auth operations */
    this.email = email;
    this.password = password;

    /* Function to send authentication request to server */
    try {
      await axios.get(process.env.REACT_APP_SERVER_URL + '/teacher/login', {
        auth: {
          username: email,
          password: password
        }
      });

      this.authenticated = true;

    } catch (error) {
      console.log(error);
    }

    cb();
  }

  logout(cb) {
    this.authenticated = false;
    this.email = null;
    this.password = null;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
