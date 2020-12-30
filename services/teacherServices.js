var SequelizeBot = require('./../models/db');

class TeacherServices {

    /**
     * Handle login for users, used by passport Basic Strategy to verify credentials
     * @param {string} email- Provide the email to login with
     * @param {string} password - Provide the password to login with
     * @callback cb - Callback with (err, user) params that resolves logic
     */
    async login(email, password, cb) {

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

    /**
     * Function that adds new teacher & email to database
     * @param {string} email - email used in signup
     * @param {string} password - password used in signup
     * @param {string} name - name assigned to teacher
     */
    async signup(email, password, name) {

        /* Check for invalid input */
        if (!email || !password || !name) {
            throw Error(`Passed invalid ${!email ? 'email' : (!password ? 'password' : 'name')}`)
        }

        /* Check if the email already exists */
        var [results, meta] = await SequelizeBot.Email.findAll({
            where: { email: email }
        });

        /* If it does send error, otherwise create user and send confirmation*/
        if (results) {
            throw Error(`Email already exists`);
        } else {
            await SequelizeBot.Email.create({ email: email });
            await SequelizeBot.Teacher.create({
                email: email,
                password: password,
                name: name
            });
            return true;
        }
    }
}

module.exports = new TeacherServices();