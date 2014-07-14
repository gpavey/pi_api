// public modules
var express    = require('express');         
var path       = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var fs         = require("fs");

var routePath  = "./app/routes/";

var app        = express(); 
app.use(bodyParser());

fs.readdirSync(routePath).forEach(function(file) {
    var route=routePath+file;
    require(route)(app);
});

mongoose.connect('localhost/proveit'); // connect to our database

var port = process.env.PORT || 8080;    // set our port

module.exports = app;

app.listen(port);
console.log('Magic happens on port ' + port);