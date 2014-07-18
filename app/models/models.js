var mongoose      = require('mongoose');
var mgFile        = require('mongoose-file');
var path          = require('path')
var mgThumbnail   = require('mongoose-thumbnail');
var filePlugin    = mgFile.filePlugin;
var make_upload_to_model = mgFile.make_upload_to_model;

var Types         = mongoose.Schema.Types;
var Schema        = mongoose.Schema;
var uploads_base  = path.join(__dirname, "uploads");
var uploads       = path.join(uploads_base, "images");

var UserSchema   = new Schema({
  first_name      :   {type: String, require: true, trim: true},
  last_name       :   {type: String, require: true, trim: true},
  location        :   String,
  email           :   { type: String, 
                        unique: true,
                        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
                      },  
  bio             :   {type: String },
  joins_challenge :   {type: String, enum: ['Y','N'], default: 'Y'},
  invite_challenge:   {type: String, enum: ['Y','N'], default: 'Y'},
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
  challenge      :    {type: Types.ObjectId, ref: 'Challenge'},
  challenge_desc :    {type: String, require: true, trim: true},
  creator        :    {type: Types.ObjectId, ref: 'User'},
  creator_name   :    {type: String, require: true},
  viewable       :    {type: String, enum: ['Y', 'N', 'INVITEE'], require: true},
  user           :    {type: Types.ObjectId, ref: 'User'}, 
  user_name      :    String,
  Type           :    {type: String, enum: ['JOIN', 'ENDORSE','HIGHFIVE','COMPLETE'], require: true}, 
  create_dt      :    {type: Date, default: Date.now} ,
  mod_dt         :    {type: Date, default: Date.now}  
});

var PictureSchema   = new Schema({
    action      :    {type: Types.ObjectId, ref: 'Action'},
    challenge   :    {type: Types.ObjectId, ref: 'Challenge'},
    user        :    {type: Types.ObjectId, ref: 'User'},
})

PictureSchema.plugin(filePlugin, {
    name: "photo",
    upload_to: make_upload_to_model(uploads, 'photos'),
    relative_to: uploads_base
});


var Challenge   = mongoose.model('Challenge', ChallengeSchema);
var User        = mongoose.model('User', UserSchema);
var Action      = mongoose.model('Action', ActionSchema);
var Picture     = mongoose.model('Picture', PictureSchema);

module.exports = {Challenge: Challenge, User: User, Action: Action, Picture: Picture};

