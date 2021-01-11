var express = require('express');
var router = express.Router();
var SubtaskServices = require('../services/subtask');

/* Load user defined middleware */
var passport = require('../middleware/auth');
const { Subtask } = require('../models/db');

/* retrieve subtasks */
router.get('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            /* use task id to get subtasks */
            const subtasks = await SubtaskServices.getSubtask(req.params.id)
            res.status(200).json(subtasks);
        } catch (e) {
            next(e);
        }

    });

/* create subtask */
router.post('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            const subtask = await SubtaskServices.createSubtask(req.params.id, req.body.name, req.body.status);
            res.status(200).json(subtask);
        } catch (e) {
            next(e);
        }

    });

/* update subtask */
router.put('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            const subtask = await SubtaskServices.updateSubtask(req.params.id, req.body.field, req.body.value);
            res.status(200).json(subtask);
        } catch (e) {
            next(e);
        }

    });

/* delete subtask */
router.delete('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            const subtask = await SubtaskServices.removeSubtask(req.params.id);
            res.status(200).json(subtask);
        } catch (e) {
            next(e);
        }

    });


module.exports = router;
