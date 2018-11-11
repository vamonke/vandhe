const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionVoteSchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  question_id: { type: Schema.Types.ObjectId, ref: 'Question' },
}, { timestamps: true });

const QuestionVote = mongoose.model('QuestionVote', questionVoteSchema);

module.exports = QuestionVote;
