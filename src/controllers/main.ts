import { log } from 'util';
import helpers = require('../modules/helpers');
import { NextFunction, Request, Response } from "express";

class FunctionUtil
  {
    /**
     * Bind all methods on `scope` to that `scope`.
     *
     * Normal fat arrow/lambda functions in TypeScript are simply member functions
     * that replace the value of `this`, with `_this` (a reference to `this` from
     * within the constructor's scope). They're not on the prototype and as such do not
     * support inheritance. So no calling `super.myMethod()` if it's been
     * declared with a `=>`.
     *
     * `FunctionUtil.bindAllMethods( this )` should be called from the base class' constructor.
     * It will bind each method as such that it will always execute using the class scope.
     *
     * Essentially, we should now write class methods without `=>`. When executed,
     * the scope will be preserved and they will importantly continue to support
     * inheritance. Fat arrow/lambda functions (`=>`) are still great when you
     * don't require inheritance, for example, when using anonymous function callbacks.
     *
     * @param scope     Usually, pass the value of `this` from your base class.
     */
    static bindAllMethods( scope )
    {
      for (var p in scope)
      {
        // Don't bind if scope[p] is a getter/setter
        var descriptor = Object.getOwnPropertyDescriptor( Object.getPrototypeOf( scope ), p );
        if (descriptor && (descriptor.get || descriptor.set))
          continue;

        // Only bind if scope[p] is a function that's not already a class member
        // the bound function will be added as a class member, referencing the function on the prototype
        if (!Object.prototype.hasOwnProperty.call( scope, p ) && typeof scope[p] == 'function')
          scope[p] = scope[p].bind( scope );
      }
    }
  }

export class MainController {

    model: any;

    constructor (model){
        this.model = model
        FunctionUtil.bindAllMethods( this )
    }

    public get (req:Request, res:Response, cb?: Function){
        
        if(req.params.id){
            this.model.findOne({_id : req.params.id}, (err, data)=>{
                res.send(data);
                cb ? cb(data) : null;
            });
        }

        else{
            let q = helpers.queryBuilder(req);

            this.model.find(q.query).sort(q.sortQuery).exec((err, data)=>{
                res.send(data);
                cb ? cb(data) : null;
            })
        }

    }

    public upsert (req: Request, res: Response, data: Object, cb?: Function){

        let self = this;

        if(req.params.id){
            let query = {_id : req.params.id};
            this.model.update(query, data, (err, data)=>{
                if(err){
                    res.sendStatus(500).send(err)
                }
                else{
                    res.send(data);
                }
                cb ? cb(data) : null;
            })
        }
        else{
            console.log('new Thing!')
            let newModelInstance = new this.model(data);
            newModelInstance.save((err, doc)=>{
                console.log('Saved it!')
                
                if(err){
                console.log('Something bad')
                    
                    res.sendStatus(500).send(err);
                }
                else{
                console.log('Something good')
                    
                    res.send(doc)
                }
                console.log('Callback?')
                
                cb ? cb(data) : null;
            })
        }

    }

    public delete (req: Request, res:Response, cb?:Function) {

        if(req.params.id){
            this.model.remove({_id : req.params.id}, (err, data)=>{
                if(err){
                    res.sendStatus(500).send(err);
                }
                else{
                    res.send(data);
                }
                cb ? cb(data) : null;
            })
        }
        else{
            res.sendStatus(500).send({error : "Please provide more info"});
        }

    }

}
