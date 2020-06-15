const express = require('express');
const {User} = require("./Schema");
const router = express.Router();


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


router.post('/users', (req, res) => {
    res.status(200).send(req.body)
});


module.exports = router;