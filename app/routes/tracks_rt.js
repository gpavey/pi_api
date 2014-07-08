var express = require('express');
var router = express.Router();
var Goal = require('../models/models.js').Goal;
var Track = require('../models/models.js').Track;


router.route('/')

  // create a action (accessed at POST http://localhost:8080/actions)
  .post(function(req, res) {


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

  })

  // get all the actions (accessed at GET http://localhost:8080/api/actions)
  .get(function(req, res) {
    Track.find(function(err, tracks) {
      if (err)
        res.send(err);

      res.json(tracks);
    });
  });

// //on routes that end in /actions/:action_id
// //----------------------------------------------------
router.route('/:track_id')

  // get the action with that id (accessed at GET http://localhost:8080/api/actions/:action_id)
  .get(function(req, res) {

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
  })

  // update the action with this id (accessed at PUT http://localhost:8080/api/s/:action_id)
  .put(function(req, res) {

    // use our action model to find the action we want
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
  })

  // delete the action with this id (accessed at DELETE http://localhost:8080/api/actions/:action_id)
  .delete(function(req, res) {
    Track.remove({
      _id: req.params.track_id
    }, function(err, track) {
      if (err)
        res.send(err);

      res.json({ message: 'Track successfully deleted' });
    });
  });

module.exports = router;