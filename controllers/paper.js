
const lorem_ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

/**
 * GET /paper
 * Get paper by course code, year and semester.
 */
exports.getPaperByCodeYearSem = (req, res) => {
  // Paper
  const code = req.query.code;
  const year = req.query.year;
  const sem = req.query.sem;
  // console.log(req.query);

  // Module
  const module_id = 'module_id1';
  const name = 'Artificial Intelligence and Data Mining';
  const school = 'School of Electrical and Electronic Engineering';

  const hardCodedPaper = {
    paper_id: 'paper_id1',
    year: year,
    semester: sem,
    module: {
      id: module_id,
      code: code,
      name: name,
      school: school,
    },
    questions: [
      {
        id: 'questionId1',
        questionNo: 1,
        text: lorem_ipsum
      },
      {
        id: 'questionId2',
        questionNo: 2,
        text: lorem_ipsum
      },
      {
        id: 'questionId3',
        questionNo: 3,
        text: lorem_ipsum
      },
      {
        id: 'questionId4',
        questionNo: 4,
        text: lorem_ipsum
      }
    ]
  };
  res.json({ paper: hardCodedPaper});
};
