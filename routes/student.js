var express = require('express');
var router = express.Router();
var StudentServices = require('../services/student');

/* Load user defined middleware */
var passport = require('../middleware/auth');

/* retrieve students for class/student id */
router.get('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        /* Extract type query paramater, if undefined default to class */
        var type = req.query.type || 'class_id';

        try {
            /* use class id to get sections */
            const students = await StudentServices.getStudentGrades(req.params.id, type);
            res.status(200).json(students);
        } catch (e) {
            next(e);
        }

    });

/* update student grades */
router.put('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            const task = await StudentServices.updateStudentGrade(req.body.studentRow);
            res.status(200).json(task);
        } catch (e) {
            next(e);
        }

    });

/* delete student along with thier grades */
router.delete('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {
        try {
            console.log('delete: ', req.params.id);
            const task = await StudentServices.deleteStudent(req.params.id);
            res.status(200).json(task);
        } catch (e) {
            next(e);
        }
    });
module.exports = router;
