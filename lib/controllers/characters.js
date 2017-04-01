"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var characters_1 = require("../models/characters");
var main_1 = require("./main");
var GeneralSkills = require('../../dataSeeds/generalSkills.json');
var WarriorSkills = require('../../dataSeeds/warriorSkills.json');
var MageSkills = require('../../dataSeeds/mageSkills.json');
var Characters = (function (_super) {
    __extends(Characters, _super);
    function Characters(Model) {
        return _super.call(this, Model) || this;
    }
    Characters.prototype.get = function (req, res, cb) {
        _super.prototype.get.call(this, req, res, cb ? cb : function () { });
    };
    Characters.prototype.getByUser = function (req, res) {
        console.log('GET BY USER', req.params.uid);
        characters_1.Character.find({ user: req.params.uid }).sort('-birthDate').limit(1).exec(function (err, characters) {
            if (err) {
                return res.status(500).send({ err: err });
            }
            res.send(characters[0]);
        });
    };
    Characters.prototype.delete = function (req, res, cb) {
        _super.prototype.delete.call(this, req, res, cb ? cb : function () { });
    };
    Characters.prototype.upsert = function (req, res, cb) {
        var body = req.body;
        console.log(body);
        if (!req.params.id) {
            body.abilities = [];
            body.abilities = body.abilities.concat(GeneralSkills);
            switch (body.class) {
                case 'mage':
                    body.abilities = body.abilities.concat(MageSkills);
                    break;
                case 'warrior':
                    body.abilities = body.abilities.concat(WarriorSkills);
                    break;
                default:
                    null;
                    break;
            }
        }
        _super.prototype.upsert.call(this, req, res, body, function (data) {
        });
    };
    return Characters;
}(main_1.MainController));
module.exports = new Characters(characters_1.Character);
