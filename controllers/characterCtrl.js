'use strict'
var Character = require('../models/characters.js');
var CRUD = require('./crud');

class CharCtrl extends CRUD{
    constructor(model){
        super(model);
    }
    //  find(req, res){
    //     super.find(req, res);
    // }
    // upsert(req, res){
    //     super.upsert(req, res);
    // }
    // deleteOldCharacter(req, res){

    // }
}

module.exports = new CharCtrl(Character);