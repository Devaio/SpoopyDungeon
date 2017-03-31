import {Document, Schema, Model, model, Types} from 'mongoose';
import passwords = require('../modules/passwords');
import moment = require('moment');
// add mongoose Document to interface
interface CharacterModel extends Document {
    name:            string,
    class:           string,
    maxhp:           number,
    hp:              number,
    level:           number,
    exp:             number,
    dps:             number,
    ac:              number,
    inv:             Object,
    equipment:       Object,
    birthDate:       string,
    deathDate:       string,
    user:            Schema.Types.ObjectId,
    skillPoints :    number,
    abilities :      Array<AbilitySub>
}

interface Effect {
    category?: string,
    dmg?: number,
    rounds?: number
}
interface Cost{
    pool?: string,
    amt?: number
}

interface AbilitySub extends Types.Subdocument{
    name?: string,
    class?: string,
    levelReq?: number,
    description?: string,
    dmgMod?: number,
    validTargets?: Array<string>,
    effects?: Array<Effect>,
    cost?: Cost,
    cooldown?: number,
    icon?: string,
}

var AbilitySubSchema: Schema = new Schema({
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

var CharacterSchema: Schema = new Schema({
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
    user:      { type : Schema.Types.ObjectId, ref : 'User' },
    skillPoints : Number,
    abilities : [AbilitySubSchema]
});

CharacterSchema.path('birthDate').default(function(){
	return moment().format('X');
});

export const Character: Model<CharacterModel> = model<CharacterModel>("Character", CharacterSchema);
