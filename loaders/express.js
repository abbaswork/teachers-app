/* Load express and middleware libraries */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

/* Setup router and intialise with routes */
//var indexRouter = require('./../routes/index');
var teachersRouter = require('../routes/teachers');

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
    app.use('/teachers', teachersRouter);

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