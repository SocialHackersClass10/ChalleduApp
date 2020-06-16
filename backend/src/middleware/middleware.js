const bcrypt = require('bcrypt');

const { User } = require("../Schema")

module.exports = function(req, res, next) {
    const newUser = new User(req.body)

    const errFill = new Error('Please fill all the input')
    const errSave = new Error('Failled data saving')
    if (newUser.username === '') {
        next(errFill)
    }
    if (newUser.password === '') {
        next(errFill)
    }
    if (newUser.email === '') {
        next(errFill)
    }
    if (newUser.full_name === '') {
        next(errFill)
    }
    if (newUser.role === '') {
        next(errFill)
    }
    if (newUser.description === '') {
        next(errFill)
    }
    if (newUser.gender === '') {
        next(errFill)
    }
    if (newUser.birth_date === '') {
        next(errFill)
    }

    const saltRounds = 10;
    bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
        newUser.password = hash
        newUser.save((err, doc) => {
            if (!err) {
                res.status(201).send(doc)
                next()
            } else {
                next(errSave)
            }
        });
    });
    next()
}