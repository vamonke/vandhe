const Module = require('../Module');
const Paper = require('../Paper');
const Question = require('../Question');
const QuestionPart = require('../QuestionPart');
const User = require('../User');
const Answer = require('../Answer');
const Vote = require('../Vote');

const mongoose = require('mongoose');

// console.log('Connecting to MongoDB..');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const lorem_ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const modules = [
  { code: 'IM4717', name: 'Web Application Design', course: 'IEM' },
  { code: 'IM4791', name: 'Database Systems', course: 'IEM' },
  { code: 'IM4483', name: 'Artificial Intelligence and Data Mining', course: 'IEM' },
  { code: 'EE4483', name: 'Artificial Intelligence and Data Mining', course: 'EEE' },
];

const papers = [
  { year: 2016, semester: 1 },
  { year: 2016, semester: 2 },
  { year: 2017, semester: 1 },
  { year: 2017, semester: 2 }
];

const questions = [
  { questionNo: 1, text: lorem_ipsum },
  { questionNo: 2, text: lorem_ipsum },
  { questionNo: 3, text: lorem_ipsum },
  { questionNo: 4, text: lorem_ipsum }
];

const answers = [
  { text: lorem_ipsum + '1' },
  { text: lorem_ipsum + '2' },
  { text: lorem_ipsum + '3' }
]

async function populateTable(model, data, tableName, parent) {
  // await model.remove(); // Empties the table
  const promises = data.map(function(doc) {
    Object.assign(doc, parent);
    return model.findOneAndUpdate(doc, doc, { upsert: true, new: true });
  });
  let created = await Promise.all(promises);
  console.log('Inserted/updated: ' + created.length + ' ' + tableName);
  return created[0].id;
}

async function populateDb() {
  const module_id = await populateTable(Module, modules, 'Modules');
  const paper_id = await populateTable(Paper, papers, 'Papers', { module_id });
  const question_id = await populateTable(Question, questions, 'Questions', { paper_id });
  const randomUser = await User.findOne();
  await populateTable(Answer, answers, 'Answers', { question_id, user_id: randomUser.id });
  // await Vote.deleteMany();
  // console.log('Disconnecting from MongoDB..');
  // mongoose.disconnect();
}

async function addCourseFromJSON() {
  await populateDb();
  const courseObj = require('./IM1004.json');
  const newModule = (({ code, name, course }) => ({ code, name, course }))(courseObj);
  const module_id = await populateTable(Module, [newModule], 'Modules');

  for (const paper of courseObj.papers) {
    const newPaper = (({ year, semester }) => ({ year, semester }))(paper);
    const paper_id = await populateTable(Paper, [newPaper], 'Papers', { module_id });
    for (const question of paper.questions) {
      const newQuestion = (({ questionNo, text, figure }) => ({ questionNo, text, figure }))(question);
      const parent_id = await populateTable(Question, [newQuestion], 'Questions', { paper_id });
      for (const questionPart of question.parts) {
        const newQuestionPart = (({ questionNo, text, figure }) => ({ questionNo, text, figure }))(questionPart);
        console.log(newQuestionPart.figure);
        await populateTable(QuestionPart, [newQuestionPart], 'Question parts', { parent_id });
      }
    }
  }

  mongoose.disconnect();
}

addCourseFromJSON();
