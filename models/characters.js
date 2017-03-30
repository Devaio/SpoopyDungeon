var mongoose        = require('mongoose');
var moment          = require('moment');

var abilitySubSchema = mongoose.Schema({
    name: String,
    class: String,
    levelReq: {type : Number, default : 0},
    description: String,
    dmgMod: {type : Number, default : 0}, // (multiplied by weapon dmg probably)
    validTargets: Array, // (enemy, player, any, etc)
    effects: [
        {
            category: String,
            dmg: {type : Number, default : 0}, // not necessarily applicable
            rounds: Number
        }
    ], // (dot, slow, stun, dmg decrease, etc)
    cost: {
        pool: String, // (mp, hp)
        amt: {type : Number, default : 0}
    },
    cooldown: {type : Number, default : 0}, // (number of rounds)
    icon: String // (class names)
})

var characterSchema = mongoose.Schema({
    
    name:             { type: String, },
    class:            { type: String, },
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
    user:      { type : mongoose.Schema.ObjectId, ref : 'User' },
    skillPoints : Number,
    abilities : [abilitySubSchema]

});

characterSchema.path('birthDate').default(function(){
	return moment().format('X');
});

module.exports      = mongoose.model('Character', characterSchema); // users