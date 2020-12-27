var express = require('express');
var router = express.Router();

/* Load user defined middleware */
var passport = require('./../middleware/auth');

/* GET home page. */
    /* Test Call for auth middleware, TODO: Move into appilcable route */
    router.get('/',
        passport.authenticate('basic', { session: false }),
        function (req, res) {
            res.json({ username: req.user.username, email: req.user.emails[0].value });
        });
module.exports = router;
