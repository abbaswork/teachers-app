var express = require('express');
var router = express.Router();
var ClassroomServices = require('../services/classroom');
var ClassServices = require('../services/class');

/* Load user defined middleware */
var passport = require('../middleware/auth');

/* retrieve class(es) that belong to provided teacher */
router.get('/', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {


        try {
            /* use classroom id for teacher to return classes */
            const classroom = await ClassroomServices.getClassroom(req.user.email); //using email of user passed from auth middleware
            const classes = await ClassServices.getClass(classroom[0].id);
            res.status(200).json(classes);
        } catch (e) {
            next(e);
        }

    });

/* create class for classroom */
router.post('/', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            /* used post body to create class for teacher */
            const classroom = await ClassroomServices.getClassroom(req.user.email);
            const classes = await ClassServices.createClass(classroom[0].id, req.body.name);
            res.status(200).json(classes);
        } catch (e) {
            next(e);
        }

    });

router.delete('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            /* remove class using class id */
            const classes = await ClassServices.removeClass(req.params.id);
            res.status(200).json(classes);
        } catch (e) {
            next(e);
        }

    });


module.exports = router;
