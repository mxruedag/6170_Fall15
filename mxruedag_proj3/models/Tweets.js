var mongoose = require("mongoose");

var TweetSchema = mongoose.Schema({
  creator: String,
  poster: String,
  content: String,
});

// get the tweets of the followees of username, or all the tweets if username is null
// callback takes an error and a list of tweet objects
TweetSchema.statics.getTweets = function(username, usernameFollowees, callback) {
  if (!(usernameFollowees)) {
    var conditions = {};
  }
  else {
    var conditions = {poster: {$in: usernameFollowees}};
  }
  this.find(conditions, function(err, record){
    if (err) {
      return callback(err);
    }
    else {
      var allTweets = [];
      record.forEach(function(tweet){
        allTweets.push({
          _id: tweet._id,
          content: tweet.content,
          creator: tweet.creator,
          poster: tweet.poster,
          isUsernamePoster: (tweet.poster === username),
          isUsernameCreator: (tweet.creator === username),
          isRetweet: tweet.poster !== tweet.creator
        });
      });
      return callback(null,allTweets);
    }
  });
}

// add a new tweet given creator, poster, content
TweetSchema.statics.addTweet = function(creator, poster, content, callback){
  this.create({creator: creator, poster: poster, content: content}, function(err, record){
    if (err) {
      callback({msg: 'Store error'});
    }
    else {
      callback(null);
    }
  });
}

// get a tweet record given its id
TweetSchema.statics.getTweet = function(tweetId, callback){
  this.findById(tweetId, function(err, record){
    if (err) {
      callback({msg: 'Store error'});
    }
    else {
      callback(null, record);
    }
  });
}

// delete a tweet given its id
TweetSchema.statics.deleteTweet = function(tweetId, callback){
  this.findByIdAndRemove(tweetId, function(err, record){
    if (err) {
      callback({msg: 'Store error'});
    }
    else {
      callback(null);
    }
  });
}

module.exports = mongoose.model("Tweets", TweetSchema);