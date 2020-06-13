const express = require('express');

const router = express.Router();


router.get('/users', (req, res) => {
    res.send(`<h1>No users yet :(</h1>`)
});


//route to get a single user
router.get('/users/:id', async (req,res) => {
    try{
        let user = await Users.findById(req.params.id);
        delete user.password;
        res.status(200).json(user);
    }catch(error){
        res.status(404).send({ error: `The given id ${req.params.id} not found.` });
    }    
});


router.post('/users', (req, res) => {
    res.status(200).send(req.body)
});


module.exports = router;