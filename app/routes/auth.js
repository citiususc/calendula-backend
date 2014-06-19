/*
 * Auth routes
 */
var authUtil  = require('../util/auth');
var response  = require('../util/response');
var User      = require('../models/user');


// expose the routes to our app with module.exports
module.exports = function(router) {

  /**
   * Register
   */
  router.route('/register').post(function(req, res) {
    // create new user instance
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    // generate token
    user.token = authUtil.generateSecureToken(user);
    // save the user and check for errors
    user.save(function(err) {
      if (err)
        response.exception(res,"Error registering user!",err);
      response.success(res, user.token);
    });
  });

  /**
   * Login
   */
  router.route('/login').post(function(req, res) {
    // get login credentials
    var credentials = {
      username : req.body.username,
      password : req.body.password
    };

    User.findOne(credentials, function (err, user){
        if(err)
          response.exception(res,"Login error", err);
        else if(!user)
          response.error(res,"Login failed!", 401);
        else
          response.success(res,{token: user.token});
    });

	});

};
