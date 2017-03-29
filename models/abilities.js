var mongoose        = require('mongoose');
var moment          = require('moment');

var abilitySchema = mongoose.Schema({
    
   name : String,

});


module.exports      = mongoose.model('Ability', abilitySchema); // users