const configVars = require('dotenv').config();

/* Testing + with promises libraries */
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const StudentServices = require('../services/student');
const ClassServices = require('../services/class');
const ClassroomServices = require('../services/classroom');
const TeacherServices = require('../services/teacherServices');

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

});