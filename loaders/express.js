/* Load express and middleware libraries */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

/* Setup router and intialise with routes */
//var indexRouter = require('./../routes/index');
//var classroomRouter = require('../routes/classroom');
var teacherRouter = require('../routes/teacher');
var classRouter = require('../routes/class');
var sectionRouter = require('../routes/section');
var taskRouter = require('../routes/task');
var subtaskRouter = require('../routes/subtask');
var studentRouter = require('../routes/student');

/* Export function that initialises express */
module.exports = function expressLoader(app) {

    /* Setup view engine */
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    /* intialise middleware */
    app.use(cors());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    /* initialise routers */
    //app.use('/', indexRouter);
    app.use('/teacher', teacherRouter);
    app.use('/class', classRouter);
    app.use('/section', sectionRouter);
    app.use('/task', taskRouter);
    app.use('/subtask', subtaskRouter);
    app.use('/student', studentRouter);

    /* Serve Built React Client */
    app.use(express.static(path.join(__dirname, './../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + './../client/build/index.html'));
    });

    /* catch 404 and forward to error handler */
    app.use(function (req, res, next) {
        next(createError(404));
    });

    /* Error handler middleware, always defined last */
    app.use(function (err, req, res, next) {

        /* instead of rendering an error page send an error response with json to the client and let it handle the response */
        res.status(err.status || 500).send(err);

        /*
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error'); */
    });


    return app;
}