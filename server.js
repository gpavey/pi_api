// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');    // call express
var app        = express();         // define our app using express
var path       = require('path');

var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var routes     = require('./app/routes/index');
var challenges = require('./app/routes/challenges');
//var users      = require('./app/routes/users');

// connect to Mongo database
mongoose.connect('localhost'); // connect to our database


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
app.use('/', routes);
app.use('/challenges', challenges);
//app.use('/users', users);

var port = process.env.PORT || 8080;    // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();        // get an instance of the express Router

// middleware to use for all requests
// router.use(function(req, res, next) {
//   // do logging
//   console.log('Something is happening.');
//   next(); // make sure we go to the next routes and don't stop here
// });

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//   res.json({ message: 'hooray! welcome to our api!' });
// });

// more routes for our API will happen here

// on routes that end in /challenges
// ----------------------------------------------------
// router.route('/challenges')

//   // create a challenge (accessed at POST http://localhost:8080/challenges)
//   .post(function(req, res) {

//     var challenge = new Challenge();    // create a new instance of the challenge model
//     challenge.desc = req.body.desc;  // set the challenges desc (comes from the request)
//     challenge.viewable = req.body.viewable; 
//     challenge.userid = req.body.userid;

//     challenge.save(function(err) {
//       if (err)
//         res.send(err);

//       res.json({ message: 'Challenge created!' });
//     });

//   })

//   // get all the challenges (accessed at GET http://localhost:8080/api/challenges)
//   .get(function(req, res) {
//     Challenge.find(function(err, challenges) {
//       if (err)
//         res.send(err);

//       res.json(challenges);
//     });
//   });

// on routes that end in /challenges/:challenge_id
// ----------------------------------------------------
// router.route('/challenges/:challenge_id')

//   // get the challenge with that id (accessed at GET http://localhost:8080/api/challenges/:challenge_id)
//   .get(function(req, res) {
//     Challenge.findById(req.params.challenge_id, function(err, challenge) {
//       if (err)
//         res.send(err);
//       res.json(challenge);
//     });
//   })

//   // update the challenge with this id (accessed at PUT http://localhost:8080/api/challenges/:challenge_id)
//   .put(function(req, res) {

//     // use our challenge model to find the challenge we want
//     Challenge.findById(req.params.challenge_id, function(err, challenge) {

//       if (err)
//         res.send(err);

//       challenge.name = req.body.name;  // update the challenges info

//       // save the challenge
//       challenge.save(function(err) {
//         if (err)
//           res.send(err);

//         res.json({ message: 'Challenge updated!' });
//       });

//     });
//   })

//   // delete the challenge with this id (accessed at DELETE http://localhost:8080/api/challenges/:challenge_id)
//   .delete(function(req, res) {
//     Challenge.remove({
//       _id: req.params.challenge_id
//     }, function(err, challenge) {
//       if (err)
//         res.send(err);

//       res.json({ message: 'Successfully deleted' });
//     });
//   });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);


module.exports = app;
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);