import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import Middleware = require('../modules/middleware');
import Characters = require('../controllers/characters')
import Auth = require('../controllers/auth');
import Accounts = require('../controllers/accounts')

export class ApiRoutes extends BaseRoute {
    public static create(router: Router) {
        //log
        console.log("[ApiRoutes::create] Creating api routes.");


        router.post('/auth/login', Auth.login)

        router.get('/api/me', (req, res) => {
            res.send(req.session)
        });
        router.get('/api/users', Accounts.get);
        router.get('/api/users/:id', Accounts.get);
        router.post('/api/users', Accounts.upsert);
        router.post('/api/users/:id', Accounts.upsert);

        // Char Routes
        router.get('/api/chars', Characters.get);
        router.get('/api/chars/:id', Characters.get);
        router.post('/api/chars', Characters.upsert);
        router.post('/api/chars/:id', Characters.upsert);

    }
    constructor() {
        super();
    }

}



