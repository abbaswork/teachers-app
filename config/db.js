module.exports = {
    database: process.env.DATABASE_URL,
    options: {
        logging: false,
        dialect: 'postgres',
        dialectOptions: {
            /* Heroku required ssl settings */
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
}