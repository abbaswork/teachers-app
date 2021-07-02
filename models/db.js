/* Load Sequelize and config */
const { Sequelize, DataTypes } = require("sequelize"); // Import the built-in data types
const config = require('./../config/db');

/* Load Sequelize models */
const teacherModel = require('./teacher');
const emailModel = require('./email');
const classroomModel = require('./classroom');
const classModel = require('./class');
const sectionModel = require('./section');
const taskModel = require('./task');
const subtaskModel = require('./subtask');
const studentModel = require('./student');
const gradeModel = require('./grade');
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
            this.Email = await emailModel(this.sequelize, DataTypes);
            this.Email.hasOne(this.Teacher, { foreignKey: 'email' });

            this.Classroom = await classroomModel(this.sequelize, DataTypes);
            this.Teacher.hasMany(this.Classroom, { foreignKey: 'teacher_id' });

            this.Class = await classModel(this.sequelize, DataTypes);
            this.Classroom.hasMany(this.Class, { foreignKey: 'classroom_id' });

            this.Section = await sectionModel(this.sequelize, DataTypes);
            this.Class.hasMany(this.Section, { foreignKey: 'class_id' });

            this.Task = await taskModel(this.sequelize, DataTypes);
            this.Section.hasMany(this.Task, { foreignKey: 'section_id' });

            this.Subtask = await subtaskModel(this.sequelize, DataTypes);
            this.Task.hasMany(this.Subtask, { foreignKey: 'task_id' });

            this.Student = await studentModel(this.sequelize, DataTypes);
            this.Class.hasMany(this.Student, { foreignKey: 'class_id' });

            //composite table, already has foreign keys (student and task) defined as primary key
            this.Grade = await gradeModel(this.sequelize, DataTypes);
            this.Student.hasMany(this.Grade, { foreignKey: 'student_id' });
            this.Task.hasMany(this.Grade, { foreignKey: 'task_id' });

            /* Finally sync all the tables */
            this.sequelize.sync();

        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

    }
}

module.exports = new SequelizeBot();