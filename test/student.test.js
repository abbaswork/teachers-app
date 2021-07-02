const configVars = require('dotenv').config();

/* Testing + with promises libraries */
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const StudentServices = require('../services/student');
const ClassServices = require('../services/class');
const ClassroomServices = require('../services/classroom');
const TeacherServices = require('../services/teacherServices');
const SectionServices = require('../services/section');
const TaskServices = require('../services/task');

/* DB imports for before and after loading rows */
var SequelizeBot = require('../models/db');
const { Op } = require("sequelize");

/* configure chai to use promises and set expect to follow BDD style */
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('#student services', function () {

    before(async function () {
        await SequelizeBot.init();
        await TeacherServices.signup('test1@hotmail.com', 'secret', 'teacher');
    });

    after(async function () {
        await SequelizeBot.Teacher.destroy({
            where: { email: 'test1@hotmail.com' }
        });
        await SequelizeBot.Email.destroy({
            where: { email: 'test1@hotmail.com' }
        });
        await SequelizeBot.Classroom.destroy({
            where: { teacher_id: null }
        });
        await SequelizeBot.Class.destroy({
            where: { classroom_id: null }
        });
        await SequelizeBot.Student.destroy({
            where: { class_id: null }
        });
        await SequelizeBot.Section.destroy({
            where: { class_id: null }
        });
        await SequelizeBot.Task.destroy({
            where: { section_id: null }
        });
        await SequelizeBot.Grade.destroy({
            where: { task_id: null }
        });
    });


    describe('#create student', function () {

        it('provided invalid params should return error', async function () {
            await expect(StudentServices.createStudent()).to.be.rejectedWith(Error);
        });

        it('provided a valid class id and name should return the new student', async function () {
            var newClassroom = await ClassroomServices.createClassroom('test1@hotmail.com');
            var newClass = await ClassServices.createClass(newClassroom.id, 'test class');
            const result = await StudentServices.createStudent(newClass.id, 'Ikra', 'Khan');
            expect(result).to.have.property('first');
        });
    });

    describe('#update student grade', function () {

        it('provided invalid params should return error', async function () {
            await expect(StudentServices.updateStudentGrade()).to.be.rejectedWith(Error);
        });

        it('provided a valid student id, task id and grade set the grade for the student ', async function () {
            var newClassroom = await ClassroomServices.createClassroom('test1@hotmail.com');
            var newClass = await ClassServices.createClass(newClassroom.id, 'test class');
            var newSection = await SectionServices.createSection(newClass.id, 'test section', 'orange');
            var newTask = await TaskServices.createTask(newSection.id, 'test task', new Date());
            var newStudent = await StudentServices.createStudent(newClass.id, 'Ikra', 'Khan');
            await StudentServices.updateStudentGrade(newStudent.id, newTask.id, 60);
            const update = await StudentServices.updateStudentGrade(newStudent.id, newTask.id, 80);
            expect(update).to.have.property('grade');
        });
    });

});