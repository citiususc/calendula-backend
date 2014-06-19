var token         = require('token');
var authConfig    = require('../../config/auth');
var response            = require('../util/response');
var User          = require('../models/user');

// configure token generation
token.defaults.secret   = authConfig.SECRET_KEY;
token.defaults.timeStep = authConfig.TIME_STEP;


// check if a request can be done without authorization
var isAuthorizationExteption = function(req){

  var exceptions = authConfig.exceptions || [], isEx = false;
  exceptions.forEach(function(e) {
      if(req.path.indexOf(e) >= 0)
          isEx = true;
  });
  return isEx;
};

module.exports = {

    // secure token generation
    generateSecureToken: function (user){
        return token.generate(user.username + "|" + user.password);
    },

    // secure token verification
    requireAuthorization: function(req, res, next){

        if(isAuthorizationExteption(req)){
          console.log("Auth exception: " + req.path);
          next();
        }else{
          var auth = req.header("auth");
          User.findOne({token: auth}, function (err, user){
              if(err || !user)
                response.error(res, "Not authorized", 401);
              else if(token.verify(user.username + "|" + user.password, req.header("auth")))
                next();
              else
                console.log("Request not authorized!");
          });
        }
    }
};
