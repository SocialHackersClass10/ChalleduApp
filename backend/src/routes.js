const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('express-jwt');
const formidable = require('formidable');
const gridfs = require('mongoose-gridfs');
const { createReadStream } = require('fs');
const path = require('path');
const { createModel } = require('mongoose-gridfs');
const { User, NGO, mongoose } = require('./Schema');

const router = express.Router();
const { isURL, ngoCheck, saltRounds } = require('./utils');
require('dotenv/config');

const validateRoles = require('./middleware/validateRoles');
// endpoint: get all users
router.get('/users', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), validateRoles(['user-ngo', 'user-independent', 'admin']), async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (err) {
        // change: return only the .message instead of the complete error structure
        // res.status(500).send({ error: err })
        res.status(500).send({ error: err.message });
    }
});

// endpoint: get single user
router.get('/users/:id', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), validateRoles(['user-ngo', 'user-independent', 'admin']), async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            delete user.password;
            res.status(200).json({ user });
        } else {
            res.status(404).send({ error: `User with id ${req.params.id} not found.` });
        }
    } catch (err) {
        // change: return only the .message instead of the complete error structure
        // res.status(500).send({ error: err });
        res.status(500).send({ error: err.message });
    }
});

// endpoint: Update a user
router.put('/users/:id', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), validateRoles(['admin']), async(req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    try {
        await User.findByIdAndUpdate(userId, { $set: userData });
        res.status(200).json({ _id: userId });
    } catch (err) {
        // change: return only the .message instead of the complete error structure
        // res.status(404).send({ error: err });
        res.status(404).send({ error: err.message });
    }
});

// endpoint: insert a user
router.post('/users', require('./middleware/middleware'), async(req, res) => {
    const newUser = new User(req.body);
    let newUserEmail = req.body.email;
    newUserEmail = await User.countDocuments({ email: newUserEmail });
    if (newUserEmail <= 0) {
        bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
            newUser.password = hash;
            newUser.save((err, doc) => {
                if (!err) {
                    res.status(201).json({ user: doc });
                } else {
                    res.status(400).json({

                        // change: unify returning error
                        // message: err.message
                        error: err.message

                    });
                }
            });
        });
    } else {
        res.status(400).json({ error: 'Could not create user. The email already exists.' });
    }
});

// endpoint: insert an NGO
router.post('/ngos', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), validateRoles(['user-ngo', 'admin']), (req, res) => {
    // Validating the data posted to the database
    ngoCheck(req, res);

    // req.body destructuring in order not to repeat ourselves with req.body.key etc.
    const {
        name,
        image,
        webpage,
        description,
        main_representative,
        affinities,
        contact: { address, phone, contact_hours }
    } = req.body;
    if (main_representative) {
        //  there was an assigned representative
        //  so we need to validate it was same as the access_token.id
        if (main_representative !== req.user.id) {
            res.status(403).json({ error: 'You are not authorized to create an NGO with a different representative than yourself.' });
        }
    } else {
        //  there was no representative assigned
        //  so we need to assign it the id from the access_token
        main_representative = req.user.id;
    }

    const ngo = new NGO({ document_state: 'Pending', name, image, webpage, description, main_representative, affinities, contact: { address, phone, contact_hours } });

    ngo.save((error, ngo) => {
        if (error) {
            // change: return only the .message instead of the complete error structure
            // res.status(500).json({ error: error })
            res.status(500).json({ error: error.message });
        } else { res.status(201).json({ _id: ngo._id }); }
    });
});

// endpoint: get all ngos
router.get('/ngos', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), validateRoles(['user-ngo', 'user-independent', 'admin']), async(req, res) => {
    try {
        const ngos = await NGO.find({ document_state: 'Approved' }, 'name image description affinities');
        res.status(200).json({ ngos });
    } catch (err) {
        // change: return only the .message instead of the complete error structure
        // res.status(500).send({ error: err });
        res.status(500).send({ error: err.message });
    }
});

// endpoint: Update an NGO
router.put('/ngos/:id', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), validateRoles(['admin']), async(req, res) => {
    const ngoId = req.params.id;
    const ngoData = req.body;
    try {
        await NGO.findByIdAndUpdate(ngoId, { $set: ngoData });
        res.status(200).json({ _id: ngoId });
    } catch (err) {
        res.status(404).send({ error: err.message });
    }
});

// Get single ngo
router.get('/ngos/:id', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), validateRoles(['user-ngo', 'user-independent', 'admin']), async(req, res) => {
    try {
        const ngo = await NGO.findById(req.params.id);
        if (ngo) {
            res.status(200).json({ ngo });
        } else {
            res.status(404).json({ error: `NGO with id ${req.params.id} not found.` });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.post('/ngos/:id/upload', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), validateRoles(['user-ngo', 'user-independent', 'admin']), async(req, res) => {
    const checkId = await User.findById(req.user.id);
    if (!(checkId.affiliated_ngo.ID === req.params.id)) {
        res.status(403).json({
            error: 'Error during image/document upload.'
        });
    }
    gridfs.mongo = mongoose.mongo;
    const upload = createModel({
        modelName: 'upload'
    });
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(400).json({ err: err.message });
        }
        const prExt = /jpg|jpeg|png|gif|pdf/;
        const checkExt = prExt.test(path.extname(files.file.name));
        const checkmime = prExt.test(files.file.type);

        if (checkExt && checkmime) {
            const readStream = createReadStream(files.file.path);
            const options = ({ filename: files.file.name, contentType: 'multipart/form-data' });
            upload.write(options, readStream, async(error, file) => {
                if (err) {
                    res.status(400).json({ err: err.message });
                }
                let docArray = await NGO.find({ _id: req.params.id });
                docArray = docArray[0].documents;
                docArray.push(file._id);
                NGO.updateOne({ _id: req.params.id }, { documents: docArray }, (err, id) => {
                    if (!err) {
                        return res.status(201).send({
                            message: 'Success',
                            file
                        });
                    }
                    res.status(400).json({
                        error: 'Error during image/document upload.'
                    });
                });
            });
        } else {
            res.status(400).json({
                error: 'Only images or pdf documents.'

            });
        }
    });
});

// route for login
router.post('/auth/login', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.find({ document_state: 'Approved', email });
    if (user == null) return res.status(401).json({ error: 'You provided wrong set of credentials.' });
    if (await bcrypt.compare(password, user[0].password)) {
        res.status(200).json(createJWTs(user[0].id, user[0].role));
    } else {
        res.status(401).json({ error: 'You provided wrong set of credentials.' });
    }
});


//route for refresh process
router.post('/auth/refresh', (req, res) => {
    const refreshToken = req.body.refresh_token;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async(err, user) => {
        if (err) { res.status(401).json({ error: 'Refresh token expired. Please login with your credentials.' }) }
        else {
            user = await User.findById(user.id);
            res.status(200).json(createJWTs(user.id, user.role))
        }
    })
})


function createJWTs(id, role) {
    const payload = {
        id
    };
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '168h' });
    payload.role = role;
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '24h' });

    return { access_token, refresh_token };
}

module.exports = router;