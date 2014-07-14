
var Goal = require('../models/models.js').Goal;
var Track = require('../models/models.js').Track;

function setup(app) {
  app.get('/goals', getGoals);
  app.post('/goals',postGoal);
  app.get('/goals/:goal_id', getByGoalId);
  app.put('/goals/:goal_id', putByGoalId);
  app.delete('/goals/:goal_id', deleteByGoalId);
}

// -----------------------------------------------------
//  Callback functions
//------------------------------------------------------
function postGoal (req,res){
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

function putByGoalId (req, res){
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

function getByGoalId (req,res){
    Goal.findById(req.params.goal_id, function(err, goal) {
      if (err)res.send(err);
      res.json(goal);
    })
}

function deleteByGoalId(req, res) {
    Goal.remove({
      _id: req.params.goal_id
    }, function(err, goal) {
      if (err)res.send(err);

      res.json({ message: 'Goal successfully deleted' });
    })
}

module.exports = setup;