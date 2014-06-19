module.exports = {
    // loag all requests
    logAll: function(req, res, next) {
	     console.log('Request: ', req.method , req.path, req.params);
	     next(); // make sure we go to the next routes and don't stop here
    },

    error: function(err, req, res, next) {
      console.error("Something blew up:", err.stack);
      next(err);
    }
};
