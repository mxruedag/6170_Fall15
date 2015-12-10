var helpers = require('../public/javascripts/helpers');

/**
* An object that stores, for each username, its name and written tweets
*/
var _store = { };

/**
* Model for a fritter User object. Each User object stores a username and a collection of tweets.
* Each tweet has some textual content and is specified by the owner's username as well as an ID.
* Each ID is unique only within the space of each User, so a (username, tweetID) uniquely specifies
* any tweet.
*/
var User = (function User(_store) {

  var that = Object.create(User.prototype);

  /**
  * Check if a user with a certain username exists
  * @param username the username to look for
  */
  var userExists = function(username) {
    return _store[username] !== undefined;
  }

  /**
  * Get the user object for the given username
  * @param username the given username
  */
  var getUser = function(username) {
    if (userExists(username)) {
      return _store[username];
    }
  }

  /**
  * Make a callback on the user of the given username
  * @param username the given username
  * @param callback a method that takes in an error object and a user object
  */
  that.findByUsername = function (username, callback) {
    if (userExists(username)) {
      callback(null, getUser(username));
    } else {
      callback({ msg : 'No such user!' });
    }
  }

  /**
  * Verify the password
  */
  that.verifyPassword = function(username, candidatepw, callback) {
    if (userExists(username)) {
      var user = getUser(username);
      if (candidatepw === user.password) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    } else {
      callback(null, false);
    }
  }

  /**
  * Create a new usename
  */
  that.createNewUser = function (username, password, callback) {
    if (userExists(username)) {
      callback({ taken: true });
    } else {
      _store[username] = { 'username' : username,
                 'password' : password,
                 'tweets' : [] };
      callback(null);
    }
  };

  /**
  * Log in a user. If the username doesn't already exist, add it to the _store
  * @param username the given username
  */
  that.loginUser = function (username) {
    if (!userExists(username)) {
      _store[username] = { 'username' : username,
                 'tweets' : [] };
    }
  };

  /**
  * Get the tweet with a given ID written by a given username, and perform a callback function
  * on it.
  * @param username the given username
  * @param tweetId the ID of the tweet
  * @param callback a function that takes in an error object and a tweet object
  */
  that.getTweet = function(username, tweetId, callback) {
    if (userExists(username)) {
      var user = getUser(username);
      if (user.tweets[tweetId]) {
        var tweet = user.tweets[tweetId];
        callback(null, tweet);
      } else {
        callback({ msg : 'Invalid tweet.'});
      }
    } else {
      callback({ msg : 'Invalid user.'});
    }
  };

  // se necesita esto ???
  /**
  * Create a copy of a tweet object.
  * @param tweet the tweet to copy
  */
  var copyTweet = function(tweet) {
    var tweetCopy = {};
    helpers.forEachKey(tweet, function(key){
      tweetCopy[key] = tweet[key];
    });
    return tweetCopy;
  }

  /**
  * Get a list of all tweets, such that all tweets from one user appear consecutively, each with
  * an extra field indicating whether it was written by a given username, and make a callback on
  * the list.
  * @param username the given username
  * @param callback the callback method that takes in an error object and the list of tweets
  */
  that.getTweets = function(username, callback) {
    if (userExists(username)){
      var tweetsList = []
      helpers.forEachKey(_store, function(key){
        _store[key].tweets.forEach(function(tweet) {
          var newTweet = copyTweet(tweet);
          newTweet.isUsernameAuthor = (newTweet.creator === username);
          tweetsList.push(newTweet);
        });
      });
      callback(null, tweetsList);
    } else {
      callback({ msg : 'Invalid user.' });
    }
  }

  /**
  * Add a new tweet
  * @param username the author of the tweet
  * @param tweet the tweet object
  * @param callback a method that takes in an error object
  */
  that.addTweet = function(username, tweet, callback) {
    if (userExists(username)) {
      var user = getUser(username);
      tweet._id = user.tweets.length;
      user.tweets.push(tweet);
      callback(null);
    } else {
      callback({ msg : 'Invalid user.' });
    }
  };

  /**
  * Remove an existing tweet, if existing. Otherwise make a callback function with an error object
  * @param username the author of the tweet
  * @param tweetId the ID of the tweet to be deleted
  * @param callback a callback function taking an error object
  */
  that.removeTweet = function(username, tweetId, callback) {
    if (userExists(username)) {
      var tweets = getUser(username).tweets;
      if (tweets[tweetId]) {
        delete tweets[tweetId];
        callback(null);
      } else {
        callback({ msg : 'Invalid tweet.' });
      }
    } else {
      callback({ msg : 'Invalid user.' });
    }
  };

  Object.freeze(that);
  return that;

})(_store);

module.exports = User;
