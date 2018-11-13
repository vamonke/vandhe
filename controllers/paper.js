const Module = require('../models/Module');
const Paper = require('../models/Paper');
const Question = require('../models/Question');
const QuestionPart = require('../models/QuestionPart');
const Answer = require('../models/Answer');
const Vote = require('../models/Vote');
const moment = require('moment');
/**
 * GET /paper
 * Get paper by course code, year and semester, and its questions
 */
exports.getPaperByCodeYearSem = async (req, res) => {
  const code = req.query.code.toUpperCase();
  const year = req.query.year;
  const semester = req.query.sem;
  const mod = await Module.findOne({ code });
  if (mod == null) {
    return res.render('papers/paper', {
      render: 'questions'
    });
  }
  const paper = await Paper.findOne({ year, semester, module_id: mod._id });
  if (paper == null) {
    return res.render('papers/paper', {
      render: 'questions'
    });
  }
  let questions = await Question.find({ paper_id: paper._id }).sort('questionNo').exec();

  let newQuestionsObject = questions.map((question) => {
    return JSON.parse(JSON.stringify(question))
  });
  
  for (let question of newQuestionsObject){
    let question_id = question._id;
    let answers = await Answer
      .find({ question_id })
      .populate('user_id', '_id email profile')
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
      answerObj.createdAt = moment(answerObj.createdAt).fromNow();

      return answerObj;
    });
  }

  res.render('papers/paper', {
    render: 'questions',
    paper: JSON.stringify(paper),
    questions: newQuestionsObject,
    params: req.query
  })

};


exports.postPaperByCodeYearSem = async (req, res) => {
  const code = req.body.code.toUpperCase();
  const year = req.body.year;
  const semester = req.body.sem;
  const mod = await Module.findOne({ code });
  const paper = await Paper.findOne({ year, semester, module_id: mod._id });
  if (paper == null){
    res.render('papers/paper', {
      render: 'paper'
    });
  }
  let questions = await Question.find({ paper_id: paper._id }).exec();

  let newQuestionsObject = questions.map((question) => {
    return JSON.parse(JSON.stringify(question))
  });
  for (let question of newQuestionsObject){
    question['questionParts'] = await QuestionPart.find({ parent_id: question._id });
  }


  res.render('papers/paper', {
    render: 'questionParts',
    paper: JSON.stringify(paper),
    questions: newQuestionsObject,
    params: req.body
  })

};
