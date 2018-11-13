const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new mongoose.Schema({
  text: String,
  question_id: { type: Schema.Types.ObjectId, ref: 'Question' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  prof_approved: Boolean
}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
