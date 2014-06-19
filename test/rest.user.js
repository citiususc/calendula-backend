var should = require('should');
var assert = require('assert');
var request = require('supertest');

var app = require('../app');
var database   = require('../config/database');
var serverCgf  = require('../config/server');
var User       = require('../app/models/user');

describe('User API (App.routes.users)', function() {

  var url = 'http://localhost:' + serverCgf.port + "/api";
  // run all the operations that are needed to setup our tests. In this case
  // I want to create a connection with the database, and when I'm done, I call done().

  before(function(done) {
    User.remove(done);
    // start app in testing mode
    if(!app.started()) app.start(true);
  });

  // testing user
  var user = {
    username: 'walter',
    password: 'albuquerque',
  };

  describe('User listing', function() {

    it('should return the user list', function(done) {
      request(url).post('/register').send(user).end(function(err, res) {
            if (err)
              throw err;

            res.status.should.equal(200);
            done();
      });
    });

  });

});
