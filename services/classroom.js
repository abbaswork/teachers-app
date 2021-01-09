var SequelizeBot = require('./../models/db');

class classroomServices {

    /**
     * Automically created when user signs up
     * @param {string} email- Provide the email to create classroom for
     * @callback cb - Callback with (err, user) params that resolves logic
     */
    async createClassroom(email) {

        /* return null in the callback if invalid username or password */
        if (!email) {
            throw Error(`Passed invalid email: ${email}`);
        }

        /* find teacher id of email */
        var [results, meta] = await SequelizeBot.Teacher.findAll({
            where: { email: email }
        });

        /* if match was found create classroom for teacher, otherwise return null */
        if (!results) {
            return null;
        } else {

            /* create classroom for teacher with given email and return teacher */
            await SequelizeBot.Classroom.create({
                teacher_id: results[0].id,
                name: 'default'
            });

            return results[0];
        }

    };
}

module.exports = new classroomServices();