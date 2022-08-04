// Dependencies:
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
// Routes:
import sampleCrudRoutes from "./src/routes/crud-template.js";

// Connect to the database:
const dbPort = process.env.DB_PORT || 27017;
mongoose.connect(`mongodb://${process.env.DB_HOST}:${dbPort}/${process.env.DB_NAME}`)
    .then(() => console.log("Successfully connected to the Mongo database"))
    .catch(err => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
});

// App setup:
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", sampleCrudRoutes);

// Global error handler:
app.use((err, req, res, next) => {
    console.log("Error from global error handler:");
    console.error(err.stack);
    return res.status(404).json("Error 404: not found.");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API server listening on port ${port}`));