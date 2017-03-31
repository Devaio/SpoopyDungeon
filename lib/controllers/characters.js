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
var Characters = (function (_super) {
    __extends(Characters, _super);
    function Characters() {
        return _super.call(this, characters_1.Character) || this;
    }
    Characters.prototype.get = function (req, res, cb) {
        _super.prototype.get.call(this, req, res, cb ? cb : function () { });
    };
    Characters.prototype.delete = function (req, res, cb) {
        _super.prototype.delete.call(this, req, res, cb ? cb : function () { });
    };
    Characters.prototype.upsert = function (req, res, cb) {
        var body = req.body;
        _super.prototype.upsert.call(this, req, res, body, function (data) {
        });
    };
    return Characters;
}(main_1.MainController));
module.exports = new Characters();
