/* Export function that creates sequelize model and accepts seq instance and seq types */
module.exports = (sequelize, type) => {
    return sequelize.define('grade', {
        /**
         * This model uses a composite primary key, therefore the foreign keys are defined
         * with the schema its self
         */
        student_id: {
            type: type.BIGINT,
            primaryKey: true,
        },
        task_id: {
            type: type.BIGINT,
            primaryKey: true,
        },
        grade: type.DECIMAL,

        /* Overrides for assesment settings, for particular students,
         this is useful, if you want to adjust the weight of an assesment as an exception for the student
        */
    })
}