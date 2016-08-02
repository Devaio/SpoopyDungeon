'use strict'
class CRUD {
    static find(model, req, res, cb) {
        console.log('this', this);
        // cb = cb || function(){}
        // Get One
        if (req.params.id) {
            model.findOne({ _id: req.params.id }, function (err, data) {
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
            model.find({}, function (err, data) {
                if(!cb){
                    res.send(err ? err : data);
                }
                else {
                    cb(err, data);
                }
            });
        }
    }
    static upsert(model, req, res, cb){
        // cb = cb || function(){}
         // Update
        if(req.params.id){
            model.findOneAndUpdate({_id : req.params.id}, req.body, {new : true}, function(err, data){
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
            var newDoc = new model(req.body);
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