const Answer = require('../models/Answer');

const moment = require('moment');

/**
 * GET /api/answers/:id
 * Get answers by id.
 */
exports.getAnswersById = async (req, res) => {
  const id = req.params.answerId;
  const answer = await Answer.findById(id );
  res.json(answer);
};

/**
 * GET /api/questions/:questionId/answers
 * Get answers by question id.
 */
exports.getAnswersByQuestionId = async (req, res) => {
  const question_id = req.params.questionId;
  const answers = await Answer.find({ question_id });
  res.json({ answers });
};

/**
 * POST /api/answer
 * Create answer to question.
 */
exports.create = async (req, res) => {
  const newAnswer = {
    text: req.body.text,
    question_id:  req.body.question_id,
    user_id: req.user._id.toString()
  }
  let answer = await Answer.create(newAnswer);
  answer = answer.toObject();
  answer.user = req.user;
  answer.createdAt = moment(answer.createdAt).format("D MMMM YYYY");
  res.json(answer);
};

