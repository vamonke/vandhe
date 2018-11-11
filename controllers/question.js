const Question = require('../models/Question');
const Answer = require('../models/Answer');

/**
 * GET /questions/:questionId
 * Get question by id and its answers
 */
exports.getQuestionById = async (req, res) => {
  const question_id = req.params.questionId;
  const question = await Question.findById(question_id);
  const answers = await Answer.find({ question_id });
  res.render('question/question', {
    question: question,
    answers: answers
  });
};
