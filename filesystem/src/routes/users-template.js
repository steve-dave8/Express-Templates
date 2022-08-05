// Dependency imports:
import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
// Custom module imports:
import dataHandler from '../util/dataHandler';
import { createHash, verifyHash } from '../util/hasher.js';

// Data filepath:
const usersFile = path.resolve(process.env.DATA_USERS_LOCATION);

const router = express.Router();

// Create a new user:
router.post('/users', async (req, res, next) => {
    try {
        // check for duplicate:
        const users = await dataHandler.read(usersFile);
        if (users.some(user => user.email === req.body.email)){
            return res.status(400).json("Error: an account with that email already exists.");
        };

        const hash = await createHash(req.body.password);
        const newUser = {
            ...req.body, 
            id: uuidv4(),
            password: hash
        };
        users.push(newUser);
        await dataHandler.write(usersFile, users);

        return res.status(201).json({message: "New user successfully created.", ID: newUser.id});

    } catch (err) {
        console.error(err);
        return next(err);
    };
});

// User login:
router.post('/login', async (req, res, next) => {
    try {
        const users = await dataHandler.read(usersFile);
        const activeUser = users.find(user => user.email === req.body.email);
        if (!activeUser) {
            return res.status(401).json("Error: incorrect email.");
        };

        const password = req.body.password;
        const storedHash = activeUser.password;
        const verified = await verifyHash(password, storedHash);
        if (!verified) {
            return res.status(401).json("Error: incorrect password.");
        };

        const userEmail = req.body.email;
        const token = jwt.sign({userEmail}, process.env.JWT_SECRET, {expiresIn: "2h"}); 
        return res.json({token, userName: activeUser.name});

    } catch (err) {
        console.error(err);
        return next(err);
    };
});

export default router;