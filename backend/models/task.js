const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
}, { timestamps: true });

module.exports = mongoose.model('task', taskSchema);


