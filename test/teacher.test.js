const configVars = require('dotenv').config();

/* Testing + with promises libraries */
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const TeacherServices = require('../services/teacherServices');

/* DB imports for before and after loading rows */
var SequelizeBot = require('../models/db');
const { Op } = require("sequelize");

/* configure chai to use promises and set expect to follow BDD style */
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('#test teachers', function () {

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
    });


    describe('#teacher login', function () {

        it('provided an invalid callback, it should resolve with an error', async function () {
            await expect(TeacherServices.login()).to.be.rejectedWith(Error);
        });

        it('provided an invalid user and password, should return null in callback', async function () {
            const result = await TeacherServices.login(null, null, function (err, user) { return user; });
            expect(result).to.be.null;
        });

        it('provided an incorrect password for a username, should return null in callback', async function () {
            const result = await TeacherServices.login('test@hotmail.com', 'abc123', function (err, user) { return user; });
            expect(result).to.be.null;
        });

        it('provided the correct password for a username, should return the user array', async function () {
            const result = await TeacherServices.login('test@hotmail.com', 'secret', function (err, user) { return user; });
            expect(result).to.have.property('password');
        });

    });

    describe('#teacher signup', function () {

        it('provided an invalid user and/or password, return error', async function () {
            await expect(TeacherServices.signup()).to.be.rejectedWith(Error);
        });

        it('provided an existing email, return error', async function () {
            await expect(TeacherServices.signup('test@hotmail.com', 'secret', 'teacher')).to.be.rejectedWith(Error);
        });

        it('provided a valid username and password, return true', async function () {
            const result = await TeacherServices.signup('test2@hotmail.com', 'secret', 'teacher');
            expect(result).to.equal(true);
        });

    });


});