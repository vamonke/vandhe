const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new mongoose.Schema({
  code: Number,
  name: String,
  school: String,
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
