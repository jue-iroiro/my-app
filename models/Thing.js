// models/Thing.js
import mongoose from 'mongoose';

const ThingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.models.Thing || mongoose.model('Thing', ThingSchema);