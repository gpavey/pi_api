var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ChallengeSchema   = new Schema({
  desc: String,
  viewable: String,
  userid: ObjectId
});

module.exports = mongoose.model('Challenge', ChallengeSchema);