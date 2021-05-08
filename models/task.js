/* Export function that creates sequelize model and accepts seq instance and seq types*/
module.exports = (sequelize, type) => {
    return sequelize.define('task', {
        id: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        date: type.DATE,
        type: type.STRING,
        assesment: type.STRING,
        points: type.DECIMAL,
        weight: type.DECIMAL,
        notes: type.TEXT,
    })
}