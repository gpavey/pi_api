
var Action = require('../models/models.js').Action;
var User = require('../models/models.js').User;
var Challenge = require('../models/models.js').Challenge;
var Goal = require('../models/models.js').Goal;
var Track = require('../models/models.js').Track;

function setup(app) {
  app.get('/actions', getActions);
  app.get('/actions/:action_id', getByActionId);  
  app.get('/actions/all/:action_id', getAllById);  
  app.post('/actions',postAction);
  app.put('/actions/:action_id', putByActionId);
  app.delete('/actions/:action_id', deleteByActionId);
}

function postAction(req, res) {

  var creator = new User();
  creator._id = req.body.creator_id;

  var user = new User();
  user._id = req.body.user_id;

  var challenge = new Challenge();
  challenge._id = req.body.challenge_id;

  var goal = new Goal();
  goal._id = req.body.goal_id;

  var track = new Track();
  track._id = req.body.track_id

  var action = new Action();
   
  //action.challenge  = challenge;
  action.challenge_desc = req.body.challenge_desc;
  action.creator = creator;
  action.creator_name = req.body.creator_name;
  action.viewable = req.body.viewable;
  action.user = user;
  action.user_name = req.body.user_name;
  action.type = req.body.type;
  action.goal = goal;
  action.goal_desc = req.body.goal_desc;
  action.track = track;
  action.track_desc = req.body.track_desc;

  action.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Action created!' });
  });

}

function getActions(req, res) {
  Action.find(function(err, actions) {
    if (err)
      res.send(err);

    res.json(actions);
  });
}

function getAllById(req, res) {

  Action
  .findOne({_id: req.params.action_id})
  .populate('creator user')
  .exec(function(err, action){
      if (err){
              res.send(err);
      }else{   
       res.json(action);
      }
  })
}

function getByActionId(req, res) {

  Action.findById(req.params.action_id, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
}

function putByActionId(req, res) {
  Action.findById(req.params.action_id, function(err, action) {

    if (err)
      res.send(err);

    action.viewable = req.body.viewable;
    action.mod_dt = new Date;

    action.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Action updated!' });
    });

  });
}

function deleteByActionId(req, res) {
  Action.remove({
    _id: req.params.action_id
  }, function(err, action) {
    if (err)
      res.send(err);

    res.json({ message: 'Action successfully deleted' });
  });
}

module.exports = setup;