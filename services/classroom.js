var SequelizeBot = require('./../models/db');

class ClassroomServices {

    /**
     * Retrieve classroom(s) for teacher (currently there is only classroom per teacher)
     * @param {string} email- Provide the email to create classroom for
     */
    async getClassroom(email) {

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

            /* get classroom for provided teacher */
            const classroom = await SequelizeBot.Classroom.findAll({
                where: { teacher_id: results.id }
            });

            return classroom;
        }

    };

    /**
     * Automically created when user signs up
     * @param {string} email- Provide the email to create classroom for
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
            const classroom = await SequelizeBot.Classroom.create({
                teacher_id: results.id,
                name: 'default'
            });

            return classroom;
        }

    };
}

module.exports = new ClassroomServices();