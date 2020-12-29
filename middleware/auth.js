/* Passport Auth */
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

/* Temp setup, TODO: replace records with entries from Database */
var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [{ value: 'jack@example.com' }] }
    , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [{ value: 'jill@example.com' }] }
];

/* Temp setup, TODO: Use Sequilize method to find by username */
function findByUsername(username, cb) {
    process.nextTick(function () {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.username === username) {
                return cb(null, record);
            }
        }
        return cb(null, null);
    });
}

/* Setup Basic Stragey in passport and export middleware */
passport.use(new Strategy(
    function (username, password, cb) {
        findByUsername(username, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));

module.exports = passport;