const express = require('express')
const router = express.Router();

router.get('/users', (req, res) => {
    res.send(`<h1>No users yet :(</h1>`)
})

router.post('/users', (req, res) => {
    res.status(200).send(req.body)
})

module.exports = router