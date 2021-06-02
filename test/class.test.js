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

describe('#class services', function () {

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


    describe('#create class', function () {

        it('provided invalid name/classroomID should return error', async function () {
            await expect(ClassServices.createClass()).to.be.rejectedWith(Error);
        });

        it('provided a valid classroom id, should return new class', async function () {
            var newClassroom = await ClassroomServices.createClassroom('test1@hotmail.com');
            const result = await ClassServices.createClass(newClassroom.id, 'test class');
            expect(result).to.have.property('name');
        });
    });

    describe('#remove class', function () {

        it('provided a valid class should return true when deleted', async function () {
            const newClassroom = await ClassroomServices.createClassroom('test1@hotmail.com');
            const newClass = await ClassServices.createClass(newClassroom.id, 'test class');
            const result = await ClassServices.removeClass(newClass.id);
            expect(result).to.be.true;
        });
    });

    describe('#update class', function () {

        it('provided a valid class should return the number of rows updated', async function () {
            const newClassroom = await ClassroomServices.createClassroom('test1@hotmail.com');
            const newClass = await ClassServices.createClass(newClassroom.id, 'test class');
            const result = await ClassServices.updateClass(newClass.id, 'name', 'new class name');
            expect(result).to.equal(1);
        });
    });

    describe('#get class', function () {

        it('provided a valid classroom, return classes as array', async function () {
            const newClassroom = await ClassroomServices.createClassroom('test1@hotmail.com');
            const newClass = await ClassServices.createClass(newClassroom.id, 'test class');
            const result = await ClassServices.getClass(newClassroom.id);
            expect(result).to.be.an('array');
        });
    });

});