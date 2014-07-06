var express = require('express');
var router = express.Router();
//var Challenge = require('../models/challenge.js');
//var User  = require('../models/user.js');
var Challenge = require('../models/models.js').Challenge;
var User = require('../models/models.js').User;
// var mongoose = require( 'mongoose' );
// var Challenge = mongoose.model( 'Challenge' );
// var User = mongoose.model( 'User' );

router.route('/')

  // create a challenge (accessed at POST http://localhost:8080/challenges)
  .post(function(req, res) {

    var userid = req.body.userid
    var xUser = new User();

    xUser._id = req.body.userid;

    var challenge = new Challenge();    // create a new instance of the challenge model
    challenge.desc = req.body.desc;  // set the challenges desc (comes from the request)
    challenge.viewable = req.body.viewable; 
    challenge.userid = xUser;

    challenge.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Challenge created!' });
    });

  })

  // get all the challenges (accessed at GET http://localhost:8080/api/challenges)
  .get(function(req, res) {
    Challenge.find(function(err, challenges) {
      if (err)
        res.send(err);

      res.json(challenges);
    });
  });

//on routes that end in /challenges/:challenge_id
//----------------------------------------------------
router.route('/:challenge_id')

  // get the challenge with that id (accessed at GET http://localhost:8080/api/challenges/:challenge_id)
  .get(function(req, res) {

    Challenge
    .findOne({_id: req.params.challenge_id})
    .populate('userid')
    .exec(function(err, challenge){
      if (err){
              res.send(err);
      }else{   
       res.json(challenge);
    }
    })
  })

  // update the challenge with this id (accessed at PUT http://localhost:8080/api/challenges/:challenge_id)
  .put(function(req, res) {

    // use our challenge model to find the challenge we want
    Challenge.findById(req.params.challenge_id, function(err, challenge) {

      if (err)
        res.send(err);

      challenge.desc = req.body.desc;  // update the challenges info

      // save the challenge
      challenge.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Challenge updated!' });
      });

    });
  })

  // delete the challenge with this id (accessed at DELETE http://localhost:8080/api/challenges/:challenge_id)
  .delete(function(req, res) {
    Challenge.remove({
      _id: req.params.challenge_id
    }, function(err, challenge) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });

module.exports = router;