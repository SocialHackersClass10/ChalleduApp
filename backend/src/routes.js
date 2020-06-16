const express = require('express')
const router = express.Router();

router.get('/users', (req, res) => {
    res.send(`<h1>No users yet :(</h1>`)
})

router.post('/users', (req, res) => {
    console.log("Data saved successfull")
})

module.exports = router