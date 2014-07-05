var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
  first_name      :   String,
  last_name       :   String,
  location        :   String,
  email           :   String,
  bio             :   String,
  joins_challenge :   String,
  joins_track     :   String,
  invite_challenge:   String,
  invite_track    :   String
});


var ChallengeSchema   = new Schema({
  desc: String,
  viewable : String,
  creator : {type: Schema.Types.ObjectId, ref: 'User'}  
});


var Challenge = mongoose.model('Challenge', ChallengeSchema);
var User = mongoose.model('User', UserSchema);
module.exports = {Challenge: Challenge, User: User};

