"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fs = require("fs");
var env = require("node-env-file");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var session = require("client-sessions");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var corsMiddleware = cors({
    origin: 'http://10.25.15.35:8100',
    optionsSuccessStatus: 200,
    credentials: true
});
var port = process.env.PORT || 80;
var api_1 = require("./routes/api");
if (typeof (global.process.env.NODE_ENV) === 'undefined') {
    if (fs.existsSync('./env/development.env')) {
        env('./env/development.env');
    }
}
mongoose.connect(global.process.env.DB_URI, function (err) {
    console.log('CONNECTING TO DB', err);
});
var Server = (function () {
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //add routes
        this.routes();
    }
    Server.startup = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        this.app.set('view engine', 'jade');
        this.app.set('views', './views');
        // // Static File Server
        // this.app.use('/public', express.static(__dirname + '/../public', { maxAge: 86400000 }));
        this.app.use(corsMiddleware);
        // Parsing Middleware
        this.app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json(), cookieParser());
        // Sessions
        this.app.use(session({
            "cookieName": "_spoop",
            "secret": process.env.SESSION_SECRET,
            "requestKey": "session",
            "cookie": {
                "ephemeral": false,
                "httpOnly": false,
                "secure": false
            }
        }));
        // certbot
        // app.use('/.well-known', express.static(__dirname + '/../public/.well-known', {maxAge : 86400000}))
        this.app.listen(port, function (err) {
            console.log(err, "Server Running on " + port + "!");
        });
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        api_1.ApiRoutes.create(router);
        // ViewRoutes.create(router);
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
// Start Server
var app = Server.startup().app;
