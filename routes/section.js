var express = require('express');
var router = express.Router();
var SectionServices = require('../services/section');

/* Load user defined middleware */
var passport = require('../middleware/auth');

/* retrieve sections */
router.get('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            /* use class id to get sections */
            const sections = await SectionServices.getSection(req.params.id);
            res.status(200).json(sections);
        } catch (e) {
            next(e);
        }

    });

/* create section */
router.post('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            /* used post body to create class for teacher */
            const section = await SectionServices.createSection(req.params.id, req.body.name, req.body.color)
            res.status(200).json(section);
        } catch (e) {
            next(e);
        }

    });

/* update section */
router.put('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            const section = await SectionServices.updateSection(req.params.id, req.body.field, req.body.value);
            res.status(200).json(section);
        } catch (e) {
            next(e);
        }

    });

/* delete section */
router.delete('/:id', passport.authenticate('basic', { session: false }),
    async function (req, res, next) {

        try {
            const section = await SectionServices.removeSection(req.params.id);
            res.status(200).json(section);
        } catch (e) {
            next(e);
        }

    });


module.exports = router;
