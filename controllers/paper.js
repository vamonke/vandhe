const Module = require('../models/Module');
const Paper = require('../models/Paper');
const Question = require('../models/Question');
const QuestionPart = require('../models/QuestionPart');
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
  let questions = await Question.find({ paper_id: paper._id }).exec();

  let newQuestionsObject = questions.map((question) => {
    return JSON.parse(JSON.stringify(question))
  });
  for (let question of newQuestionsObject){
    question['questionParts'] = await QuestionPart.find({ parent_id: question._id });
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
