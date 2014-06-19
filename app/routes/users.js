// user routes
// load the user model
var Auth       = require('../util/auth');
var User       = require('../models/user');
var response   = require('../util/response');


// expose the routes to our app with module.exports
module.exports = function(router) {

  /**
   * Get all users
   */
  router.route('/users').get(function(req, res) {
    	User.find(function(err, users) {
			if (err)
				response.exception(res,"Error finding users", err);
			response.success(res,users);
		});
  });

  /**
   * Get an user by id
   */
  router.route('/users/:id').get(function(req, res) {
      User.findById(req.params.id, function(err, user) {
      if (err)
        response.exception(res,"Error finding user", err);
      response.success(res,user);
    });
  });

};
