import express = require('express');
import fs = require('fs');
import env = require('node-env-file');
import bodyParser = require('body-parser');
import mongoose = require('mongoose');
mongoose.Promise = global.Promise;
import session = require('client-sessions');
import cookieParser = require('cookie-parser');
import cors = require('cors');

var corsMiddleware = cors({
        origin: '*',
        optionsSuccessStatus: 200,
        // credentials: true
    })
var port = process.env.PORT || 80;

// Route Imports
import { ViewRoutes } from './routes/views';
import { ApiRoutes } from './routes/api';

if (typeof (global.process.env.NODE_ENV) === 'undefined') {
    if (fs.existsSync('./env/development.env')) {
        env('./env/development.env');
    }
}

mongoose.connect(global.process.env.DB_URI, (err) => {
    console.log('CONNECTING TO DB', err);
})

export class Server {
    public app: express.Application;

    public static startup(): Server {
        return new Server();
    }

    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

    }

    public config() {
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


        this.app.listen(port, (err) => {
            console.log(err, `Server Running on ${port}!`);
        });
    }


    private routes() {
        let router: express.Router;
        router = express.Router();

        ApiRoutes.create(router);
        // ViewRoutes.create(router);

        this.app.use(router);

    }
}





// Start Server
var app = Server.startup().app;