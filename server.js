var express = require('express');
var app     = require('./app');

// serve api docs on subpath
app.expressApp.use('/docs', express.static(__dirname + '/docs'));

// start app
app.start();
