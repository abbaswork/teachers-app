var SequelizeBot = require('./../models/db');

class ClassroomServices {

    /**
     * Automically created when user signs up
     * @param {string} email- Provide the email to create classroom for
     */
    async createClassroom(email) {

        /* return null in the callback if invalid username or password */
        if (!email) {
            throw Error(`Passed invalid email: ${email}`);
        }

        console.log('passed email: ', email);

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
                teacher_id: results.id,
                name: 'default'
            });

            return results;
        }

    };
}

module.exports = new ClassroomServices();