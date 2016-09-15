



module.exports = (app) => {
    const Page = require('./page')(app);
    const userCtrl = require('./userCtrl.js');
    const charCtrl = require('./characterCtrl.js');
    const authCtrl = require('./authCtrl.js');

    // Login
    app.post('/auth/login', authCtrl.login)


    // User Routes
    app.get('/api/users', userCtrl.find);
    app.get('/api/users/:id', userCtrl.find);
    app.post('/api/users', userCtrl.upsert);
    app.post('/api/users/:id', userCtrl.upsert);

    // Char Routes
    app.get('/api/chars', charCtrl.find);
    app.get('/api/chars/:id', charCtrl.find);
    app.post('/api/chars', charCtrl.upsert);
    app.post('/api/chars/:id', charCtrl.upsert);


    app.get('/', Page.root);
    app.get('/portal', Auth.session.protected, Page.portal);
    app.get('/portal/admin', Auth.session.admin, Page.admin);
    //
    // ───────────────────────────────────────────────────────────────────────────
    //
    app.get('/html/*', Page.partials);
    app.use(Page.static); // make the public folder serve like a fileserver
};