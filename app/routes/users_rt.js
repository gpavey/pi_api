var Challenge = require('../models/models.js').Challenge;
var User = require('../models/models.js').User;

function setup(app) {
  app.get('/users', getUsers);
  app.post('/users',postUser);
  app.get('/users/:user_id', getByUserId);
  app.put('/users/:user_id', putByUserId);
  app.delete('/users/:user_id', deleteByUserId);
}

function postUser(req,res){

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
}

  function getUsers(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);

      res.json(users);
    });
  }

  function getByUserId(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  }

  function putByUserId(req, res) {
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
    });

    user.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'User updated!' });
      });
  }

  function deleteByUserId(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  }


module.exports = setup;