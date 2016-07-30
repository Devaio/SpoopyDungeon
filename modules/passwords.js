var crypto = require('crypto');

module.exports = {
    encrypt: function (password) {
        return crypto.createHash('sha512').update(password).digest('hex');
    },
    compare: function (password, userPassword, cb) {
        if (this.encrypt(password) === userPassword) {
            return cb(true);
        } else {
            return cb(false);
        }
    }
};