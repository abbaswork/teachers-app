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
            where: { section_id: sectionId },
            order: [['created_at', 'ASC']]
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
     * update task
     * @param {number} taskId- Provide the id of the class
     */
    async updateTask(taskId, field, value) {

        /* check for valid taskId */
        if (!taskId) {
            throw Error(`Passed invalid classroom`);
        }

        /* Update given task for field with provided value */
        const [numRows, rows] = await SequelizeBot.Task.update(
            { [field]: value },
            { where: { id: taskId } }
        );

        return numRows;
    };

    /**
     * update assesment for task
     * @param {number} taskId- Provide the id of the task
     * @param {JSON} assignment - Provide the assignment to update with
     */
    async updateTaskAssesment(taskId, assesment) {

        /* check for valid taskId */
        if (!taskId || !assesment) {
            throw Error(`Passed invalid ${taskId ? 'assignment' : 'task'}`);
        }

        /* Update given task for assignment related fields */
        try {
            const [numRows, rows] = await SequelizeBot.Task.update(
                {
                    assesment: assesment.assesment,
                    points: assesment.points,
                    weight: assesment.weight,
                    notes: assesment.notes
                },
                { where: { id: taskId } }
            );

            return numRows;
        } catch (e) {
            console.log(e);
            throw e;
        }

    };
}

module.exports = new TaskServices();