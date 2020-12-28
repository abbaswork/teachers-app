const { Sequelize } = require('sequelize');
const config = require('./../config/db');

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
            console.log('Sequelize Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

    }
}

module.exports = new SequelizeBot();