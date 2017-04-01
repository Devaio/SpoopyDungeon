import { Model } from 'mongoose';
import { Character } from '../models/characters';
import { NextFunction, Request, Response } from "express";
import helpers = require('../modules/helpers');
import {MainController} from './main';
const GeneralSkills = require('../../dataSeeds/generalSkills.json');
const WarriorSkills = require('../../dataSeeds/warriorSkills.json');
const MageSkills = require('../../dataSeeds/mageSkills.json');

class Characters extends MainController {

    constructor (Model){
        super(Model);        
    }

    public get (req: Request, res: Response, cb?: Function){
        super.get(req, res, cb ? cb : ()=>{});
    }

    public getByUser (req:Request, res:Response) {
        console.log('GET BY USER', req.params.uid)
        Character.find({user : req.params.uid}).sort('-birthDate').limit(1).exec((err, characters)=>{
            if(err){
                return res.status(500).send({err : err});
            }
            res.send(characters[0])
        })
    }

    public delete (req: Request, res: Response, cb?: Function){
        super.delete(req, res, cb ? cb : ()=>{});
        
    }

    public upsert (req: Request, res: Response, cb?: Function){
        let body = req.body;
        console.log(body)
        if(!req.params.id){
            body.abilities = [];
            body.abilities = body.abilities.concat(GeneralSkills);
            
            switch(body.class){
                case 'mage' : 
                    body.abilities = body.abilities.concat(MageSkills);
                    break;
                case 'warrior' :
                    body.abilities = body.abilities.concat(WarriorSkills);
                    break;
                default : 
                    null
                    break;
            }
        }
        

        super.upsert(req, res, body, (data)=>{
            
        });

    }
   

}

export = new Characters(Character);