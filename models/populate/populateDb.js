const User = require('../User');
const Module = require('../Module');
const Paper = require('../Paper');
const Question = require('../Question');
const QuestionPart = require('../QuestionPart');
const Answer = require('../Answer');
const Vote = require('../Vote');
const Thread = require('../Thread');
const Reply = require('../Reply');

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
  { text: lorem_ipsum },
  { text: lorem_ipsum },
  { text: lorem_ipsum }
];

const threads = [
  { title: 'How do I use Regex for digits only?', description: lorem_ipsum },
  { title: 'How do I use Regex for digits only?', description: lorem_ipsum },
  { title: 'How do I use Regex for digits only?', description: lorem_ipsum }
];
const replies = JSON.parse(JSON.stringify(answers));

async function populateTable(model, data, tableName, parent) {
  const promises = data.map(function(doc) {
    Object.assign(doc, parent);
    // return model.findOneAndUpdate(doc, doc, { upsert: true, new: true });
    return model.create(doc);
  });
  let created = await Promise.all(promises);
  console.log(' + ' + created.length + ' ' + tableName);
  if (tableName == 'Modules')
    return created[0];
  else
    return created[0]._id;
}

async function populateDb() {
  // Create modules
  const mod = await populateTable(Module, modules, 'Modules');

  // Create papers, questions and answers
  const paper_id = await populateTable(Paper, papers, 'Papers', { module_id: mod._id });
  const question_id = await populateTable(Question, questions, 'Questions', { paper_id });
  const randomUser = await User.findOne();
  await populateTable(Answer, answers, 'Answers', { question_id, user_id: randomUser._id });
  
  // Create forum threads and replies
  const thread_id = await populateTable(Thread, threads, 'Threads', { module: mod.code, user_id: randomUser._id });
  await populateTable(Reply, replies, 'Replies', { thread_id, user_id: randomUser._id });
}

async function emptyTables() {
  await Module.deleteMany();
  await Paper.deleteMany();
  await Question.deleteMany();
  await QuestionPart.deleteMany();
  await Answer.deleteMany();
  await Vote.deleteMany();
  await Thread.deleteMany();
  await Reply.deleteMany();
}  

async function addCourseFromJSON() {
  console.log('Drop tables');
  await emptyTables();

  console.log('Populate lorem ipsum');
  await populateDb();

  console.log('Populate from IM1004.json');

  const courseObj = require('./IM1004.json');
  const newModule = (({ code, name, course }) => ({ code, name, course }))(courseObj);
  const mod = await populateTable(Module, [newModule], 'Modules');

  for (const paper of courseObj.papers) {
    const newPaper = (({ year, semester }) => ({ year, semester }))(paper);
    const paper_id = await populateTable(Paper, [newPaper], 'Papers', { module_id: mod._id });
    for (const question of paper.questions) {
      const newQuestion = (({ questionNo, text, figure }) => ({ questionNo, text, figure }))(question);
      const parent_id = await populateTable(Question, [newQuestion], 'Questions', { paper_id });
      for (const questionPart of question.parts) {
        const newQuestionPart = (({ questionNo, text, figure }) => ({ questionNo, text, figure }))(questionPart);
        // console.log(newQuestionPart.figure);
        await populateTable(QuestionPart, [newQuestionPart], 'Question parts', { parent_id });
      }
    }
  }

  mongoose.disconnect();
}

addCourseFromJSON();
