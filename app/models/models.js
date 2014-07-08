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
  invite_track    :   String,
  create_dt       :   {type: Date, default: Date.now} ,
  mod_dt          :   {type: Date, default: Date.now}  
});


var ChallengeSchema   = new Schema({
  desc            :   String,
  creator_id      :   {type: Schema.Types.ObjectId, ref: 'User'},
  join_count      :   Number,
  endorse_count   :   Number,
  highfive_count  :   Number,
  complete_count  :   Number,  
  create_dt       :   {type: Date, default: Date.now},
  mod_dt          :   {type: Date, default: Date.now} 
});

var ActionSchema    = new Schema({
  challenge      :    {type: Schema.Types.ObjectId, ref: 'Challenge'},
  challenge_desc :    String,
  creator        :    {type: Schema.Types.ObjectId, ref: 'User'},
  creator_name   :    String,
  viewable       :    String,
  user           :    {type: Schema.Types.ObjectId, ref: 'User'}, 
  user_name      :    String,
  Type           :    String,
  goal           :    {type: Schema.Types.ObjectId, ref: 'Goal'},
  goald_desc     :    String,
  track          :    {type: Schema.Types.ObjectId, ref: 'Track'},
  track_desc     :    String,  
  create_dt      :    {type: Date, default: Date.now} ,
  mod_dt         :    {type: Date, default: Date.now}  
});

var TrackSchema   = new Schema({
  desc            :   String,
  goal_id         :   [{type: Schema.Types.ObjectId, ref: 'Goal'}],
  create_dt       :   {type: Date, default: Date.now},
  mod_dt          :   {type: Date, default: Date.now}  
});

var GoalSchema   = new Schema({
  desc            :   String,
  track_id        :   {type: Schema.Types.ObjectId, ref: 'Track'},
  create_dt       :   {type: Date, default: Date.now} ,
  mod_dt          :   {type: Date, default: Date.now} 
});

var Challenge = mongoose.model('Challenge', ChallengeSchema);
var User = mongoose.model('User', UserSchema);
var Action = mongoose.model('Action', ActionSchema);
var Goal = mongoose.model('Goal', GoalSchema);
var Track = mongoose.model('Track', TrackSchema);

module.exports = {Challenge: Challenge, User: User, Action: Action, Goal: Goal, Track: Track};

