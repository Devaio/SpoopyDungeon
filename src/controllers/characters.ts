import { Model } from 'mongoose';
import { Character } from '../models/characters';
import { NextFunction, Request, Response } from "express";
import helpers = require('../modules/helpers');
import {MainController} from './main';


class Characters extends MainController {

    constructor (){
        super(Character);
    }

    public get (req: Request, res: Response, cb?: Function){
        super.get(req, res, cb ? cb : ()=>{});
    }

    public delete (req: Request, res: Response, cb?: Function){
        super.delete(req, res, cb ? cb : ()=>{});
        
    }

    public upsert (req: Request, res: Response, cb?: Function){

        let body = req.body;
        super.upsert(req, res, body, (data)=>{
            
        });

    }
   

}

export = new Characters();