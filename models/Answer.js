const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new mongoose.Schema({
  text: String,
  question_id: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
