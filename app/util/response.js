/*
 * Utility class for building json standarized responses with the format:
 *
 * {
 *   status:     HTTP Status code
 *   success:    true/false,
 *   data:       Object/Array,
 *   message:    Contains description message in case of request failure,
 *   exception:  May contain exception traces
 * }
 *
 */

 var successResponseBody = function(data){
   return {
     status: 200,
     success:true,
     data: data
   };
 };

 var errorResponseBody = function(status, message, ex){
     var msg = {
       status: status,
       success: false
     };
     if(message)
       msg.message = message;
     if(ex)
       msg.exception=ex;
     return msg;
};

module.exports = {

   success: function(res, data){
     res.json(200, successResponseBody(data));
   },

   error: function(res, message, status){
     status = status || 400;
     res.json(status, errorResponseBody(status, message));
   },

   exception: function(res, message, ex, status){
     status = status || 500;
     res.json(status, errorResponseBody(status, message, ex));
   }

};
