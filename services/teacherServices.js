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
        const user = await SequelizeBot.Teacher.findAll({
            where: { email: email, password: password }
        });

        return (null, !Array.isArray(user) || !user.length ? null : user);

    }
}

module.exports = new TeacherServices();