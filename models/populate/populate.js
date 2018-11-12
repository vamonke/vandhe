const fs = require('fs');
const path = require('path');

const Module = require('../Module');
const Paper = require('../Paper');
const Question = require('../Question');
const User = require('../User');
const Answer = require('../Answer');
const Vote = require('../Vote');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true
});

let fileName = 'IM1004.json';

let raw = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
let moduleData = JSON.parse(raw);
// console.log(moduleData);

// GET THE COURSE CODE
let courseCode = moduleData["code"];

// GET THE PAPERS
let papers = moduleData["papers"];

for (i in papers){

  let paper = papers[i];

  // GET PAPER INFO
  let year = paper['year'];
  let sem = paper['sem'];
  let questions = paper['questions'];

  for (j in questions){
    let question = questions[j];

    // GET questionNo
    let number = question['questionNo'];
    let parts = question.parts;

    for (k in parts){
      let part = parts[k]['questionNo'];
      let text = parts[k]['text'];
    }

  }
}
