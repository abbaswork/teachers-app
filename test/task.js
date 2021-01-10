const configVars = require('dotenv').config();

/* Testing + with promises libraries */
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const TaskServices = require('../services/task');
const SectionServices = require('../services/section');
const ClassServices = require('../services/class');
const ClassroomServices = require('../services/classroom');
const TeacherServices = require('../services/teacherServices');

/* DB imports for before and after loading rows */
var SequelizeBot = require('../models/db');
const { Op } = require("sequelize");

/* configure chai to use promises and set expect to follow BDD style */
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Test Task Services', function () {

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
        await SequelizeBot.Section.destroy({
            where: { class_id: null }
        });
        await SequelizeBot.Task.destroy({
            where: { section_id: null }
        });
    });


    describe('Create Task for Section', function () {

        it('provided invalid params should return error', async function () {
            await expect(TaskServices.createTask()).to.be.rejectedWith(Error);
        });

        it('provided a valid section id and task should return task', async function () {
            var newClassroom = await ClassroomServices.createClassroom('test1@hotmail.com');
            var newClass = await ClassServices.createClass(newClassroom.id, 'test class');
            var newSection = await SectionServices.createSection(newClass.id, 'test section', 'orange');
            const result = await TaskServices.createTask(newSection.id, 'test task', new Date());
            expect(result).to.have.property('name');
        });
    });

    describe('remove Task from Section', function () {

        it('provided a valid section should return true when deleted', async function () {
            const newClassroom = await ClassroomServices.createClassroom('test1@hotmail.com');
            const newClass = await ClassServices.createClass(newClassroom.id, 'test class');
            const newSection = await SectionServices.createSection(newClass.id, 'test section', 'orange');
            const newTask = await TaskServices.createTask(newSection.id, 'test task', new Date());
            const result = await TaskServices.removeTask(newTask.id);

            expect(result).to.be.true;
        });
    });

    describe('update task with new values', function () {

        it('provided a valid section and new color, should return 1 updated row', async function () {
            const newClassroom = await ClassroomServices.createClassroom('test1@hotmail.com');
            const newClass = await ClassServices.createClass(newClassroom.id, 'test class');
            const newSection = await SectionServices.createSection(newClass.id, 'test section', 'orange');
            const newTask = await TaskServices.createTask(newSection.id, 'test task', new Date());
            const result = await TaskServices.updateTask(newTask.id, 'name', 'changed task name');

            expect(result).to.equal(1);
        });
    });

    describe('get section for given class', function () {

        it('provided a valid class, return section inside', async function () {
            const newClassroom = await ClassroomServices.createClassroom('test1@hotmail.com');
            const newClass = await ClassServices.createClass(newClassroom.id, 'test class');
            const newSection = await SectionServices.createSection(newClass.id, 'test section', 'orange');
            const newTask = await TaskServices.createTask(newSection.id, 'test task', new Date());
            const result = await TaskServices.getTask(newTask.id);

            expect(result).to.be.an('array');
        });
    });

});