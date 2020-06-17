
// dotenv: access local environmental constants / variables
require('dotenv').config();


const express = require('express');
const path = require('path');
const app = express();

// import mongoose & models from our Schema
const { mongoose, User, NGO, affinities } = require("./Schema");

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'src')))
app.use('/', require('./routes'))
app.use('/ngos', (req, res, next) => {
    if (!req.body.name) {
        res.status(400).json({ error: 'Name is required' })
    } else if (!isURL(req.body.webpage)) {
        res.status(400).json({ error: 'Wrong URL' })
    } else if (!req.body.description) {
        res.status(400).json({ error: 'Description is required' })
    } else if (req.body.affinities.length === 0 || req.body.affinities.length > 3) {
        res.status(400).json({ error: 'You must pick 1 to 3 affinities' })
    } else if (!req.body.contact.address || !req.body.contact.phone) {
        res.status(400).json({ error: 'Address and phone are required' })
    } else next();
})

// dotenv: SERVER_PORT
const PORT = process.env.SERVER_PORT || 5000;

// mongodb: db connection params
const mongoConxParams = { useNewUrlParser: true, useUnifiedTopology: true };

// server: initial greeting
console.log('\nServer initialization ...\n');

// dotenv: verify existing connection URL and credentials / terminate if missing
if (!process.env.MONGODB_KEY) {
    terminateServer('Missing database connection URL', { message: 'Please verify .env' });
};

// mongodb: initialise database conncetion / terminate on error
mongoose.connect(process.env.MONGODB_KEY, mongoConxParams, err => {
    if (err) { terminateServer('Database connection Error', err) };
    User.createCollection(err => {
        if (err) { terminateServer('Users collection creation Error', err) };
        NGO.createCollection(err => {
            if (err) { terminateServer('Ngos collection creation Error', err) };
            app.listen(PORT, () =>
                console.log(`Server ready, listening on port ${PORT}`)
            );
        });
    });
});

// log a message and stop the server
function terminateServer(action, error = {}) {
    const errorMsg = action + ':\n'
        + (error.code ? `Code: ${error.code}` + '\n' : '')
        + (error.message ? error.message + '\n' : '');
    console.log(errorMsg, '\nThe Server is terminating.\n');
    process.exit(1);
};

function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

