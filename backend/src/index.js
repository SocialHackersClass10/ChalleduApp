// dotenv: access local environmental constants / variables
//I change this part to adapt with O.S system
require('dotenv/config');


const express = require('express');
const path = require('path');
const app = express();



// import mongoose & models from our Schema
const { mongoose, User, NGO, affinities } = require("./Schema");
//import utils
const { terminateServer } = require('./utils')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'src')))
app.use('/', require('./routes'))

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
