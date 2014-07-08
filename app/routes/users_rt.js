var express = require('express');
var router = express.Router();
// var Challenge = require('../models/models.js').Challenge;
// var User = require('../models/models.js').User;
var mongoose = require( 'mongoose' );
var Challenge = mongoose.model( 'Challenge' );
var User = mongoose.model( 'User' );

router.route('/')

// Create a user (access at POST http://localhost:8080/users)
.post(function(req,res){

  var user = new User();
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.location = req.body.location;
  user.email = req.body.email;
  user.bio = req.body.bio;
  user.joins_challenge = req.body.joins_challenge;
  user.joins_track = req.body.joins_track;
  user.invite_challenge = req.body.invite_challenge;
  user.invite_track = req.body.invite_track;

  user.save(function(err){
    if (err)
      res.send(err);
    res.json({ message: 'User created!' });
  });
})

// get all the user (accessed at GET http://localhost:8080/api/users)
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);

      res.json(users);
    });
  });

  //on routes that end in /users/:user_id
//----------------------------------------------------
router.route('/:user_id')

  // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  })

  // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
  .put(function(req, res) {

    // use our user model to find the user we want
    User.findById(req.params.user_id, function(err, user) {

      if (err)
        res.send(err);

      user.first_name = req.body.first_name;
      user.last_name = req.body.last_name;
      user.location = req.body.location;
      user.email = req.body.email;
      user.bio = req.body.bio;
      user.joins_challenge = req.body.joins_challenge;
      user.joins_track = req.body.joins_track;
      user.invite_challenge = req.body.invite_challenge;
      user.inivite_track = req.body.inivite_track;
      user.mod_dt = new Date;

      // save the user
      user.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'User updated!' });
      });

    });
  })

  // delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


module.exports = router;