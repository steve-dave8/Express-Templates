// Dependency imports:
import express from 'express';
// Custom module imports:
import database from '../database/connection.js';
import controller from '../database/controller.js';

const router = express.Router();

const table = {
    name: "items",
    primaryKey: "itemID",
    columns: ["name", "price", "quantity"]
};

// ---Item routes---

//>>> Add a new item
router.post('/items', async (req, res, next) => controller.create(req, res, next, database, table));

//>>> Get all items
router.get('/items', async (req, res, next) => controller.getAll(req, res, next, database, table.name));

//>>> Delete an item
router.delete('/items/:id', async (req, res, next) => controller.delete(req, res, next, database, table));

//>>> Get a specific item
router.get('/items/:id', async (req, res, next) => controller.getOne(req, res, next, database, table));

//>>> Update an item
router.put('/items/:id', async (req, res, next) => controller.update(req, res, next, database, table));

export default router;