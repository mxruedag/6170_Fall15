var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  following: [String]
});

// Determine if username exists
// Callback takes an error and a boolean
UserSchema.statics.usernameExists = function(username, callback) {
  this.find({username: username}, function(err, record){
    if (err) {
      callback({msg: 'Store error'});
    }
    else {
      callback(null, record.length > 0);
    }
  });
}

// Create a new user given username and password
// Callback takes in an error
UserSchema.statics.createNewUser = function(username, password, callback) {
  this.create({username: username, password: password, following: []}, function(err, record){
    if (err) {
      callback({msg: 'Store error'});
    }
    else {
      callback(null);
    }
  });
}

// Verify that username password combination is correct
// Callback takes an error and whether the password was verified
UserSchema.statics.verifyPassword = function(username, candidatepw, callback) {
  this.find({username: username, password: candidatepw}, function(err, record){
    if (err) {
      callback({msg: 'Store error'});
    }
    else {
      callback(null, record.length > 0);
    }
  });
}

// Verify that a user is following another one
// callback takes an error and the truth value
UserSchema.statics.isFollowing = function(username, followee, callback) {
  this.find({username: username, following: followee}, function(err, record){
    if (err) {
      callback({msg: 'Store error'});
    }
    else {
      callback(null, record.length > 0);
    }
  });
}

// Follow a user, given its username(followee) and the username that will follow it
// callback takes an error
UserSchema.statics.follow = function(username, followee, callback) {
  this.update({username: username}, {$push: {following: followee}}, {upsert: true}, function(err, record){
    if (err) {
      callback({msg: 'Store error'})
    }
    else {
      callback(null);
    }
  });
}

module.exports = mongoose.model("Users", UserSchema);