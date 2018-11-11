const Question = require('../models/Question');
const Answer = require('../models/Answer');
const AnswerVote = require('../models/AnswerVote');

const moment = require('moment');

/**
 * GET /questions/:questionId
 * Get question by id and its answers
 */
exports.getQuestionById = async (req, res) => {
  const question_id = req.params.questionId;
  const question = await Question.findById(question_id);
  let answers = await Answer
    .find({ question_id })
    .populate('user_id', '_id email')
    .exec();

  const voteCounts = await AnswerVote.aggregate([
    { $group: {
      _id: '$answer_id',
      value: { $sum: 1 },
    }}
  ]);
  answers = answers.map((answer) => {
    // Convert MongoDB document to JSON object
    answerObj = answer.toObject();
    // Add vote count
    const voteCount = voteCounts.find(count => 
      (count._id.toString() == answerObj._id.toString())
    );
    answerObj.votes = voteCount ? voteCount.value : 0;
    // Parse date
    answerObj.createdAt = moment(answerObj.createdAt).format("D MMMM YYYY");
    return answerObj;
  });
  res.render('question/question', {
    question: question,
    answers: answers.sort((a,b) => b.votes - a.votes)
  });
};
