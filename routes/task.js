var express = require('express');
var router = express.Router();
var TaskServices = require('../services/task');

/* Load user defined middleware */
var passport = require('../middleware/auth');

/* retrieve Tasks */
router.get('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            /* use class id to get sections */
            const tasks = await TaskServices.getTask(req.params.id)
            res.status(200).json(tasks);
        } catch (e) {
            next(e);
        }

    });

/* create section */
router.post('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            /* used post body to create class for teacher */
            const task = await TaskServices.createTask(req.params.id, req.body.name, req.body.date);
            res.status(200).json(task);
        } catch (e) {
            next(e);
        }

    });

/* update section */
router.put('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            const task = await TaskServices.updateTask(req.params.id, req.body.field, req.body.value);
            res.status(200).json(task);
        } catch (e) {
            next(e);
        }

    });

/* update section */
router.put('/assesment/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        console.log(req.body);

        try {
            const task = await TaskServices.updateTaskAssesment(req.params.id, req.body.assesment);
            res.status(200).json(task);
        } catch (e) {
            console.log(e);
            next(e);
        }

    });

/* delete section */
router.delete('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            const task = await TaskServices.removeTask(req.params.id);
            res.status(200).json(task);
        } catch (e) {
            next(e);
        }

    });


module.exports = router;
