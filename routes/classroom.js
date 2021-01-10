var express = require('express');
var router = express.Router();
var ClassroomServices = require('../services/classroom');

/* Load user defined middleware */
var passport = require('../middleware/auth');

/* Start all teacher requests with authentication 
router.all('/',
    passport.authenticate('basic', { session: false }),
    function (req, res, next) {
        // pass control to the next handler
        next();
    }); */

/* retrieve classroom(s) that belong to provided teacher */
router.get('/', passport.authenticate('basic', { session: false }),
    function (req, res, next) {

        try{
            await 
        }
    });


module.exports = router;
