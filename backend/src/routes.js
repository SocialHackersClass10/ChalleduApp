const express = require('express');
const { User } = require("./Schema");
const router = express.Router();

//Route to get all users
router.get('/users', async (req, res) => {
    const users = await User.find({});
    try {
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err)
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


module.exports = router;