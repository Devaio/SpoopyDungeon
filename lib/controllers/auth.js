"use strict";
var accounts_1 = require("../models/accounts");
var passwords = require("../modules/passwords");
var errors = {
    general: {
        status: 500,
        message: 'Backend Error'
    },
    login: {
        status: 403,
        message: 'Invalid username or password.'
    }
};
var Auth = (function () {
    function Auth() {
    }
    Auth.prototype.logout = function (req, res) {
        req.session.reset();
        res.redirect('/');
    };
    Auth.prototype.login = function (req, res, next) {
        accounts_1.Account.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) {
                return res.status(500).json(errors.general);
            }
            if (!user) {
                return res.status(403).json(errors.login);
            }
            passwords.compare(req.body.password, user.username, user.password, function (match) {
                if (!match) {
                    return res.status(403).json(errors.login);
                }
                req.session.uid = user._id;
                res.send(user);
            });
        });
    };
    return Auth;
}());
module.exports = new Auth();
