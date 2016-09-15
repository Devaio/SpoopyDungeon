'use strict'
var Character = require('../models/characters.js');
var CRUD = require('./crud');

class CharCtrl extends CRUD{
    
    static find(req, res){
        super.find(Character, req, res);
    }
    static upsert(req, res){
        super.upsert(Character, req, res);
    }
    // deleteOldCharacter(req, res){

    // }
}

module.exports = CharCtrl