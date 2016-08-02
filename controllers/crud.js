'use strict'
class CRUD {
    constructor(model) {
        // console.log('beep boop', model)
        this.model = model;
        // console.log(this.prototype)
    }
    find(req, res, cb) {
        console.log('this', this);
        // cb = cb || function(){}
        // Get One
        if (req.params.id) {
            this.model.findOne({ _id: req.params.id }, function (err, data) {
                if(!cb){
                    res.send(err ? err : data);
                }
                else {
                    cb(err, data);
                }
            });
        }
        // Get Many
        else {
            this.model.find({}, function (err, data) {
                if(!cb){
                    res.send(err ? err : data);
                }
                else {
                    cb(err, data);
                }
            });
        }
    }
    upsert(req, res, cb){
        // cb = cb || function(){}
         // Update
        if(req.params.id){
            this.model.findOneAndUpdate({_id : req.params.id}, req.body, {new : true}, function(err, data){
                if(!cb){
                    res.send(err ? err : data);
                }
                else {
                    cb(err, data);
                }
            });
        }
        // Create
        else{
            var newDoc = new this.model(req.body);
            newDoc.save(function(err, data){
                if(!cb){
                    res.send(err ? err : data);
                }
                else {
                    cb(err, data);
                }
            });
        }
    }
}

module.exports = CRUD;