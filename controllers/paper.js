
/**
 * GET /paper
 * Get paper by course code, year and semester.
 */
exports.getPaperByCodeYearSem = (req, res) => {
  // Paper
  const code = req.params.code;
  const year = req.params.year;
  const sem = req.params.sem;

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
  res.json({ paper: hardCodedPaper});
};