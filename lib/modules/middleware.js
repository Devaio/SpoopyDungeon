"use strict";
var moment = require("moment");
var Middleware = (function () {
    function Middleware() {
    }
    Middleware.prototype.authorize = function (req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect('/');
        }
        next();
    };
    Middleware.prototype.setLocals = function (req, res, next) {
        //add constants to jade
        var timeStamp = moment().format('X');
        res.locals.user = req.user;
        next();
    };
    Middleware.prototype.nocache = function (req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    };
    return Middleware;
}());
module.exports = new Middleware();
