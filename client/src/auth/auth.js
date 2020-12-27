/* ES6 Class module to create auth class to act as authentication interface */
class Auth {
    constructor() {
      this.authenticated = false;
    }
  
    /* Login and logout with callback */
    login(cb) {
      this.authenticated = true;
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
  