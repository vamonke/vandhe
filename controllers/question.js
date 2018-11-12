const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Vote = require('../models/Vote');

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

  const votes = await Vote.aggregate([
    { $match: {
      answer_id: { $in: answers.map(ans => ans._id) }
    }},
    { $project: {
      answer_id: 1,
      value: 1,
      user_id: 1,
    }},
    { $group: {
      _id: '$answer_id',
      voteCount: { $sum: '$value' },
    }}
  ]);

  let userVotes = [];
  if (req.user) {
    userVotes = await Vote.aggregate([
      { $match: {
        answer_id: { $in: answers.map(ans => ans._id) },
        user_id: { $eq: req.user._id }
      }},
      { $project: {
        _id: 0,
        answer_id: 1,
        value: 1,
      }}
    ]);
  }

  answers = answers.map((answer) => {
    // Convert MongoDB document to JSON object
    answerObj = answer.toObject();

    // Add vote count
    const vote = votes.find(vote => 
      (vote._id.toString() == answerObj._id.toString())
    );
    answerObj.votes = vote ? vote.voteCount : 0;
    
    // Add user vote
    const userVote = userVotes.find(vote =>
      (vote.answer_id.toString() == answerObj._id.toString())
    );
    answerObj.userVote = userVote ? userVote.value : 0;
    
    // Parse date
    answerObj.createdAt = moment(answerObj.createdAt).format("D MMMM YYYY");

    // console.log(answerObj);
    return answerObj;
  });
  res.render('question/question', {
    question: question,
    answers: answers.sort((a,b) => b.votes - a.votes)
  });
};
