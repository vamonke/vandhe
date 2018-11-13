const Module = require('../models/Module');
const Paper = require('../models/Paper');
const Question = require('../models/Question');
const QuestionPart = require('../models/QuestionPart');
// const Answer = require('../models/Answer');

/**
 * GET /paper
 * Get paper by course code, year and semester, and its questions
 */
exports.getPaperLong = async (req, res) => {
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
    question['questionParts'] = await QuestionPart.find({ parent_id: question._id });
  }

  res.render('papers/paper-long', {
    render: 'questions',
    paper: JSON.stringify(paper),
    questions: newQuestionsObject,
    params: req.query
  })
};

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

// function getEverything(paper) {
//   paper = paper.toObject();
//   const paper_id = paper._id;
//   return Question.find({ paper_id }).sort('questionNo').then(qns => {
//     return Promise.all(qns.map(qn => {
//       return QuestionPart.find({ parent_id: qn._id }).sort('questionNo').then(parts => {
//         return Promise.all(parts.map(part => {
//           return Answer.find({ question_id: part._id }).then(answers => {
//             return Promise.all(answers.map(ans => {
//               return Vote.find({ post_id: ans._id }).then(votes => {
//                 ans = ans.toObject();
//                 ans.votes = votes ? votes.length : 0;
//                 return ans;
//               });
//             })).then((answers) => {
//               // console.log(answers);
//               part = part.toObject();
//               part.answers = answers;
//               return part;
//             });
//           })
//         })).then((parts) => {
//           // console.log(parts);
//           qn = qn.toObject();
//           qn.parts = parts;
//           return qn;
//         });
//       })
//     })).then((qns) => {
//       // console.log(qns);
//       paper.questions = qns;
//       return paper;
//     });
//   });
// }