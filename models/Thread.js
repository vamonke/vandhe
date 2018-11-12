const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new mongoose.Schema({
  title: String,
  description: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  module: String
}, { timestamps: true });

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
