// user routes
// load the user model
var Auth       = require('../util/auth');
var User       = require('../models/user');
var response   = require('../util/response');


// expose the routes to our app with module.exports
module.exports = function(router) {

  /**
   * @apiVersion 0.1.0
   * @api {get} /users Request all users
   * @apiName GetUsers
   * @apiGroup User
   *
   * @apiParam {String} auth Authorization token
   *
   * @apiSuccess {Object} users Array of users
   */
  router.route('/users').get(function(req, res) {
    	User.find(function(err, users) {
			if (err)
				response.exception(res,"Error finding users", err);
			response.success(res,users);
		});
  });

   /**
    * @apiVersion 0.2.0
    * @api {get} /users/:username Request an user by username
    * @apiName GetUser
    * @apiGroup User
    *
    * @apiSuccess {Object} user User information
    */
  router.route('/users/:username').get(function(req, res) {
      User.findOne({username: req.params.username}, function(err, user) {
      if (err)
        response.exception(res,"Error finding user", err);

      response.success(res,user);
    });
  });

};
