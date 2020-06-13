const express = require('express');
const path = require('path');
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src')));
app.use('/', require('./routes'));

//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Initialized at ${PORT}`));