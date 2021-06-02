const configVars = require('dotenv').config();

/* Testing + with promises libraries */
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const ClassroomServices = require('../services/classroom');
const TeacherServices = require('../services/teacherServices');

/* DB imports for before and after loading rows */
var SequelizeBot = require('../models/db');
const { Op } = require("sequelize");

/* configure chai to use promises and set expect to follow BDD style */
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('#classroom services', function () {

    before(async function () {
        await SequelizeBot.init();
        await TeacherServices.signup('test1@hotmail.com', 'secret', 'teacher');
    });

    after(async function () {
        await SequelizeBot.Teacher.destroy({
            where: {
                email: {
                    [Op.or]: ['test1@hotmail.com', 'test2@hotmail.com']
                }
            }
        });
        await SequelizeBot.Email.destroy({
            where: {
                email: {
                    [Op.or]: ['test1@hotmail.com', 'test2@hotmail.com']
                }
            }
        });
        await SequelizeBot.Classroom.destroy({
            where: {
                teacher_id: null
            }
        });
    });


    describe('#create classroom', function () {

        it('provided invalid email should return error', async function () {
            await expect(ClassroomServices.createClassroom()).to.be.rejectedWith(Error);
        });

        it('provided a valid email with no existing teacher should return null', async function () {
            const result = await ClassroomServices.createClassroom('test3@hotmail.com');
            expect(result).to.be.null;
        });

        it('provided a valid email with an existing teacher should return teacher after creating classroom', async function () {
            const result = await ClassroomServices.createClassroom('test1@hotmail.com');
            expect(result).to.have.property('id');
        });
    });

});