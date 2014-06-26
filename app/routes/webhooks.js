var response   = require('../util/response');


// expose the routes to our app with module.exports
module.exports = function(router) {

  router.route('/build').get(function(req, res) {
      response.success(res,"It works!");
  });

  router.route('/build').post(function(req, res) {

      console.log("Webhook:",req);
      response.success(res,"It works!");
  });

};
