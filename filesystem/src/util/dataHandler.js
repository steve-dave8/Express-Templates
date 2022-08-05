import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

/**
 * @param {string} file - filepath where data will be stored
 */
const write = async (file, data) => {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
};

const read = async (file) => {
    let content = await fs.readFile(file);
    return JSON.parse(content);
};

const addData = async (req, res, next, file) => {
    try {
        const content = await read(file);
        const newEntry = {
            id: uuidv4(),
            ...req.body
        };
        content.push(newEntry);
        await write(file, content);
        return res.status(201).json({message: "New item successfully added.", ID: newEntry.id});
    } catch (err) {
        console.error(err);
        return next(err);
    };
};

const getAll = async (req, res, next, file) => {
    try {
        const content = await fs.readFile(file);
        return res.send(content);
    } catch (err) {
        console.error(err);
        return next(err);
    };
};

const getOne = async (req, res, next, file) => {
    const {id} = req.params;
    try {
        const content = await read(file);
        const itemIndex = content.findIndex(item => item.id == id); 
        if (itemIndex === -1){
            return res.status(404).json(`Error: item not found with id ${id}.`);
        };
        return res.json(content[itemIndex]);
    } catch (err) {
        console.error(err);
        return next(err);
    };
};

const updateData = async (req, res, next, file) => {
    const {id} = req.params;
    try {
        let content = await read(file);
        const itemIndex = content.findIndex(item => item.id == id); 
        if (itemIndex === -1){
            return res.status(404).json(`Error: item not found with id ${id}.`);
        };

        for (let key in req.body){
            content[itemIndex][key] = req.body[key];
        };
        await write(file, content);
        return res.json(content[itemIndex]);

    } catch (err) {
        console.error(err);
        return next(err);
    };
};

const removeData = async (req, res, next, file) => {
    const {id} = req.params;
    try {
        let content = await read(file);
        const itemIndex = content.findIndex(item => item.id == id);
        if (itemIndex === -1) {
            return res.status(404).json(`Error: item not found with id ${id}.`);
        };

        content.splice(itemIndex, 1);
        await write(file, content);
        return res.status(204).json();

    } catch (err) {
        console.error(err);
        throw err;
    };
};

export default { getAll, getOne, addData, removeData, updateData, write, read }