var SequelizeBot = require('./../models/db');

class SubtaskServices {

    /**
     * return subtask(s) for task
     * @param {number} taskId- Provide the id of the class
     */
    async getSubtask(taskId) {

        /* return null in the callback if invalid username or password */
        if (!taskId) {
            throw Error(`Passed invalid section`);
        }

        /* Update given class for field with provided value */
        const subtasks = await SequelizeBot.Subtask.findAll({
            where: { task_id: taskId }
        });

        return subtasks;
    };


    /**
     * Create subtask for task
     * @param {number} taskId- Provide the id of the classroom
     */
    async createSubtask(taskId, name, status) {

        /* return null in the callback if invalid username or password */
        if (!taskId || !name || status === undefined) {
            throw Error(`Passed invalid ${!taskId ? 'task' : (!name ? 'name' : 'status')}`);
        }

        /* create class for classroom with given name */
        const newSubtask = await SequelizeBot.Subtask.create({
            task_id: taskId,
            name: name,
            status: status
        });

        return newSubtask;
    };

    /**
     * remove subtas
     * @param {number} subtaskId- Provide the id of the subtask
     */
    async removeSubtask(subtaskId) {

        /* return null in the callback if invalid username or password */
        if (!subtaskId) {
            throw Error(`Passed invalid subtask`);
        }

        /* remove class for given */
        await SequelizeBot.Subtask.destroy({
            where: { id: subtaskId }
        });

        return true;
    };

    /**
     * remove provided class
     * @param {number} subtaskId- Provide the id of the subtask
     */
    async updateSubtask(subtaskId, field, value) {

        /* return null in the callback if invalid username or password */
        if (!subtaskId) {
            throw Error(`Passed invalid classroom`);
        }

        /* Update given class for field with provided value */
        const [numRows, rows] = await SequelizeBot.Subtask.update(
            { [field]: value },
            { where: { id: subtaskId } }
        );

        return numRows;
    };
}

module.exports = new SubtaskServices();