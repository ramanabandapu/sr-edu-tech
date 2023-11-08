const express = require('express');

const userController = express.Router();

const { UserModel } = require('../Models/User.model');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const dotenv = require('dotenv');

const userValidation = require('../Validations/user.validation');

const validation = require('../Middlewares/validation.middleware');

dotenv.config()

// userController.post('/register',validation(userValidationSchema), async (req, res) => {
//     const { username, email, password, age } = req.body;
//     try {
//         bcrypt.hash(password, 5, async (err, hash) => {
//             if (err) {
//                 res.status(200).send({ "error": err.message })
//             }
//             else {
//                 const user = new UserModel({ username, email, password: hash, age });
//                 await user.save();
//                 res.status(200).send({ "msg": "User was successfully registered" });
//             }
//         });
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
// });

userController.post('/register',validation(userValidation.userRegisterValidationSchema), async (req, res) => {
    const { username, email, password, age } = req.body;
    try {
        const hash = await bcrypt.hash(password, 5);
        const user = new UserModel({ username, email, password: hash, age });
        await user.save();
        res.status(200).send({ "msg": "User was successfully registered" });
    } catch (error) {
        res.status(500).send({ error: "An error occurred while registering the user." });
    }
});

userController.post('/login',validation(userValidation.userLoginValidationSchema), async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ author_id: user._id, author: user.username }, process.env.JWT_SECRET);  //passing the payload for realiting the todos of the particular user
                    res.status(200).send({ "msg": "User was successfully logged in....", token });
                }
                else {
                    res.status(200).send({ "err": "wrong credentials" });
                }
            });
        } else {
            res.status(200).send({ "err": "Wrong credentials" });
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


module.exports = { userController };