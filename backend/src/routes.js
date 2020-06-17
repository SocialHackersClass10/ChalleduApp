const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router();

const { User } = require("./Schema")

router.get('/users', (req, res) => {
    res.send(`<h1>No users yet :(</h1>`)
})

router.post('/users', require('./middleware/middleware'), (req, res) => {
    const newUser = new User(req.body)
    const saltRounds = 10;
    bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
        newUser.password = hash
        newUser.save((err, doc) => {
            if (!err) {
                res.status(201).json({ doc })
            } else {
                res.status(400).json({
                    message: err.message
                })
            }
        });
    });
})

module.exports = router