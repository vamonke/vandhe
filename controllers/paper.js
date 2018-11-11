const Module = require('../models/Module');
const Paper = require('../models/Paper');
const Question = require('../models/Question');

/**
 * GET /paper
 * Get paper by course code, year and semester, and its questions
 */
exports.getPaperByCodeYearSem = async (req, res) => {
  const code = req.query.code.toUpperCase();
  const year = req.query.year;
  const semester = req.query.sem;
  const mod = await Module.findOne({ code });
  const paper = await Paper.findOne({ year, semester, module_id: mod._id });
  if (paper == null){
    res.render('papers/paper', {

    });
  }
  const questions = await Question.find({ paper_id: paper._id });
  res.render('papers/paper', {
    paper: JSON.stringify(paper),
    questions: questions
  });
};
