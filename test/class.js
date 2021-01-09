const configVars = require('dotenv').config();

/* Testing + with promises libraries */
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const ClassServices = require('../services/class');
const ClassroomServices = require('../services/classroom');
const TeacherServices = require('../services/teacherServices');

/* DB imports for before and after loading rows */
var SequelizeBot = require('../models/db');
const { Op } = require("sequelize");

/* configure chai to use promises and set expect to follow BDD style */
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Test Class Services', function () {

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
    });


    describe('Create class for classroom', function () {

        it('provided invalid name/classroomID should return error', async function () {
            await expect(ClassServices.createClass()).to.be.rejectedWith(Error);
        });

        it('provided a valid classroom id, should return new class', async function () {
            var newClassroom = await ClassroomServices.createClassroom('test1@hotmail.com');
            const result = await ClassServices.createClass(newClassroom.id, 'test class');
            expect(result).to.have.property('name');
        });
    });

});