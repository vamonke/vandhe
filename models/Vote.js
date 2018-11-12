const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new mongoose.Schema({
  value: Number, // +1 for upvote, -1 for downvote
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  post_id: String,
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
