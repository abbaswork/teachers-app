/* Load Sequelize and config */
const { Sequelize, DataTypes } = require("sequelize"); // Import the built-in data types
const config = require('./../config/db');

/* Load Sequelize models */
const teacherModel = require('./teacher');
const emailModel = require('./email');
const { options } = require("./../config/db");

/* Create sequelize class that can both load sequelize and return connection instance */
class SequelizeBot {
    constructor() {

        /* Pass connection Heroku URI to initialize psql connection to Sequelize */
        this.sequelize = new Sequelize(config.database, config.options);
    }

    /* init for use by loader */
    async init() {

        /* Test connection */
        try {
            await this.sequelize.authenticate();
        
            /* If succesful load all the tables and determine the relations */
            this.Teacher = await teacherModel(this.sequelize, DataTypes);
            this.Email  = await emailModel(this.sequelize, DataTypes);
            this.Email.hasOne(this.Teacher, {foreignKey: 'email'});
            
            /* Finally sync all the tables */
            this.sequelize.sync();

        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

    }
}

module.exports = new SequelizeBot();