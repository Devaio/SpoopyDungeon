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
var accounts_1 = require("../models/accounts");
var main_1 = require("./main");
var Accounts = (function (_super) {
    __extends(Accounts, _super);
    function Accounts() {
        return _super.call(this, accounts_1.Account) || this;
    }
    Accounts.prototype.get = function (req, res, cb) {
        _super.prototype.get.call(this, req, res, cb ? cb : function () { });
    };
    Accounts.prototype.delete = function (req, res, cb) {
        _super.prototype.delete.call(this, req, res, cb ? cb : function () { });
    };
    Accounts.prototype.upsert = function (req, res, cb) {
        var body = req.body;
        _super.prototype.upsert.call(this, req, res, body);
    };
    Accounts.prototype.createAccount = function (req, res, cb) {
        var body = req.body;
        var user = {};
        if (body.password) {
            if (!body.name ||
                !body.email ||
                !body.password ||
                !body.confirm ||
                body.password !== body.confirm) {
                return res.send(JSON.stringify({ error: 'Please complete the form' }));
            }
            user['password'] = body.password;
        }
        user['email'] = body.email;
        user['name'] = body.name;
        var acc = new accounts_1.Account(user);
        acc.save(function (err, doc) {
            req.session.uid = doc._id;
            res.send(doc);
        });
    };
    return Accounts;
}(main_1.MainController));
module.exports = new Accounts();
