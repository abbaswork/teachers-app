var express = require('express');
var router = express.Router();
var teacherServices = require('./../services/teacherServices');

/* Load user defined middleware */
var passport = require('./../middleware/auth');

/* Start all teacher requests with authentication
app.all('/', 
passport.authenticate('basic', { session: false }),
function(req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});  */

/* login route with auth middleware */
router.get('/login',
  passport.authenticate('basic', { session: false }),
  function (req, res, next) {
    res.status(200).send('OK');
  });

/* signup route w/ auth*/
router.post('/signup',
  async function (req, res, next) {

    /* Signup using teacher service, if error is caught, forward to error handler*/
    try {
      await teacherServices.signup(req.body.email, req.body.password, req.body.name);
    } catch (e) {
      next(err);
    }

    res.status(201).send('Teacher Created');
  });

module.exports = router;
