const fs = require('fs');
const express = require('express');

var assets = {
    css: [
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
        '//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css',
        '/css/main.css',
        '/css/nav.css'
    ],
    js: [
        '//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js',
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
        '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.js',
        '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-route.min.js',
        '//cdnjs.cloudflare.com/ajax/libs/pagedown/1.0/Markdown.Converter.min.js',
        '//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js'
    ]
};

assets.dungeon = {
    css: [
        '/css/rpg-awesome.min.css',
        '//cdn.jsdelivr.net/github-markdown-css/2.4.0/github-markdown.css'
    ],
    js: [
        '/scripts/modules/spoopyDungeon.js',
        '/scripts/controllers/dungeonController.js',
        '/scripts/controllers/loginController.js',
        '/scripts/factories/dungeonFactory.js',
    ]
};

assets.admin = {
    css: [
        '/css/admin.css'
    ],
    js: [
        '/js/controller.admin.js',
        '/js/controller.users.js',
    ]
}

module.exports = (app) => {
    return {
        static: express.static('public'),
        partials: (req, res) => {
            var filepath = req.path.slice(6).slice(0,-5);
            fs.exists(`${app.get('views')}/partials/${filepath}.ejs`, (fileExists) => {
                if( fileExists ) {
                    res.render(`partials/${filepath}.ejs`, { session: req.session });
                } else {
                    res.status(404).end();
                }
            });
        },
        // root: (req, res) => {
        //     if( req.session.profile ) {
        //         res.redirect('/home');
        //     } else {
        //         res.render('page');
        //     }
        // },
        // Main Page
        login: (req, res) => {
            res.render('page', {
                head: {
                    title: 'Spoopy Dungeon | Login',
                    css: assets.css.concat(assets.dungeon.css),
                    scripts: assets.js.concat(
                        // '/scripts/modules/spoopyDungeon.js',
                        assets.dungeon.js
                    )
                },
                session  : req.session,
                module   : 'SpoopyDungeon',
                template : 'login'
            });
        },
        home: (req, res) => {
            res.render('page', {
                head: {
                    title: 'Spoopy Dungeon | Login',
                    css: assets.css.concat(assets.dungeon.css),
                    scripts: assets.js.concat(
                        // '/scripts/modules/spoopyDungeon.js',
                        assets.dungeon.js
                    )
                },
                session  : req.session,
                module   : 'SpoopyDungeon',
                template : 'home'
            });
        },
        // admin: (req, res) => {
        //     res.render('page', {
        //         head: {
        //             title: 'Spoopy Dungeon',
        //             css: assets.css.concat(
        //                 assets.dungeon.css,
        //                 assets.admin.css
        //             ),
        //             scripts: assets.js.concat(
        //                 '/scripts/modules/SpoopyDungeon.js',                        
        //                 assets.dungeon.js,
        //                 assets.admin.js
        //             )
        //         },
        //         session  : req.session,
        //         module   : 'SpoopyDungeon',
        //         template : 'portal'
        //     });
        // }
    };
};
