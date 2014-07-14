var Goal = require('../models/models.js').Goal;
var Track = require('../models/models.js').Track;

function setup(app) {
  app.get('/tracks', getTracks);
  app.get('/tracks/:track_id', getByTrackId);  
  app.get('/addgoal/:track_id', addGoalByTrackId);  
  app.post('/tracks',postTrack);
  app.put('/tracks/:track_id', putByTrackId);
  app.delete('/tracks/:track_id', deleteByTrackId);
}


  function postTrack(req, res) {


    var goal = new Goal();
    goal._id = req.body.goal_id;

    var track = new Track();
     
    track.desc = req.body.desc;
    track.goal = goal;

    track.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Track created!' });
    });

  }

  function getTracks(req, res) {
    Track.find(function(err, tracks) {
      if (err)
        res.send(err);

      res.json(tracks);
    });
  }

  function addGoalByTrackId(req, res){
    Track.findById(req.params.track_id, function(err,track){
      if(err){
        res.json(err);
      }
      else if(track == null){
          res.json('no such track!');
      }

       track.goal.push(mongoose.Types.ObjectId(req.body.goal_id));
       
      track.save(function(err){
        if (err)
          res.send(err);

        res.json({ message: 'Goal added to track!' });
      })
    });
  }

  function getByTrackId(req, res) {

    Track
    .findOne({_id: req.params.track_id})
    .populate('goal')
    .exec(function(err, track){
      if (err){
              res.send(err);
      }else{   
       res.json(track);
    }
    });
  }

  function putByTrackId(req, res) {
    Track.findById(req.params.track_id, function(err, track) {

      if (err)
        res.send(err);

      track.desc = req.body.desc;
      track.mod_dt = new Date;

      // save the action
      track.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Track updated!' });
      });

    });
  }

  function deleteByTrackId(req, res) {
    Track.remove({
      _id: req.params.track_id
    }, function(err, track) {
      if (err)
        res.send(err);

      res.json({ message: 'Track successfully deleted' });
    });
  }

  module.exports = setup;