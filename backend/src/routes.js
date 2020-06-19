const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router();

const { User } = require("./Schema")

router.get('/users', (req, res) => {
    res.send(`<h1>No users yet :(</h1>`)
});


//route to get a single user
router.get('/users/:id', async (req,res) => {
    try{
        let user = await User.findById(req.params.id);
        if (user){
            delete user.password;
            res.status(200).json({ user: user });
        }else{
            res.status(404).send({ error: `User with id ${req.params.id} not found.` });
        };
    }catch(err){
        res.status(500).send({ error: err });
    };    
});


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

module.exports = router;