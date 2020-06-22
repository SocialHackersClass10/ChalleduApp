const express = require('express');
const { User, NGO } = require("./Schema");
const bcrypt = require('bcrypt');
const router = express.Router();
const { isURL, ngoCheck } = require('./utils')

// endpoint: get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users: users })
    } catch (err) {
        res.status(500).send({ error: err })
    }
});

// endpoint: get single user
router.get('/users/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (user) {
            delete user.password;
            res.status(200).json({ user: user });
        } else {
            res.status(404).send({ error: `User with id ${req.params.id} not found.` });
        };
    } catch (err) {
        res.status(500).send({ error: err });
    };
});

// endpoint: Update a user
router.put("/users/:id", async (req, res) => {
    const user_id = req.params.id;
    const user_data = req.body;
    try {
      await User.findByIdAndUpdate(user_id, { $set: user_data });
      res.status(200).json({ _id: user_id });
    } catch (err) {
      res.status(404).send({ error: err });
    }
});

// endpoint: insert a user
router.post('/users', require('./middleware/middleware'), (req, res) => {
    const newUser = new User(req.body)
    const saltRounds = 10;
    bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
        newUser.password = hash
        newUser.save((err, doc) => {
            if (!err) {
                res.status(201).json({ user: doc })
            } else {
                res.status(400).json({
                    message: err.message
                })
            }
        });
    });
})

// endpoint: insert an NGO
router.post('/ngos', (req, res) => {

    //Validating the data posted to the database
    ngoCheck(req, res);

    //req.body destructuring in order not to repeat ourselves with req.body.key etc.
    const { name, image, webpage, description, main_representative, affinities, contact: { address, phone, contact_hours }
    } = req.body;

    const ngo = new NGO({ document_state: 'Pending', name: name, image: image, webpage: webpage, description: description, main_representative: main_representative, affinities: affinities, contact: { address: address, phone: phone, contact_hours: contact_hours } });

    ngo.save((error, ngo) => {
        if (error) {
            res.status(500).json({ error: error })
        } else { res.status(201).json({ _id: ngo._id }) }
    })
})

// endpoint: get all ngos
router.get('/ngos', async (req, res) => {
    try {
        const ngos = await NGO.find({},'document_state name image description affinities');
        res.status(200).json({ ngos: ngos });
    } catch (err) {
        res.status(500).send({ error: err });
    };
});

module.exports = router;
