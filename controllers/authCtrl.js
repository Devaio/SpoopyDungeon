'use strict'
var User = require('../models/users.js');
var passwords = require('../modules/passwords');
var jwt = require('jsonwebtoken');

class AuthCtrl{
    
    static login(req, res){
        
        User.findOne({username : req.body.username}, function(err, user){

            passwords.compare(req.body.password, user.username, user.password, function(match){
                console.log('MATCH', match)
                // res.send(match)

                if(match){
                    // Generate JWT
                    var token = jwt.sign({
                        _id     : user._id,
                        username: user.username,
                        }, '35p0oPy5m3');

                    res.json({
                        token: token
                    }) ;
                }
                else{
                    res.json({
                        err : 'Nope'
                    })
                }

            })

        })
    }
   

}
module.exports = AuthCtrl;
