'use strict'
var User = require('../models/users.js');
var passwords = require('../modules/passwords');

class AuthCtrl{
    
    static login(req, res){
        
        User.findOne({username : req.body.username}, function(err, user){

            if(user) {    
                passwords.compare(req.body.password, user.username, user.password, function(match){
                    console.log('MATCH', match)
                    res.send(match)
                })
            }
            else {
                res.send("User does not exist.");
            }

        })
    }
   

}
module.exports = AuthCtrl;
