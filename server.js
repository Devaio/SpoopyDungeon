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

// User Routes
var userCtrl = require('./controllers/userCtrl.js');
app.get('/api/users', userCtrl.find.bind(userCtrl));
app.get('/api/users/:id', userCtrl.find.bind(userCtrl));
app.post('/api/users', userCtrl.upsert.bind(userCtrl));
app.post('/api/users/:id', userCtrl.upsert.bind(userCtrl));

// Char Routes
var charCtrl = require('./controllers/characterCtrl.js');
app.get('/api/chars', charCtrl.find.bind(charCtrl));
app.get('/api/chars/:id', charCtrl.find.bind(charCtrl));
app.post('/api/chars', charCtrl.upsert.bind(charCtrl));
app.post('/api/chars/:id', charCtrl.upsert.bind(charCtrl));


// Creating Server and Listening for Connections \\
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server running on port ' + port);

});