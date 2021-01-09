var SequelizeBot = require('./../models/db');

class Class {

    /**
     * Create class for classroom
     * @param {number} classroomId- Provide the id of the classroom
     */
    async createClass(classroomId, name) {

        /* return null in the callback if invalid username or password */
        if (!classroomId || !name) {
            throw Error(`Passed invalid ${!classroom ? 'classroom' : 'name'}`);
        }

        /* create class for classroom with given name */
        const newClass = await SequelizeBot.Class.create({
            classroom_id: classroomId,
            name: name
        });

        return newClass;

    };
}

module.exports = new Class();