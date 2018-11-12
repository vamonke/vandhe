const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Vote = require('../models/Vote');

const moment = require('moment');

/**
 * GET /questions/:questionId
 * Get question by id and its answers
 */
exports.getQuestionById = async (req, res) => {
  const question_id = req.query.questionId;
  let question = await Question.findById(question_id).exec();

  // Convert MongoDB document to JSON object
  question = question.toObject();

  let answers = await Answer
    .find({ question_id })
    .populate('user_id', '_id email')
    .exec();

  let post_ids = answers.map(ans => ans._id.toString());
  const answerVotes = await Vote.aggregate([
    { $match: {
      post_id: { $in: post_ids }
    }},
    { $project: {
      post_id: 1,
      value: 1,
      user_id: 1,
    }},
    { $group: {
      _id: '$post_id',
      voteCount: { $sum: '$value' },
    }}
  ]);

  let userVotes = [];
  post_ids.push(question_id);

  if (req.user) {
    userVotes = await Vote.aggregate([
      { $match: {
        post_id: { $in: post_ids },
        user_id: { $eq: req.user._id }
      }},
      { $project: {
        _id: 0,
        post_id: 1,
        value: 1,
      }}
    ]);
  }

  // Add question user vote
  const questionUserVote = userVotes.find(userVote =>
    (userVote.post_id.toString() == question_id)
  );
  question.votes = questionUserVote ? questionUserVote.value : 0;

  answers = answers.map((answer) => {
    // Convert MongoDB document to JSON object
    answerObj = answer.toObject();

    // Add vote count
    const answerVote = answerVotes.find(vote =>
      (vote._id.toString() == answerObj._id.toString())
    );
    answerObj.votes = answerVote ? answerVote.voteCount : 0;

    // Add user vote
    const userVote = userVotes.find(vote =>
      (vote.post_id.toString() == answerObj._id.toString())
    );
    answerObj.userVote = userVote ? userVote.value : 0;

    // Parse date
    answerObj.createdAt = moment(answerObj.createdAt).format("D MMMM YYYY");

    return answerObj;
  });
  res.render('question/question', {
    render: 'question',
    question: question,
    answers: answers.sort((a,b) => b.votes - a.votes)
  });
};


exports.getForumQuestionById = async (req, res) => {
  const question_id = req.query.questionId;
  let question = await Question.findById(question_id).exec();

  // Convert MongoDB document to JSON object
  question = question.toObject();

  let answers = await Answer
    .find({ question_id })
    .populate('user_id', '_id email')
    .exec();

  let post_ids = answers.map(ans => ans._id.toString());
  const answerVotes = await Vote.aggregate([
    { $match: {
      post_id: { $in: post_ids }
    }},
    { $project: {
      post_id: 1,
      value: 1,
      user_id: 1,
    }},
    { $group: {
      _id: '$post_id',
      voteCount: { $sum: '$value' },
    }}
  ]);

  let userVotes = [];
  post_ids.push(question_id);

  if (req.user) {
    userVotes = await Vote.aggregate([
      { $match: {
        post_id: { $in: post_ids },
        user_id: { $eq: req.user._id }
      }},
      { $project: {
        _id: 0,
        post_id: 1,
        value: 1,
      }}
    ]);
  }

  // Add question user vote
  const questionUserVote = userVotes.find(userVote =>
    (userVote.post_id.toString() == question_id)
  );
  question.votes = questionUserVote ? questionUserVote.value : 0;

  answers = answers.map((answer) => {
    // Convert MongoDB document to JSON object
    answerObj = answer.toObject();

    // Add vote count
    const answerVote = answerVotes.find(vote =>
      (vote._id.toString() == answerObj._id.toString())
    );
    answerObj.votes = answerVote ? answerVote.voteCount : 0;

    // Add user vote
    const userVote = userVotes.find(vote =>
      (vote.post_id.toString() == answerObj._id.toString())
    );
    answerObj.userVote = userVote ? userVote.value : 0;

    // Parse date
    answerObj.createdAt = moment(answerObj.createdAt).format("D MMMM YYYY");

    // console.log(answerObj);
    return answerObj;
  });
  res.render('forums/forum', {
    render: 'question',
    question: question,
    answers: answers.sort((a,b) => b.votes - a.votes)
  });
};
