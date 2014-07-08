var express = require('express');
var router = express.Router();
var Goal = require('../models/models.js').Goal;
var Track = require('../models/models.js').Track;


router.route('/')

  // create a action (accessed at POST http://localhost:8080/actions)
  .post(function(req, res) {


    var track = new Track();
    track._id = req.body.track_id;

    var goal = new Goal();
     
    goal.desc = req.body.desc;
    goal.track = track;

    goal.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Goal created!' });
    });

  })

  // get all the actions (accessed at GET http://localhost:8080/api/actions)
  .get(function(req, res) {
    Goal.find(function(err, goals) {
      if (err)
        res.send(err);

      res.json(goals);
    });
  });

// //on routes that end in /actions/:action_id
// //----------------------------------------------------
router.route('/:goal_id')

  // get the action with that id (accessed at GET http://localhost:8080/api/actions/:action_id)
  .get(function(req, res) {

   Goal.findById(req.params.goal_id, function(err, goal) {
      if (err)
        res.send(err);
      res.json(goal);
    });
  })

  // update the action with this id (accessed at PUT http://localhost:8080/api/s/:action_id)
  .put(function(req, res) {

    // use our action model to find the action we want
    Goal.findById(req.params.goal_id, function(err, goal) {

      if (err)
        res.send(err);

      goal.desc = req.body.desc;
      goal.mod_dt = new Date;

      // save the action
      goal.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Goal updated!' });
      });

    });
  })

  // delete the action with this id (accessed at DELETE http://localhost:8080/api/actions/:action_id)
  .delete(function(req, res) {
    Goal.remove({
      _id: req.params.goal_id
    }, function(err, goal) {
      if (err)
        res.send(err);

      res.json({ message: 'Goal successfully deleted' });
    });
  });

module.exports = router;