require('colors') // awesome colors in your console logs!

var config = require('./package'),
    express = require('express'), // our framework!
    bodyParser = require('body-parser'), // used for POST routes to obtain the POST payload as a property on `req`
    path = require('path'), // used to resolve paths across OSes
    logger = require('morgan')('dev'), // log the routes being accessed by the frontend
    routes = require('./routes'),
    cors = require('cors')({
        origin: 'http://10.25.15.28:8100',
        optionsSuccessStatus: 200,
        credentials : true
    }),
    sessions = require('client-sessions')(config.session),
    app = express(), // initialize express
    mongooseConnection = `mongodb://${config.mongo.host}/${config.mongo.db}`,
    port = process.env.PORT||80; // server port

require('mongoose').connect(mongooseConnection, ( error ) => {
    if( error ) {
        console.error('ERROR starting mongoose!', error);
        process.exit(128);
    } else {
        console.info('Mongoose connected:'.yellow, mongooseConnection.toString().bold.magenta);
    }
});

// app.locals.github = config.github[process.env.NODE_ENV||"development"];

// server setup
app.use(sessions);   // mounting HTTPs session cookies
app.use(logger);     // mounting dev logging
app.use(cors);       // enable CORS for requests

// enable server-side rendering
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// mount the body-parsing middleware to parse payload strings into `body` object stored in `req.body`
app.post('*', bodyParser.json(), bodyParser.urlencoded({ extended:true }));

routes(app); // do all the routing stuff in a separate file by passing a reference of the app!

// start the server
app.listen(port, () => {
    console.log('students.refactoru.com'.cyan, ':', port.toString().bold);
});
