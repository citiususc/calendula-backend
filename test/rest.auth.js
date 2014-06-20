var should = require('should');
var assert = require('assert');
var request = require('supertest');

var app = require('../app');
var database   = require('../config/database');
var serverCgf  = require('../config/server');
var authCgf    = require('../config/auth');
var User       = require('../app/models/user');

describe('Auth API (App.routes.auth)', function() {

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

  // Auth API tests

  describe('Register', function() {

    it('Authentication should be enabled', function(done) {
        authCgf.enabled.should.equal(true);
        done();
    });


    it('should return success trying to register an user', function(done) {
      request(url).post('/register').send(user).end(function(err, res) {
            if (err)
              throw err;

            res.status.should.equal(200);
            done();
      });
    });

    it('should return error trying to register an user with an existing id', function(done) {
      request(url).post('/register').send(user).end(function(err, res) {
            if (err) throw err;
            res.status.should.equal(409);
            done();
      });
    });

  });

  describe('Login', function() {

    it('should return a string token when login with valid credentials', function(done) {
      request(url).post('/login').send(user).end(function(err, res) {
            if (err) throw err;
            res.status.should.equal(200);
            res.body.data.token.should.be.type('string');
            done();
      });
    });

    it('should fail when trying to login with invalid credentials', function(done) {
      request(url).post('/login').send({username:'walter', password:'wrong'}).end(function(err, res) {
            if (err) throw err;

            res.status.should.equal(401);
            done();
      });
    });

  });

});
