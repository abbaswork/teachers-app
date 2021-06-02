/* Export function that creates sequelize model and accepts seq instance and seq types*/
module.exports = (sequelize, type) => {
    return sequelize.define('student', {
        id: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        first: type.STRING,
        last: type.STRING,
    })
}