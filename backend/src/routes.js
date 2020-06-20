const express = require('express');
const { User, NGO } = require("./Schema");
const router = express.Router();
const { isURL, ngoCheck } = require('./utils')

//Route to get all users
router.get('/users', async (req, res) => {
    const users = await User.find({});

    try {
        res.status(200).json({ users: users })
    } catch (err) {
        res.status(500).send({ error: err })
    }
});

//route to get a single user
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


router.post('/users', (req, res) => {
    res.status(200).send(req.body)
});

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

module.exports = router;
