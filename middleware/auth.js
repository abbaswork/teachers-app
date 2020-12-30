/* Passport Auth */
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
const TeacherServices = require('./../services/teacherServices');

/* Setup Basic Stragey in passport and export middleware */
passport.use(new Strategy(
    function (email, password, cb) {
        /* Use Teacher validation function and provide callback */
        TeacherServices.login(email, password, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));

module.exports = passport;