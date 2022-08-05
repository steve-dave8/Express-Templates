// Dependency imports:
import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import path from 'path';
// Custom module imports:
import dataHandler from '../util/dataHandler';

// Data filepath:
const itemsFile = path.resolve(process.env.DATA_ITEMS_LOCATION);

const router = express.Router();

// ---Item routes---

//>>> Add a new item
router.post('/items', async (req, res, next) => await dataHandler.addData(req, res, next, itemsFile));

//>>> Get all items
router.get('/items', async (req, res, next) => await dataHandler.getAll(req, res, next, itemsFile));

//>>> Get a specific item
router.get('/items/:id', async (req, res, next) => await dataHandler.getOne(req, res, next, itemsFile));

//>>> Update an item
router.put('/items/:id', async (req, res, next) => await dataHandler.updateData(req, res, next, itemsFile));

//>>> Delete an item
router.delete('/items/:id', async (req, res, next) => await dataHandler.removeData(req, res, next, itemsFile));

export default router;