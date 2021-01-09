const configVars = require('dotenv').config();

/* Testing + with promises libraries */
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const classroomServices = require('./../services/classroom');

/* DB imports for before and after loading rows */
var SequelizeBot = require('./../models/db');
const { Op } = require("sequelize");

/* configure chai to use promises and set expect to follow BDD style */
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Test Teacher Services', function () {
    /*
        before(async function () {
            await SequelizeBot.init();
            await SequelizeBot.Email.create({ email: 'test@hotmail.com' });
            await SequelizeBot.Teacher.create({
                email: 'test@hotmail.com',
                password: 'secret',
                name: 'teacher'
            });
        });
    
        after(async function () {
            await SequelizeBot.Teacher.destroy({
                where: {
                    email: {
                        [Op.or]: ['test@hotmail.com', 'test2@hotmail.com']
                    }
                }
            });
            await SequelizeBot.Email.destroy({
                where: {
                    email: {
                        [Op.or]: ['test@hotmail.com', 'test2@hotmail.com']
                    }
                }
            });
        });*/


    describe('Create Classroom for given teacher', function () {

        it('provided invalid email should return error', async function () {
            await expect(classroomServices.createClassroom()).to.be.rejectedWith(Error);
        });
    });

});