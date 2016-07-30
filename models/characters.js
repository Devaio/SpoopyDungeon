var mongoose        = require('mongoose');
var moment          = require('moment');

var characterSchema = mongoose.Schema({
    
    name:             { type: String, },
    // class:         { type: String, },
    maxhp:            { type: Number, },
    hp:               { type: Number, },
    level:            { type: Number, },
    exp:              { type: Number, },
    dps:              { type: Number, },
    ac:               { type: Number, },
    inv:              {},
    equipment:        {
        head:   {},
        chest:  {},
        hands:  {},
        legs:   {},
        feet:   {},
        weapon: {},
    },
    birthDate: { type : String },
    deathDate: { type : String },
    user:      { type : mongoose.Schema.ObjectId, ref : 'User' }

});

characterSchema.path('birthDate').default(function(){
	return moment().format('X');
});

module.exports      = mongoose.model('Character', characterSchema); // users