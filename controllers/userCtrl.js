'use strict'
var User = require('../models/users.js');
var CRUD = require('./crud');

class UserCtrl extends CRUD{
    constructor(model){
        super(model);
    }
    // find(req, res){
    //     super.find(req, res);
    // }
    // upsert(req, res){
    //     super.upsert(req, res);
    // }

}
module.exports = new UserCtrl(User);

// var stuff = new UserCtrl(User);
// stuff.stupid();