// Dependency imports:
import express from 'express';
import jwt from 'jsonwebtoken';
// Custom module imports:
import UserModel from '../../database/models/user.model.js';
import { createHash, verifyHash } from '../util/hasher.js';

const router = express.Router();

// Create a new user:
router.post('/users', async (req, res, next) => {
    try {
        const duplicate = await UserModel.findOne({email: req.body.email}).exec();
        if (duplicate) {
            return res.status(400).json("Error: an account with that email already exists.");
        }

        const hash = await createHash(req.body.password);
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        const savedUser = await user.save();
        delete savedUser.password;
        return res.status(201).json(savedUser);

    } catch (err) {
        console.error(err);
        return next(err);
    };
});

// User login:
router.post('/login', async (req, res, next) => {
    try {
        const user = await UserModel.findOne({email: req.body.email}).exec();
        if (!user) {
            return res.status(401).json("Error: incorrect email.");
        };

        const valid = await verifyHash(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json("Error: incorrect password.");
        };

        const userEmail = req.body.email;
        const token = jwt.sign({userEmail}, process.env.JWT_SECRET, {expiresIn: "2h"});      
        return res.json({token, userName: user.name});

    } catch (err) {
        console.error(err);
        return next(err);
    };
});

export default router;