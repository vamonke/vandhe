const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionPartSchema = new mongoose.Schema({
  questionNo: String,
  text: String,
  parent_id: { type: Schema.Types.ObjectId, ref: 'Question' },
}, { timestamps: true });

const QuestionPart = mongoose.model('QuestionPart', questionPartSchema);

module.exports = QuestionPart;
