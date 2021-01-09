var SequelizeBot = require('./../models/db');

class classServices {

    /**
     * Handle login for users, used by passport Basic Strategy to verify credentials
     * @param {string} email- Provide the email to login with
     * @param {string} password - Provide the password to login with
     * @callback cb - Callback with (err, user) params that resolves logic
     */
    async createClass(email, password, cb) {

        /* if called with an invalid callback resolve with error */
        if (!cb) {
            throw new Error("login intialized with invalid callback function");
        }

        /* return null in the callback if invalid username or password */
        if (!email || !password) {
            return cb(null, null);
        }

        /* find user with matching email and password and return user */
        var [results, meta] = await SequelizeBot.Teacher.findAll({
            where: { email: email, password: password }
        });

        /* return cb with null for no match and results for match */
        return cb(null, !results ? null : results);

    };

}

module.exports = new classServices();