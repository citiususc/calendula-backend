var express = require('express');
var app     = require('./app');

// serve api docs on subpath
app.expressApp.use('/docs', express.static(__dirname + '/public/docs'));
app.expressApp.use('/coverage', express.static(__dirname + '/public/coverage/lcov-report'));

// start app
app.start();
