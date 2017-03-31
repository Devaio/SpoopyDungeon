"use strict";
var crypto = require("crypto");
var Password = (function () {
    function Password() {
    }
    Password.prototype.encrypt = function (password, unique) {
        return crypto.createHash('sha512').update(password).digest('hex');
    };
    Password.prototype.compare = function (password, unique, userPassword, cb) {
        cb(this.encrypt(password, unique) === userPassword ? true : false);
    };
    return Password;
}());
module.exports = new Password();
