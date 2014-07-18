var Picture = require('../models/models.js').Picture;
var Challenge = require('../models/models.js').Challenge;
var User = require('../models/models.js').User;
var Action = require('../models/models.js').Action;


function setup(app) {
  app.get('/pictures', getPictures);
  app.get('/pictures/user/:user_id', getByUserId);
  app.get('/pictures/challenge/:challenge_id', getByChallengeId);
  app.get('/pictures/action/:action_id', getByActionId);
  app.post('/pictures', postPictures);
}

function getPictures(req, res) {
  Picture.find(function(err, pictures) {
    if (err)
      res.send(err);

    res.json(pictures);
  });
}

function postPictures(req,res){
  var user = new User();
  user._id = req.body.user_id;

  var challenge = new Challenge();
  challenge._id = req.body.challenge_id;

  var action = new Action();
  action._id = req.body.action_id;

  var picture = new Picture();
  picture.user = user;
  picture.action = action;
  picture.challenge = challenge;
  
  picture.set('photo.files', req.files.photo);
  picture.save(function(err) {
    if (err) res.send(err);
    res.json({ message: 'Picture created!' });
  });
}

function getByChallengeId(req, res) {
  var challenge = new Challenge();
  challenge._id = req.params.challenge_id;

  Picture.find({challenge: challenge}, function(err, pictures) {
    if (err)
      res.send(err);

    res.json(pictures);
  });
}

function getByUserId(req, res) {
  var user = new User();
  user._id = req.params.user_id;

  Picture.find({user: user},function(err, pictures) {
    if (err)
      res.send(err);

    res.json(pictures);
  });
}

function getByActionId(req, res) {
  var action = new Action();
  action._id = req.params.action_id;

  Picture.find({action: action}, function(err, pictures) {
    if (err)
      res.send(err);

    res.json(pictures);
  });
}

module.exports = setup;