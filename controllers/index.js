var userCtrl = require('./userCtrl.js');
var charCtrl = require('./characterCtrl.js');

var router = require('express').Router()
// User Routes
router.get('/api/users', userCtrl.find.bind(userCtrl));
router.get('/api/users/:id', userCtrl.find.bind(userCtrl));
router.post('/api/users', userCtrl.upsert.bind(userCtrl));
router.post('/api/users/:id', userCtrl.upsert.bind(userCtrl));

// Char Routes
router.get('/api/chars', charCtrl.find.bind(charCtrl));
router.get('/api/chars/:id', charCtrl.find.bind(charCtrl));
router.post('/api/chars', charCtrl.upsert.bind(charCtrl));
router.post('/api/chars/:id', charCtrl.upsert.bind(charCtrl));

module.exports = router;