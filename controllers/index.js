var userCtrl = require('./userCtrl.js');
var charCtrl = require('./characterCtrl.js');
var authCtrl = require('./authCtrl.js');


var router = require('express').Router()

// Login
router.post('/auth/login', authCtrl.login)

// User Routes
router.get('/api/users', userCtrl.find);
router.get('/api/users/:id', userCtrl.find);
router.post('/api/users', userCtrl.upsert);
router.post('/api/users/:id', userCtrl.upsert);

// Char Routes
router.get('/api/chars', charCtrl.find);
router.get('/api/chars/:id', charCtrl.find);
router.post('/api/chars', charCtrl.upsert);
router.post('/api/chars/:id', charCtrl.upsert);


module.exports = router;