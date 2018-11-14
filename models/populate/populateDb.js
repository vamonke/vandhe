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
mongoose.connect('mongodb://vandhe:vandhe123@ds163013.mlab.com:63013/heroku_dwnhstmt', { useNewUrlParser: true });

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
  { questionNo: 1, text: "EBIDS (Electronics Bidding System) is an Internet-based vendor list and online bidding system. It maintains a database for online Request for Tender (RFT) and Interest to Bid (ITB) registration. Both vendors and suppliers wishing to participate are required to register onto the EBIDS system. How would you code out this registration process?"},
  { questionNo: 2, text: "Code a navigation bar which is located at the upper half of the left column, which consists of a few 150x40 pixels image buttons, i.e. image links to other parts of the website." },
  { questionNo: 3, text: "In order to track all records of tenders awarded it's is neccessary to update all successful bids on the corresponding records of RFTs. Write object-oriented MySQL queries in PHP script to update lowerest cost bid." },
  { questionNo: 4, text: "Indicate the primary key in each of the database tables and any foreign key, where neccessary, to minimize data redundancy. Highlight the primary keys with double underline and foreign keys with single underline"}
];

const answers = [
  { text: lorem_ipsum },
  { text: lorem_ipsum },
  { text: lorem_ipsum }
];

const threads = [
  { title: 'Use Atom To record my notes', description: "I was wondering if there is a way to program Atom to record my keystrokes in the background as I make notes in other Applications. I am extremely new to all of this, Thanks!"},
  { title: 'What Framework you are using to style your Electron app', description: "There are many Frameworks out there to create Single Page Applicatons, React, Vue, Angular are the most popular. But what Framework works best in combination with Electron? Is there trick to style the electron app fast and give the app a native look, or is using Frameworks like this the best method? Thanks" },
  { title: 'Custom text color with different encoding', description: "The problem is that the encoding that I am using is ISO 8859-7, Greek language and doesn’t change the color even if I set a regex for encoding in the .cson file ( similar to this \uFFFF) .What am I missing here?" }
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
