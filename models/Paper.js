const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paperSchema = new mongoose.Schema({
  module_id: { type: Schema.Types.ObjectId, ref: 'Module' },
  year: Number,
  semester: Number
}, { timestamps: true });

const Paper = mongoose.model('Paper', paperSchema);

module.exports = Paper;
