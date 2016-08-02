'use strict'
var User = require('../models/users.js');
var passwords = require('../modules/passwords');

class AuthCtrl{
    
    static login(req, res){
        
        User.findOne({username : req.body.username}, function(err, user){

            passwords.compare(req.body.password, user.username, user.password, function(match){
                console.log('MATCH', match)
                res.send(match)
            })

        })
    }
   

}
module.exports = AuthCtrl;
