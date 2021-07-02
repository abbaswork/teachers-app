var SequelizeBot = require('./../models/db');
var SectionServices = require('./section');
var TaskServices = require('./task');
var SubtaskServices = require('./subtask');

class ClassServices {

    /**
     * return class(es) for given classroom id
     * @param {number} classId- Provide the id of the class
     */
    async getClass(classroomId) {

        /* return null in the callback if invalid username or password */
        if (!classroomId) {
            throw Error(`Passed invalid classroom`);
        }

        /* Update given class for field with provided value */
        const classes = await SequelizeBot.Class.findAll({
            where: { classroom_id: classroomId },
            order: [['created_at', 'ASC']]
        });

        return classes;
    };


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

        /* Create Predefined Section in the new class with intuitive place holder text */
        const sec1 = await SectionServices.createSection(newClass.id, 'Unit of Work', 'orange');

        /* Create an example task with an example subtask in the first section
        Only if this is the first class created for the account */
        const classes = await SequelizeBot.Class.findAll({
            where: { classroom_id: classroomId },
            order: [['created_at', 'ASC']]
        });

        if (classes.length < 1) {
            const task1 = await TaskServices.createTask(sec1.id, 'Unit task 1', new Date());
            await SubtaskServices.createSubtask(task1.id, 'subtask', false);
        }

        return newClass;
    };

    /**
     * remove provided class
     * @param {number} classId- Provide the id of the class
     */
    async removeClass(classId) {

        /* return null in the callback if invalid username or password */
        if (!classId) {
            throw Error(`Passed invalid classroom`);
        }

        /* remove class for given */
        await SequelizeBot.Class.destroy({
            where: { id: classId }
        });

        return true;
    };

    /**
     * remove provided class
     * @param {number} classId- Provide the id of the class
     */
    async updateClass(classId, field, value) {

        /* return null in the callback if invalid username or password */
        if (!classId) {
            throw Error(`Passed invalid classroom`);
        }

        /* Update given class for field with provided value */
        const [numRows, rows] = await SequelizeBot.Class.update(
            { [field]: value },
            { where: { id: classId } }
        );

        return numRows;
    };
}

module.exports = new ClassServices();