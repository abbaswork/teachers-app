var SequelizeBot = require('../models/db');

class StudentServices {

    /**
     * Create Student for a given class
     * @param {number} studentRow - Student row to update student and grades with
     */
    async updateStudentGrade(studentRow) {

        /* return null in the callback if invalid params  */
        if (!studentRow) {
            throw Error(`Passed invalid studentRow`);
        }

        /* call update functions for student and grade */
        const student = await this.updateStudent(studentRow.class_id, studentRow.first, studentRow.last, studentRow.id);

        /* loop through object and update on assignment id's */
        for (const property in studentRow) {
            if (!isNaN(property)) {
                this.updateGrade(student.id, property, studentRow[property].grade);
            }
        }

        return studentRow;
    };


    /**
     * Create/Update Student for a given class
     * @param {number} class_id- Provide the id of the classroom
     * @param {number} first- Provide the id of the classroom
     * @param {number} last- Provide the id of the classroom
     * @param {number} id- Optional id to update student instead of inserting new one
     */
    async updateStudent(class_id, first, last, id) {

        /* return null in the callback if invalid params  */
        if (!class_id || (!first && !last)) {
            throw Error(`Passed invalid ${!class_id ? 'class' : (!first ? 'first' : 'last')}`);
        }

        /* create student for a given class */
        const newStudent = await SequelizeBot.Student.upsert({
            class_id: class_id,
            id: id,
            first: first,
            last: last
        }, { raw: true });

        return newStudent[0].dataValues;
    };

    /**
     * Update student grade, if grade does not exist for student create grade
     * @param {number} student_id- Provide the id of the class
     * @param {number} task_id- Provide the id of the task to update the grade for
     * @param {number} grade- Set the grade of the student
     */
    async updateGrade(student_id, task_id, grade) {

        /* return null in the callback if invalid params */
        if (!student_id || !task_id) {
            throw Error(`Passed invalid params: student_id: ${student_id}, task_id: ${task_id}, grade: ${grade}`);
        }

        /* Try to insert field, on conflict update instead */
        const newGrade = await SequelizeBot.Grade.upsert({
            student_id: student_id,
            task_id: task_id,
            grade: grade || 0
        });

        return newGrade[0];
    };

    /**
     * Remove Student Grade
     * @param {obj} student_id- id of student to remove
     */
    async deleteStudent(student_id) {

        /* return null in the callback if invalid username or password */
        if (!student_id) {
            throw Error(`Passed invalid student`);
        }

        /* remove student grades and destroy the student its self */
        try {
            await SequelizeBot.Grade.destroy({
                where: { student_id: student_id }
            });

            await SequelizeBot.Student.destroy({
                where: { id: student_id }
            });
        } catch (e) {
            console.log('there was an error removing the student: ', e);
            throw e;
        }

        return true;
    };

    /**
     * Retrieve Students of a class along with grades for class or class
     * Description: Provides student grades for student OR class, if both are provided returns for class first
     * @param {number} id - Optional student id for student or class
     * @param {number} type - specify which type to query for oneOf[student,class]
     */
    async getStudentGrades(id, type) {

        /* return null in the callback if invalid params */
        if (!id && !type) {
            throw Error(`Passed invalid params`);
        }

        try { /* Get all students in a class */
            const students = await SequelizeBot.Student.findAll({
                raw: true,
                where: {
                    [type]: id
                }
            });

            /* Get all assignments that belong in the sections for the class id provided */
            const assignments = await SequelizeBot.Section.findAll({
                raw: true,
                attributes: ['class_id', 'id', 'tasks.id', 'tasks.name', 'tasks.points', 'tasks.weight'],
                where: {
                    [type]: id
                },
                include: [{
                    model: SequelizeBot.Task,
                    attributes: []
                }]
            });

            /* for each student, get their grades and include the task assignment */
            for (var i = 0, length = students.length; i < length; i++) {
                var grades = await SequelizeBot.Task.findAll({
                    attributes: ['id', 'grades.grade', 'points', 'weight'],
                    include: [{
                        model: SequelizeBot.Grade,
                        where: {
                            student_id: students[i].id,
                        },
                        attributes: [],
                    }],
                    raw: true,
                });

                /* map each grade to the student directly */
                grades.map((row, index) => {
                    students[i][row.id] = row;
                });

            }

            /* Return Student Grades object which includes students with their grades and the assignemnts for the grades */
            return {
                students: students,
                assignments: assignments
            };

        } catch (e) {
            console.log(e);
        }
    };
}

module.exports = new StudentServices();