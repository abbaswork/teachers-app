const configVars = require('dotenv').config();

/* Testing + with promises libraries */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
const TeacherServices = require('./../services/teacherServices');

/* DB imports for before and after loading rows */
var SequelizeBot = require('./../models/db');

/* configure chai to use promises and set expect to follow BDD style */
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Test Teacher Services', function () {

    describe('Verify Login', function () {

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
                    email: 'test@hotmail.com'
                }
            });
            await SequelizeBot.Email.destroy({
                where: {
                    email: 'test@hotmail.com'
                }
            });
        });


        it('provided an invalid callback it should resolve with an error', async function () {
            await expect(TeacherServices.login()).to.be.rejectedWith(Error);
        });

        it('provided an invalid user and password, should return an empty user', async function () {
            const result = await TeacherServices.login(null, null, function (err, user) { return user; });
            expect(result).to.be.null;
        });

        it('provided an incorrect password for a username, should return null', async function () {
            const result = await TeacherServices.login('test@hotmail.com', 'abc123', function (err, user) { return user; });
            expect(result).to.be.null;
        });

        it('provided the correct password for a username, should return the user', async function () {
            const result = await TeacherServices.login('test@hotmail.com', 'secret', function (err, user) { return user; });
            expect(result).to.be.an('array');
        });

    });


});