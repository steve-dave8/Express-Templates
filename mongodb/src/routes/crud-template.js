import express from 'express';
import ItemModel from '../database/models/item.model.js';

const router = express.Router();

// ---Item routes---

//>>> Add a new item
router.post('/items', async (req, res, next) => {
    const newItem = req.body;
    try {
        const addedItem = new ItemModel(newItem); // assumes all fields are present in the request body and share the same property names as outlined in the item schema
        const saved = await addedItem.save();
        return res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

//>>> Get all items
router.get('/items', async (req, res, next) => {
    try {
        const items = await ItemModel.find({}).exec();
        return res.json(items);
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

//>>> Get a specific item
router.get('/items/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const found = await ItemModel.findById(id).exec();
        if (!found) {
            return res.status(404).json(`Error: item not found with id ${id}.`);
        };
        return res.json(found);
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

//>>> Delete an item
router.delete('/items/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const deleted = await ItemModel.findByIdAndRemove(id);
        if(!deleted) {
            return res.status(404).json(`Error: item not found with id ${id}.`);
        }
        return res.status(204).json();
    } catch (err) {
        console.error(err);
        return next(err);
    };
});

//>>> Update an item
router.put('/items/:id', async (req, res, next) => {
    const {id} = req.params;
    const update = req.body; // assume the request body shares the same property names as outlined in the item schema
    try {
        const updatedItem = await ItemModel.findByIdAndUpdate(id, update, {new: true}); // new=true : return the modified document rather than the original
        if(!updatedItem) {
            return res.status(404).json(`Error: item not found with id ${id}.`);
        }
        return res.json(updatedItem);
    } catch (err) {
        console.error(err);
        return next(err);
    };

});

export default router;