var userCtrl = require('./user');

module.exports = {
    session: {
        protected: (req, res, next) => {
            if( req.session.profile ) {
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
            if(){

            } else {
                res.redirect('/');
            }
        },
        logout: (req, res) => {
            req.session.reset();
            res.redirect('/');
        }
    }
};
