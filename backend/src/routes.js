const express = require('express')
const bcrypt = require('bcrypt')
const { User, NGO } = require('./Schema')

const router = express.Router()
const { isURL, ngoCheck } = require('./utils')

// endpoint: get all users
router.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({ users })
    } catch (err) {
        // change: return only the .message instead of the complete error structure
        // res.status(500).send({ error: err })
        res.status(500).send({ error: err.message })
    }
})

// endpoint: get single user
router.get('/users/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            delete user.password
            res.status(200).json({ user })
        } else {
            res.status(404).send({ error: `User with id ${req.params.id} not found.` })
        }
    } catch (err) {
        // change: return only the .message instead of the complete error structure
        // res.status(500).send({ error: err });
        res.status(500).send({ error: err.message })
    }
})

// endpoint: Update a user
router.put('/users/:id', async(req, res) => {
    const user_id = req.params.id
    const user_data = req.body
    try {
        await User.findByIdAndUpdate(user_id, { $set: user_data })
        res.status(200).json({ _id: user_id })
    } catch (err) {
        // change: return only the .message instead of the complete error structure
        // res.status(404).send({ error: err });
        res.status(404).send({ error: err.message })
    }
})

// endpoint: insert a user
router.post('/users', require('./middleware/middleware'), async(req, res) => {
    const newUser = new User(req.body)
    const saltRounds = 10
    let newUserEmail = req.body.email
    newUserEmail = await User.countDocuments({ email: newUserEmail })
    if (newUserEmail <= 0) {
        bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
            newUser.password = hash
            newUser.save((err, doc) => {
                if (!err) {
                    res.status(201).json({ user: doc })
                } else {
                    res.status(400).json({

                        // change: unify returning error
                        // message: err.message
                        error: err.message

                    })
                }
            })
        })
    } else {
        res.status(400).json({ error: 'Could not create user. The email already exists.' })
    }
})

// endpoint: insert an NGO
router.post('/ngos', (req, res) => {
    // Validating the data posted to the database
    ngoCheck(req, res)

    // req.body destructuring in order not to repeat ourselves with req.body.key etc.
    const {
        name,
        image,
        webpage,
        description,
        main_representative,
        affinities,
        contact: { address, phone, contact_hours }
    } = req.body

    const ngo = new NGO({ document_state: 'Pending', name, image, webpage, description, main_representative, affinities, contact: { address, phone, contact_hours } })

    ngo.save((error, ngo) => {
        if (error) {
            // change: return only the .message instead of the complete error structure
            // res.status(500).json({ error: error })
            res.status(500).json({ error: error.message })
        } else { res.status(201).json({ _id: ngo._id }) }
    })
})

// endpoint: get all ngos
router.get('/ngos', async(req, res) => {
    try {
        const ngos = await NGO.find({ document_state: 'Approved' }, 'name image description affinities')
        res.status(200).json({ ngos })
    } catch (err) {
        // change: return only the .message instead of the complete error structure
        // res.status(500).send({ error: err });
        res.status(500).send({ error: err.message })
    }
})

// endpoint: Update an NGO
router.put('/ngos/:id', async(req, res) => {
    const ngo_id = req.params.id
    const ngo_data = req.body
    try {
        await NGO.findByIdAndUpdate(ngo_id, { $set: ngo_data })
        res.status(200).json({ _id: ngo_id })
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
})

router.get('/ngos/:id', async(req, res) => {
    try {
        const ngo = await NGO.findById(req.params.id)
        if (ngo) {
            res.status(200).json({ Ngo: ngo })
        } else {
            res.status(404).json({ error: `NGO with id ${req.params.id} not found.` })
        }
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})

module.exports = router