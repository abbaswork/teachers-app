/* Export function that creates sequelize model and accepts seq instance and seq types*/
module.exports = (sequelize, type) => {
    return sequelize.define('teacher', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        /*email: {
            type: type.STRING,
            primaryKey: true,
        },*/
        password: type.STRING,
        name: type.STRING
    })
}