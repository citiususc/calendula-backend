var mongoose     = require('mongoose');
//var bcrypt 			= require('bcrypt');
var Schema       = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var UserSchema   = new Schema({
	username: {
		type: String,
	  index: true,
		unique:true
	},
  password: {
		type: String,
		required: true
	},
  token: String
});

module.exports = mongoose.model('User', UserSchema);
