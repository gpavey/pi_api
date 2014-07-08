var express = require('express');
var router = express.Router();
var Action = require('../models/models.js').Action;
var User = require('../models/models.js').User;
var Challenge = require('../models/models.js').Challenge;
var Goal = require('../models/models.js').Goal;
var Track = require('../models/models.js').Track;


router.route('/')

  // create a action (accessed at POST http://localhost:8080/actions)
  .post(function(req, res) {

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
    //action.goal = goal;
    action.goal_desc = req.body.goal_desc;
    //action.track = track;
    action.track_desc = req.body.track_desc;

    action.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Action created!' });
    });

  })

  // get all the actions (accessed at GET http://localhost:8080/api/actions)
  .get(function(req, res) {
    Action.find(function(err, actions) {
      if (err)
        res.send(err);

      res.json(actions);
    });
  });

router.route('/pop/:action_id')

  .get(function(req, res) {

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
  })

// //on routes that end in /actions/:action_id
// //----------------------------------------------------
router.route('/:action_id')

  // get the action with that id (accessed at GET http://localhost:8080/api/actions/:action_id)
  .get(function(req, res) {

    Action.findById(req.params.action_id, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  })

  // update the action with this id (accessed at PUT http://localhost:8080/api/s/:action_id)
  .put(function(req, res) {

    // use our action model to find the action we want
    Action.findById(req.params.action_id, function(err, action) {

      if (err)
        res.send(err);

      action.viewable = req.body.viewable;
      action.mod_dt = new Date;

      // save the action
      action.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Action updated!' });
      });

    });
  })

  // delete the action with this id (accessed at DELETE http://localhost:8080/api/actions/:action_id)
  .delete(function(req, res) {
    Action.remove({
      _id: req.params.action_id
    }, function(err, action) {
      if (err)
        res.send(err);

      res.json({ message: 'Action successfully deleted' });
    });
  });

module.exports = router;