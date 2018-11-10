
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
    }
  };


  res.render('papers/paper', {
    paper: JSON.stringify(hardCodedPaper)
  });
  // res.json();
};
