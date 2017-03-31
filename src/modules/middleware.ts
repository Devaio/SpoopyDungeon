import { NextFunction, Request, Response, Router } from "express";
import moment = require('moment');
class Middleware {
    public authorize (req: Request, res: Response, next: NextFunction){
        
        if(!req.isAuthenticated()){
            return res.redirect('/');
        }
        next();
    }

    public setLocals (req: Request, res: Response, next: NextFunction){

        //add constants to jade
        var timeStamp = moment().format('X')
        res.locals.user = req.user       
        next();
    }
   
    public nocache (req:Request, res:Response, next:NextFunction){
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
		res.header('Expires', '-1')
		res.header('Pragma', 'no-cache')
		next()
    }
}

export = new Middleware();