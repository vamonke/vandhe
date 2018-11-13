const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new mongoose.Schema({
  text: String,
  thread_id: { type: Schema.Types.ObjectId, ref: 'Thread' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
