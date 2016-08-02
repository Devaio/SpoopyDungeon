var mongoose   = require('mongoose');
var passwords  = require('../modules/passwords.js');

var userSchema = mongoose.Schema({
    
    username:    { type: String, unique: true },
    password:    { type: String },

});


userSchema.pre('save', function(next){
	// First, check to see if the password has been modified. If not, just move on.
	if(!this.isModified('password')){
		return next();
    }
	// Store access to "this", which represents the current user document
	var user = this;
	user.password = passwords.encrypt(user.password, user.username);
	return next();
	
});

module.exports = mongoose.model('User', userSchema); // users