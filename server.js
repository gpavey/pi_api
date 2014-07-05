// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');    // call express
var app        = express();         // define our app using express
var path       = require('path');

var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var routes     = require('./app/controller/indexController');
var challenges = require('./app/controller/challengesController');
var users      = require('./app/controller/usersController');

// connect to Mongo database
mongoose.connect('localhost'); // connect to our database


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
app.use('/', routes);
app.use('/challenges', challenges);
app.use('/users', users);

var port = process.env.PORT || 8080;    // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();        // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);


module.exports = app;
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);