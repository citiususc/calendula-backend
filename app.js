/*
 * Setup
 */
var express    = require('express');
var app        = express();
var https      = require('https');
var fs         = require('fs');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var auth  	   = require('./app/util/auth');
var database   = require('./config/database');
var serverCfg  = require('./config/server');
var logger  	 = require('./app/util/logger');

var port  	   = process.env.PORT || 9090;
var router     = express.Router();

/*
 * Configuration
 */
console.log("Connecting to mongoDB on " + database.url);
// connect to de mongoDB database
mongoose.connect(database.url);

// configure app
app.use(bodyParser());
app.use(logger.error);
app.use(logger.logAll);
app.use(auth.requireAuthorization);
app.use('/api', router);

/*
 * Routes
 */
require('./app/routes/users.js')(router);
require('./app/routes/auth.js')(router);

/*
 * Server start
 */
 if(serverCfg.https)
   https.createServer(serverCfg.httpsOptions, app).listen(port, 'localhost');
 else
   app.listen(port);

console.log("App listening on port " + port, " (https: " + serverCfg.https+ ")");
