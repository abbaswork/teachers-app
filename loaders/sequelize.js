const { Sequelize } = require('sequelize');

/* Export function that initialises sequelize */
module.exports = async function expressLoader(app) {

    /* Pass connection Heroku URI to initialize psql connection to Sequelize */
    var sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

    /* Test connection */
    try {
        await sequelize.authenticate();
        console.log('Sequelize Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return sequelize;

};



