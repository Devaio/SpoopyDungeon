var mongoose = require('mongoose');
var moment = require('moment');

var abilitySchema = mongoose.Schema({

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
});


module.exports = mongoose.model('Ability', abilitySchema); // users