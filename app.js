/*
 * Setup
 */
var express    = require('express');
var app        = express();
var https      = require('https');
var fs         = require('fs');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var auth       = require('./app/util/auth');
var database   = require('./config/database');
var serverCfg  = require('./config/server');
var authCfg    = require('./config/auth');
var logger  	 = require('./app/util/logger');

var port  	   = process.env.PORT || serverCfg.port;
var router     = express.Router();
var server     = null;
var started    = false;
/*
 * Configuration
 */
app.use(bodyParser());
app.use(logger.error);
app.use(logger.logAll);

if(authCfg.enabled)
  app.use(auth.requireAuthorization);

app.use('/api', router);

/*
 * Routes
 */
require('./app/routes/users.js')(router);
require('./app/routes/auth.js')(router);

// Export app and start function
module.exports = {
    // express app
    expressApp : app,

    started: function(){return started;},

    // function to start the app
    start: function(testing){

      var dbUrl = testing ? database.testUrl : database.url;
      if(!testing) console.log("*** Connecting to mongoDB on " + database.url);
      // connect to de mongoDB database
      mongoose.connect(dbUrl);
      // start server
      if(serverCfg.https)
        server = https.createServer(serverCfg.httpsOptions, app).listen(port, 'localhost');
      else
        server = app.listen(port);

     started = true;
     if(!testing) console.log("*** App listening on port " + port, "{ https: " + serverCfg.https+ ", authentication: " + authCfg.enabled +"}\n");

   },

   stop: function(){
      if(server)
          server.close();
      if(mongoose.connection)
        mongoose.connection.close()

      started = false;
      console.log("*** App stopped");
   }
}
