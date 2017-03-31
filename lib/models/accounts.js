"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var passwords = require("../modules/passwords");
var AccountSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
AccountSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    var user = this;
    user.password = passwords.encrypt(user.password);
    return next();
});
exports.Account = mongoose_1.model("Account", AccountSchema);
