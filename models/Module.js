const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new mongoose.Schema({
  code: String,
  name: String,
  course: String,
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
