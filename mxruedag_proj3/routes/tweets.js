var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var User = require('../models/User'); // to be deleted
var Users = require('../models/Users');
var Tweets = require('../models/Tweets');

/*
  Require authentication on ALL access to /tweets/*
  Clients which are not logged in will receive a 403 error code.
*/
var requireAuthentication = function(req, res, next) {
  if (!req.currentUser) {
    utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
  } else {
    next();
  }
};

// Register the middleware handlers above.
router.all('*', requireAuthentication);

/*
  At this point, clients must be logged into some account
*/

/*
  GET /tweets
  No request parameters
  Response:
    - success: true if the server succeeded in getting the user's tweets
    - content: on success, an object with a single field 'tweets', which contains a list of all the
    tweets
    - err: on failure, an error message
*/
router.get('/', function(req, res, next) {
  Tweets.getTweets(req.currentUser.username, null, function(err, tweets){
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    }
    else {
      utils.sendSuccessResponse(res, {tweets: tweets});
    }
  });
});

/*
  GET /tweets/feed
  No request parameters
  Response:
    - success: true if the server succeeded in getting the user's tweets
    - content: on success, an object with a single field 'tweets', which contains a list of the
    user's followees'
    - err: on failure, an error message
*/
router.get('/feed', function(req, res, next) {
  Tweets.getTweets(req.currentUser.username, req.currentUser.following, function(err, tweets){
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    }
    else {
      utils.sendSuccessResponse(res, {tweets: tweets});
    }
  });
});

/*
  GET /tweets/:tweet
  Request parameters:
    - tweet: the unique ID of the tweet within the logged in user's tweet collection
  Response:
    - success: true if the server succeeded in getting the user's tweets
    - content: on success, the tweet object with ID equal to the tweet referenced in the URL
    - err: on failure, an error message
*/
router.get('/:tweet', function(req, res) {
  utils.sendSuccessResponse(res, req.tweet);
});

/*
  POST /tweets
  Request body:
    - content: the content of the tweet
  Response:
    - success: true if the server succeeded in recording the user's tweet
    - err: on failure, an error message
*/
router.post('/', function(req, res) {
  Tweets.addTweet(req.currentUser.username, req.currentUser.username, req.body.content, function(err) {
    if (err){
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    }
    else {
      utils.sendSuccessResponse(res);
    }
  });
});

/*
  POST /tweets/retweet
  Request body:
  - tweet ID: the unique ID of the tweet within the logged in user's tweet collection
  Response:
  - success: true if the server succeeded in deleting the user's tweet
  - err: on failure
*/
router.post('/retweet', function(req, res) {
  Tweets.getTweet(req.body.tweetId, function(err, tweet){
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    }
    else {
      Tweets.addTweet(tweet.creator, req.currentUser.username, tweet.content, function(err){
        if (err) {
          utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
        }
        else {
          utils.sendSuccessResponse(res);
        }
      })
    }
  });
});

/*
  DELETE /tweets/:tweet
  Request parameters:
    - tweet ID: the unique ID of the tweet within the logged in user's tweet collection
  Response:
    - success: true if the server succeeded in deleting the user's tweet
    - err: on failure, an error message
*/
router.delete('/:tweet', function(req, res) {
  Tweets.deleteTweet(req.params.tweet, function(err,record){
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    }
    else {
      utils.sendSuccessResponse(res);
    }
  });
});

module.exports = router;
