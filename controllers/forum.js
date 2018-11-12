const Module = require('../models/Module');
const Paper = require('../models/Paper');
const Question = require('../models/Question');
exports.getForumQuestions = async (req, res) => {

  const code = req.params.code.toUpperCase();
  req.params.year = 2016;
  req.params.sem = 1;
  const year = 2016;
  const semester = 1;
  const mod = await Module.findOne({ code });
  const paper = await Paper.findOne({ year, semester, module_id: mod._id });
  if (paper == null){
    res.render('forums/forum', {

    });
  }
  const questions = await Question.find({ paper_id: paper._id });
  res.render('forums/forum', {
    render: 'forum',
    paper: JSON.stringify(paper),
    questions: questions,
    params: req.params,
  });


};
