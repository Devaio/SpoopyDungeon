// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to DB
mongoose.connect('mongodb://localhost/spoopydungeon');

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes \\
app.get('/', function(req, res){
  res.sendFile('/html/index.html', {root : './public'});
});

var Routes = require('./controllers');
app.use(Routes)

// Creating Server and Listening for Connections \\
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server running on port ' + port);
  console.log('I MADE CHANGES TO THIS');

});