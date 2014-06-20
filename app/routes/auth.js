/*
 * Auth routes
 */
var authUtil  = require('../util/auth');
var response  = require('../util/response');
var User      = require('../models/user');

// expose the routes to our app with module.exports
module.exports = function(router) {

  /**
  * @apiVersion 0.1.0
  * @api {post} /register Register an user
  * @apiName UserRegister
  * @apiGroup Auth
  *
  * @apiParam {String} username Username to register
  * @apiParam {String} password Password to set
  *
  * @apiSuccess {String} auth Authentication token for the registered user
  */
  router.route('/register').post(function(req, res) {
    // create new user instance
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;

    // verify username doesnt exist
    User.findOne({username: user.username}, function (err, user){
        if(err)
          response.exception(res,"Error registering user!",err);
        else if(user)
          response.error(res,"Username already exists!", 409);
    });


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
     * @apiVersion 0.1.0
     * @api {post} /login User login
     * @apiName UserLogin
     * @apiGroup Auth
     *
     * @apiParam {String} username User username
     * @apiParam {String} password User password
     *
     * @apiSuccess {String} auth Authentication token for the user
     */
  router.route('/login').post(function(req, res) {

    // get login credentials
    var credentials = {
      username : req.body.username
    };

    var password = req.body.password;

    User.findOne(credentials, function (err, user){
        if(err)
          response.exception(res,"Login error", err);
        else if(!user)
          response.error(res,"Login failed! Invalid account", 401);
        else{
          user.comparePassword(password, function(err, isMatch) {
            if (err)
              response.exception(res,"Error trying to login", err);
            else if(isMatch)
              response.success(res,{token: user.token});
            else
              response.error(res,"Login failed! Invalid credentials", 401);
          });
        }
    });

	});

};
