// Dependency imports:
import express from 'express';
import jwt from 'jsonwebtoken';
// Custom module imports:
import database from '../database/connection.js';
import controller from '../database/controller.js';
import { createHash, verifyHash } from '../util/hasher.js';

const router = express.Router();

const userTable = {
    name: "users",
    primaryKey: "userID",
    columns: ["name", "email", "password"]
};

// Create a new user:
router.post('/users', async (req, res, next) => {
    database.query(`SELECT email FROM ${userTable.name} WHERE email=?`, [req.body.email],
        function (error, results, fields){
            if (results.length){
                return res.status(400).json("Error: an account with that email already exists.");
            };

            const password = req.body.password;
            createHash(password).then(hash => {
                req.body.password = hash;
                return req;    
            }).then(async (newUser) => controller.create(newUser, res, next, database, userTable)); 
        }
    )
});

// User login:
router.post('/login', (req, res) => {
    database.query("SELECT * FROM users WHERE email=?", [req.body.email],
        function (error, results, fields) {
            const user = results[0];

            if (!user) {
                return res.status(401).json("Error: incorrect email.");
            };

            const password = req.body.password;
            const storedHash = user.password;

            verifyHash(password, storedHash).then(valid => {
                if (!valid) {
                    return res.status(401).json("Error: incorrect password.");
                };
                // Upon successful login: 
                const userEmail = req.body.email;
                const token = jwt.sign({userEmail}, process.env.JWT_SECRET, {expiresIn: "2h"}); 
                return res.json({token, userName: user.name});
            });
        }
    ); 
});

export default router;