const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerVoteSchema = new mongoose.Schema({
  value: Number, // +1 for upvote, -1 for downvote
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  answer_id: { type: Schema.Types.ObjectId, ref: 'Answer' },
}, { timestamps: true });

const AnswerVote = mongoose.model('AnswerVote', answerVoteSchema);

module.exports = AnswerVote;
