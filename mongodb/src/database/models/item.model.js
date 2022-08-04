import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number
});

const Item = model('Item', itemSchema);

export default Item;