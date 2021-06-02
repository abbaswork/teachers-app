var SequelizeBot = require('../models/db');

class StudentServices {

    /**
     * Create Student for a given class
     * @param {number} classId- Provide the id of the classroom
     */
    async createStudent(classId, first, last) {

        /* return null in the callback if invalid params  */
        if (!classId || !first || !last) {
            throw Error(`Passed invalid ${!classId ? 'class' : (!first ? 'first' : 'last')}`);
        }

        /* create student for a given class */
        const newStudent = await SequelizeBot.Student.create({
            class_id: classId,
            first: first,
            last: last
        });

        return newStudent;
    };

}

module.exports = new StudentServices();