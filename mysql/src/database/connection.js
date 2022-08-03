// For local dev environment:
import dotenv from 'dotenv';
dotenv.config();

const mysql = require("mysql");

const localConfiguration = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_NAME
};

const connection = mysql.createConnection(localConfiguration);

connection.connect(function (err){
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL database is connected");
    }
});

export default connection;