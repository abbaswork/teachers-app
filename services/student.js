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

    /**
     * Update student grade, if grade does not exist for student create grade
     * @param {number} student_id- Provide the id of the class
     * @param {number} task_id- Provide the id of the task to update the grade for
     * @param {number} grade- Set the grade of the student
     */
         async updateStudentGrade(student_id, task_id, grade) {

            /* return null in the callback if invalid params */
            if (!student_id || !task_id || !grade) {
                throw Error(`Passed invalid params`);
            }
    
            /* Try to insert field, on conflict update instead */
            const newGrade = await SequelizeBot.Grade.upsert({
                student_id: student_id,
                task_id: task_id,
                grade: grade
            });
        
            return newGrade[0];
        };
}

module.exports = new StudentServices();