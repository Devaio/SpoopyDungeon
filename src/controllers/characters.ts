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
                    console.log('mage')
                    body.abilities = body.abilities.concat(MageSkills);
                    break;
                case 'warrior' :
                    console.log('WARRIOR')
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