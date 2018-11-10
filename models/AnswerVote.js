const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerVoteSchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  answer_id: { type: Schema.Types.ObjectId, ref: 'Answer' },
}, { timestamps: true });

const AnswerVote = mongoose.model('AnswerVote', answerVoteSchema);

module.exports = AnswerVote;
