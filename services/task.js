var SequelizeBot = require('./../models/db');

class TaskServices {

    /**
     * return tasks for a given section
     * @param {number} sectionId- Provide the id of the class
     */
    async getTask(sectionId) {

        /* return null in the callback if invalid username or password */
        if (!sectionId) {
            throw Error(`Passed invalid section`);
        }

        /* Update given class for field with provided value */
        const tasks = await SequelizeBot.Task.findAll({
            where: { section_id: sectionId }
        });

        return tasks;
    };


    /**
     * Create section for class
     * @param {number} classId- Provide the id of the classroom
     */
    async createTask(sectionId, name, date) {

        /* return null in the callback if invalid username or password */
        if (!sectionId || !name || !date) {
            throw Error(`Passed invalid ${!sectionId ? 'section' : (!name ? 'name' : 'date')}`);
        }

        /* create class for classroom with given name */
        const newTask = await SequelizeBot.Task.create({
            section_id: sectionId,
            name: name,
            date: date
        });

        return newTask;
    };

    /**
     * remove section
     * @param {number} taskId- Provide the id of the class
     */
    async removeTask(taskId) {

        /* return null in the callback if invalid username or password */
        if (!taskId) {
            throw Error(`Passed invalid section`);
        }

        /* remove class for given */
        await SequelizeBot.Task.destroy({
            where: { id: taskId }
        });

        return true;
    };

    /**
     * remove provided class
     * @param {number} taskId- Provide the id of the class
     */
    async updateTask(taskId, field, value) {

        /* return null in the callback if invalid username or password */
        if (!taskId) {
            throw Error(`Passed invalid classroom`);
        }

        /* Update given class for field with provided value */
        const [numRows, rows] = await SequelizeBot.Task.update(
            { [field]: value },
            { where: { id: taskId } }
        );

        return numRows;
    };
}

module.exports = new TaskServices();