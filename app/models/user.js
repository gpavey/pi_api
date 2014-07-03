ar mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
  first_name: String,
  last_name: String,
  location: String,
  email: String,
  bio: String,
  joins_my_challenge: String,
  joins_my_track: String,
  invites_me_challenge: String,
  invites_me_track: String
});

module.exports = mongoose.model('User', UserSchema);