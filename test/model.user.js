var should     = require('should');
var assert     = require('assert');
var request    = require('supertest');
var bcrypt     = require('bcrypt');
var User       = require('../app/models/user');
var app        = require('../app');
var authCfg    = require('../config/auth');

describe('User model (App.models.user)', function() {

  // testing user
  var user = null;
  var name = 'walter';
  var password = 'albuquerque';

  before(function(done) {
      user = new User({
        username: name,
        password: password,
      });
      done();
  });


  // Setup our database before testing. In this case, we are going to start
  // the aplicaction and insert 2 users
  before(function(done) {

    // start app in testing mode
    if(!app.started()) app.start(true);

    // clean up
    User.remove(function(){

      user = new User({
        username: name,
        password: password,
      });

      user.save(function(err) {
        if (err)
          throw err;

        done();
      });

    });

  });

  describe('Valid', function() {

    it('should be not null', function(done) {
        user.should.be.type('object');
        done();
    });

    it('sholud have the username specified on creation', function(done) {
        user.username.should.eql(name);
        done();
    });

    it('sholud have his password hashed', function(done) {

      user.comparePassword(password, function(err, isMatch) {
          if (err)
            throw err;
          isMatch.should.equal(true);
          done();
        });

    });

  });

});
