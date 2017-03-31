import { NextFunction, Request, Response } from "express";
import {Document} from 'mongoose';
import {Account} from '../models/accounts';
import passwords = require('../modules/passwords');

var errors = {
    general: {
        status: 500,
        message: 'Backend Error'
    },
    login: {
        status: 403,
        message: 'Invalid username or password.'
    }
}

class Auth {

    constructor (){
    }

    public logout (req:Request, res:Response){
        req.session.reset();
        res.redirect('/');
    }

    public login (req: Request, res: Response, next: NextFunction){
        Account.findOne({
            username : req.body.username
        }, (err, user)=>{
            if(err){
                return res.status(500).json(errors.general)
            }
            if(!user){
                return res.status(403).json(errors.login);
            }

            passwords.compare(req.body.password, user.username, user.password, (match)=>{
                if(!match){
                    return res.status(403).json(errors.login)
                }

                req.session.uid = user._id;
                res.send(user);
            })

        })
    }

}

export = new Auth();