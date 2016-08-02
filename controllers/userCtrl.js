'use strict'
var User = require('../models/users.js');
var CRUD = require('./crud');

class UserCtrl extends CRUD{
    
    static find(req, res){
        super.find(User, req, res);
    }
    static upsert(req, res){
        super.upsert(User, req, res);
    }

}
module.exports = UserCtrl;
