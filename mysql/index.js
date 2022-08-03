// Dependencies:
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
// Routes:
import sampleRoutes from "./src/routes/routeTemplate.js"

// App setup:
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", sampleRoutes);

// Global error handler:
app.use((err, req, res, next) => {
    console.log("Error from global error handler:");
    console.error(err.stack);
    return res.status(404).json("Error 404: not found.");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API server listening on port ${port}`));