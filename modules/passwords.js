var crypto = require('crypto');

module.exports = {
    encrypt: function (password, unique) {
        return crypto.createHash('sha512').update(password + unique).digest('hex');
    },
    compare: function (password, unique, userPassword, cb) {
        if (this.encrypt(password, unique) === userPassword) {
            return cb(true);
        } else {
            return cb(false);
        }
    }
};