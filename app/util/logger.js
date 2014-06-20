module.exports = {
    // loag all requests
    logAll: function(req, res, next) {
	     next(); // make sure we go to the next routes and don't stop here
    },

    error: function(err, req, res, next) {
      next(err);
    }
};
