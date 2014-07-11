var express = require('express');
var router = express.Router();
var Goal = require('../models/models.js').Goal;
var Track = require('../models/models.js').Track;

// ------------------------------------------------------
//  routes that end in /goals
// ------------------------------------------------------
router.route('/')
  .post(postGoals)
  .get(getGoals);

// ------------------------------------------------------
//  routes that end in /goals/:goal_id
// ------------------------------------------------------
router.route('/:goal_id')
.get(getGoalId)
.put(putGoalId)
.delete(deleteGoalId);

// -----------------------------------------------------
//  Callback functions
//------------------------------------------------------
function postGoals (req,res){
    var goal = new Goal();
    goal.desc = req.body.desc;

    if(req.body.track_id){
      var track = new Track();
      track._id = req.body.track_id;
      goal.track = track;
    }

    goal.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'Goal created!' });
    })
}

function getGoals(req,res){
    Goal.find(function(err, goals) {
      if (err){res.send(err)};
      res.json(goals);
    })
}

function putGoalId (req, res){
    Goal.findById(req.params.goal_id, function(err, goal) {

      if (err)res.send(err);

      goal.desc = req.body.desc;
      goal.mod_dt = new Date;

      goal.save(function(err) {
        if (err)res.send(err);
        res.json({ message: 'Goal updated!' });
      })
    })
}

function getGoalId (req,res){
    Goal.findById(req.params.goal_id, function(err, goal) {
      if (err)res.send(err);
      res.json(goal);
    })
}

function deleteGoalId(req, res) {
    Goal.remove({
      _id: req.params.goal_id
    }, function(err, goal) {
      if (err)res.send(err);

      res.json({ message: 'Goal successfully deleted' });
    })
}

module.exports = router;