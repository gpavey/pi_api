var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
  first_name      :   {type: String, require: true, trim: true},
  last_name       :   {type: String, require: true, trim: true},
  location        :   String,
  email           :   { type: String, 
                        unique: true,
                        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
                      },  
  bio             :   {type: String, enum: ['Y','N'], default: 'Y'},
  joins_challenge :   {type: String, enum: ['Y','N'], default: 'Y'},
  joins_track     :   {type: String, enum: ['Y','N'], default: 'Y'},
  invite_challenge:   {type: String, enum: ['Y','N'], default: 'Y'},
  invite_track    :   {type: String, enum: ['Y','N'], default: 'Y'},
  create_dt       :   {type: Date, default: Date.now} ,
  mod_dt          :   {type: Date, default: Date.now}  
});


var ChallengeSchema   = new Schema({
  desc            :   {type: String, require: true, trim: true},
  creator         :   {type: Schema.Types.ObjectId, ref: 'User'},
  join_count      :   {type: Number, default: 0},
  endorse_count   :   {type: Number, default: 0},
  highfive_count  :   {type: Number, default: 0},
  complete_count  :   {type: Number, default:0},  
  create_dt       :   {type: Date, default: Date.now},
  mod_dt          :   {type: Date, default: Date.now} 
});

var ActionSchema    = new Schema({
  challenge      :    {type: Schema.Types.ObjectId, ref: 'Challenge'},
  challenge_desc :    {type: String, require: true, trim: true},
  creator        :    {type: Schema.Types.ObjectId, ref: 'User'},
  creator_name   :    {type: String, require: true},
  viewable       :    {type: String, enum: ['Y', 'N', 'INVITEE'], require: true},
  user           :    {type: Schema.Types.ObjectId, ref: 'User'}, 
  user_name      :    String,
  Type           :    {type: String, enum: ['JOIN', 'ENDORSE','HIGHFIVE','COMPLETE'], require: true},
  goal           :    {type: Schema.Types.ObjectId, ref: 'Goal'},
  goal_desc      :    String,
  track          :    {type: Schema.Types.ObjectId, ref: 'Track'},
  track_desc     :    String,  
  create_dt      :    {type: Date, default: Date.now} ,
  mod_dt         :    {type: Date, default: Date.now}  
});

var TrackSchema   = new Schema({
  desc            :   {type: String, require: true, trim: true},
  goal            :   [{type: Schema.Types.ObjectId, ref: 'Goal'}],
  create_dt       :   {type: Date, default: Date.now},
  mod_dt          :   {type: Date, default: Date.now}  
});

var GoalSchema   = new Schema({
  desc            :   {type: String, require: true, trim: true},
  track           :   {type: Schema.Types.ObjectId, ref: 'Track'},
  create_dt       :   {type: Date, default: Date.now} ,
  mod_dt          :   {type: Date, default: Date.now} 
});

var Challenge = mongoose.model('Challenge', ChallengeSchema);
var User = mongoose.model('User', UserSchema);
var Action = mongoose.model('Action', ActionSchema);
var Goal = mongoose.model('Goal', GoalSchema);
var Track = mongoose.model('Track', TrackSchema);

module.exports = {Challenge: Challenge, User: User, Action: Action, Goal: Goal, Track: Track};

