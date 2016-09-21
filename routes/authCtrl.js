var User = require('../models/users'),
    passwords  = require('../modules/passwords.js'),
    errors = {
        general: {
            status: 500,
            message: 'Backend Error'
        },
        login: {
            status: 403,
            message: 'Invalid username or password.'
        }
    };


module.exports = {
    session: {
        protected: (req, res, next) => {
            if (req.session.profile) {
                next();
            } else {
                res.redirect('/');
            }
        },
        // admin: (req, res, next) => {
        //     if( req.session.profile && req.session.profile.role === 'admin' ) {
        //         next();
        //     } else {
        //         res.redirect('/');
        //     }
        // },
        login: (req, res) => {
            User.findOne({
                username: req.body.username
            }, (err, user) => {
                if (err) {
                    console.error('MongoDB error:'.red, err);
                    res.status(500).json(errors.general);
                }
                if (!user) {
                    // forbidden
                    console.warn('No user found!'.yellow);
                    res.status(403).json(errors.login);
                } else {
                    console.info('auth.login.user', user);
                    // at this point, user.password is hashed!

                    passwords.compare(req.body.password, user.username, user.password, (match)=>{
                        if(!match){
                            // forbidden, bad password
                            console.warn('Password did not match!'.yellow);
                            res.status(403).json(errors.login);
                        }
                        else{
                            req.session.uid = user._id
                            res.send(user)
                        }
                    });
                }
            });
        },
        logout: (req, res) => {
            req.session.reset();
            res.redirect('/');
        }
    }
};
