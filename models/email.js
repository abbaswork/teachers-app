/* Export function that creates sequelize model and accepts seq instance and seq types*/
module.exports = (sequelize, type) => {
    return sequelize.define('email', {
        email: {
            type: type.STRING,
            primaryKey: true,
        },
    })
}