import { Model } from 'mongoose';
import { Account } from '../models/accounts';
import { NextFunction, Request, Response } from "express";
import helpers = require('../modules/helpers');
import {MainController} from './main';


class Accounts extends MainController {
    
    constructor (){
        super(Account);
    }

    public get (req: Request, res: Response, cb?: Function) {        
        super.get(req, res, cb ? cb : ()=>{});
    }

    public delete (req: Request, res: Response, cb?: Function){
        super.delete(req, res, cb ? cb : ()=>{});
    }

    public upsert (req: Request, res: Response, cb?: Function){
        let body = req.body;
        super.upsert(req, res, body);

    }
    public createAccount (req: Request, res: Response, cb?: Function){
        let body = req.body;
        let user = {};

        if(body.password){
            if(!body.name ||
                !body.email ||
                !body.password ||
                !body.confirm ||
                body.password !== body.confirm){
                
                return res.send(JSON.stringify({error : 'Please complete the form'}))

            }
            user['password'] = body.password;
        }
        user['email'] = body.email;
        user['name'] = body.name;

        let acc = new Account(user);
        acc.save((err, doc)=>{
           req.session.uid = doc._id
           res.send(doc);
        });
    }

}

export = new Accounts();