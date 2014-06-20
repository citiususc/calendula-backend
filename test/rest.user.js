var should = require('should');
var assert = require('assert');
var request = require('supertest');

var app = require('../app');
var database   = require('../config/database');
var serverCgf  = require('../config/server');
var User       = require('../app/models/user');

describe('User API (App.routes.users)', function() {

  var url  = 'http://localhost:' + serverCgf.port + "/api";
  var walter = null, mike = null;

  // Setup our database before testing. In this case, we are going to start
  // the aplicaction and insert 2 users
  before(function(done) {

    // start app in testing mode
    if(!app.started()) app.start(true);

    // clean up
    User.remove(function(){
      // create users
      walter = new User({username: 'walter', password: 'albuquerque'});
      mike = new User({username: 'mike', password: 'albuquerque'});

      User.create([mike],function(err) {
        if (err)
          throw err;
        // save walter vía api to obtain an API token
        request(url).post('/register').send(walter).end(function(err, res) {
              if (err)
                throw err;

              walter.token = res.body.data;
              done();
        });
      });

    });

  });

  after(function(){
    app.stop();
  });

  describe('User listing', function() {

    it('should return an user list with two items', function(done) {
      request(url).get('/users').set("auth",walter.token).end(function(err, res) {
            if (err)
              throw err;

            res.status.should.equal(200);
            res.body.should.have.property('data').with.lengthOf(2);
            done();
      });
    });

    it('should return the requested user', function(done) {
      request(url).get('/users/' + walter.username).set("auth",walter.token).end(function(err, res) {
            if (err)
              throw err;

            res.status.should.equal(200);
            res.body.success.should.equal(true);
            res.body.data.should.have.property('username').equal(walter.username);

            done();
      });
    });

  });

});
