var SequelizeBot = require('./../models/db');

class TeacherServices {

    /* Handle Login for users, used by passport Basic Strategy to verify credentials */
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

    /* Handle signup for new users */
    async signup(email, password, name) {

        /* Check for invalid input */
        if (!email || !password || !name) {
            throw Error(`Passed invalid ${!email ? 'email' : (!password ? 'password' : 'name')}`)
        }

        /* Check if the email already exists */
        var [results, meta] = await SequelizeBot.Email.findAll({
            where: { email: email }
        });

        /* If it does send error, otherwise create user */
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