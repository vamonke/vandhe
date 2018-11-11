const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new mongoose.Schema({
  questionNo: Number,
  text: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  paper_id: { type: Schema.Types.ObjectId, ref: 'Paper' },
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
