
var Challenge = require('../models/models.js').Challenge;
var User = require('../models/models.js').User;

function setup(app) {
  app.get('/challenges', getChallenges);
  app.post('/challenges',postChallenge);
  app.get('/challenges/:challenge_id', getByChallengelId);
  app.put('/challenges/:challenge_id', putByChallengeId);
  app.delete('/challenges/:challenge_id', deleteByChallengeId);
}

  function postChallenge(req, res) {

    var user = new User();
    user._id = req.body.creator_id;

    var challenge = new Challenge();    
    challenge.desc = req.body.desc;  
    challenge.creator = user;
    challenge.join_count = req.body.join_count;
    challenge.endorse_count = req.body.endorse_count;
    challenge.highfive_count  = req.body.highfive_count;
    challenge.complete_count  = req.body.complete_count;  

    challenge.save(function(err) {
      if (err)
        res.send(err);

        res.json({ message: 'Challenge created!' });
    })
  }

  function getChallenges(req, res) {
    Challenge.find(function(err, challenges) {
      if (err)
        res.send(err);
      res.json(challenges);
    });
  }

  function getByChallengelId(req, res) {

    Challenge
    .findOne({_id: req.params.challenge_id})
    .populate('creator')
    .exec(function(err, challenge){
      if (err){
              res.send(err);
      }else{   
      res.json(challenge);
    }
    })
  }

  function putByChallengeId(req, res) {
    Challenge.findById(req.params.challenge_id, function(err, challenge) {

      if (err)
        res.send(err);

      challenge.desc = req.body.desc; 
      challenge.join_count = req.body.join_count;
      challenge.endorse_count = req.body.endorse_count;
      challenge.highfive_count  = req.body.highfive_count;
      challenge.complete_count  = req.body.complete_count; 
      challenge.mod_dt = new Date; 

      // save the challenge
      challenge.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Challenge updated!' });
      });

    });
  }

  function deleteByChallengeId(req, res) {
    Challenge.remove({
      _id: req.params.challenge_id
    }, function(err, challenge) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  }

  module.exports = setup;
