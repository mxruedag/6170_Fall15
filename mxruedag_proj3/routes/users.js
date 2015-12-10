var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var User = require('../models/User');
var Users = require('../models/Users');
var Tweets = require('../models/Tweets');

/*
  For both login and create user, we want to send an error code if the user
  is logged in, or if the client did not provide a username and password
  This function returns true if an error code was sent; the caller should return
  immediately in this case.
*/
var isLoggedInOrInvalidBody = function(req, res) {
  if (req.currentUser) {
    utils.sendErrResponse(res, 403, 'There is already a user logged in.');
    return true;
  } else if (!(req.body.username && req.body.password)) {
    utils.sendErrResponse(res, 400, 'Username or password not provided.');
    return true;
  }
  return false;
};

/*
  This function will check to see that the provided username-password combination 
  is valid. For empty username or password, or if the combination is not correct, 
  an error will be returned.

  An user already logged in is not allowed to call the login API again; an attempt
  to do so will result in an error code 403.

  POST /users/login
  Request body:
    - username
    - password
  Response:
    - success: true if login succeeded; false otherwise
    - content: on success, an object with a single field 'user', the object of the logged in user
    - err: on error, an error message
*/
router.post('/login', function(req, res) {
  if (isLoggedInOrInvalidBody(req, res)) {
    return;
  }

  Users.verifyPassword(req.body.username, req.body.password, function(err, verified){
    if (err) {
      utils.sendErrResponse(res, 500, 'An unexpected error has occurred');
    }
    else if (!(verified)) {
      utils.sendErrResponse(res, 403, 'Username or password invalid.');
    }
    else {
      req.session.username = req.body.username;
      utils.sendSuccessResponse(res, {user:req.body.username});
    }
  });  

});

/*
  POST /users/logout
  Request body: empty
  Response:
    - success: true if logout succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/logout', function(req, res) {
  if (req.currentUser) {
    req.session.destroy();
    utils.sendSuccessResponse(res);
  } else {
    utils.sendErrResponse(res, 403, 'There is no user currently logged in.');
  }
});

/*
  Create a new user in the system.

  All usernames in the system must be distinct. If a request arrives with a username that
  already exists, the response will be an error.

  This route may only be called accessed without an existing user logged in. If an existing user
  is already logged in, it will result in an error code 403.

  Does NOT automatically log in the user.

  POST /users
  Request body:
    - username
    - password
  Response:
    - success: true if user creation succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/', function(req, res) {
  if (isLoggedInOrInvalidBody(req, res)) {
    return;
  }

  Users.usernameExists(req.body.username, function(err, exists){
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    }
    else if (exists) {
      utils.sendErrResponse(res, 400, 'That username is already taken.');
    }
    else {
      Users.createNewUser(req.body.username, req.body.password, function(err){
        if (err) {
          utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
        }
        else {
          utils.sendSuccessResponse(res, req.body.username);
        }
      });
    }
  });

});

/*
  Determine whether there is a current user logged in

  GET /users/current
  No request parameters
  Response:
    - success.loggedIn: true if there is a user logged in; false otherwise
    - success.user: if success.loggedIn, the currently logged in user
*/
router.get('/current', function(req, res) {
  if (req.currentUser) {
    utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.username });
  } else {
    utils.sendSuccessResponse(res, { loggedIn : false });
  }
});

/*
  Follow a user.

  POST /users/follow
  Request body:
    - the username of the followee
  Response:
    - success: true if user creation succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/follow', function(req, res) {

  Users.isFollowing(req.currentUser.username, req.body.followeeUsername, function(err, isFollowing){
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    }
    else if (isFollowing) {
      utils.sendErrResponse(res, 400, 'Already following that user.');
    }
    else {
      Users.follow(req.currentUser.username, req.body.followeeUsername, function(err){
        if (err){
          utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
        }
        else {
          utils.sendSuccessResponse(res);
        }
      });
    }
  });
  
});

module.exports = router;
