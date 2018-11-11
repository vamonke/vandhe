const Answer = require('../models/Answer');

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