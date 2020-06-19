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


// Update a user
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


router.post('/users', (req, res) => {
    res.status(200).send(req.body)
});


module.exports = router;