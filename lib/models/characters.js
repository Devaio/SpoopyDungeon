"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var moment = require("moment");
var AbilitySubSchema = new mongoose_1.Schema({
    name: String,
    class: String,
    levelReq: { type: Number, default: 0 },
    description: String,
    dmgMod: { type: Number, default: 0 },
    validTargets: Array,
    effects: [
        {
            category: String,
            dmg: { type: Number, default: 0 },
            rounds: Number
        }
    ],
    cost: {
        pool: String,
        amt: { type: Number, default: 0 }
    },
    cooldown: { type: Number, default: 0 },
    icon: String,
    learned: { type: Boolean, default: false }
});
var CharacterSchema = new mongoose_1.Schema({
    name: { type: String, },
    class: { type: String, },
    maxhp: { type: Number, },
    hp: { type: Number, },
    level: { type: Number, },
    exp: { type: Number, },
    dps: { type: Number, },
    ac: { type: Number, },
    inv: {},
    equipment: {
        head: {},
        chest: {},
        hands: {},
        legs: {},
        feet: {},
        weapon: {},
    },
    birthDate: { type: String },
    deathDate: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    skillPoints: Number,
    abilities: [AbilitySubSchema]
});
CharacterSchema.path('birthDate').default(function () {
    return moment().format('X');
});
exports.Character = mongoose_1.model("Character", CharacterSchema);
