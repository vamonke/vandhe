
/**
 * GET /modules/:course
 * Get modules by course.
 */
exports.getModulesByCourse = (req, res) => {
  const course = req.params.course; // e.g. IEM
  const hardCodedModules = [{
    id: 'module_id1',
    code: 'IM4717',
    name: 'Web Application Design',
    course: course
  }, {
    id: 'module_id2',
    code: 'IM4791',
    name: 'Database Systems',
    course: course
  }, {
    id: 'module_id3',
    code: 'IM4483',
    name: 'Artificial Intelligence and Data Mining',
    course: course
  }];
  res.json({ modules: hardCodedModules });
};
