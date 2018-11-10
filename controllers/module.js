const Module = require('../models/Module');

/**
 * GET /modules
 * Get modules by course.
 */
exports.getModulesByCourse = async (req, res) => {
  const course = req.query.course.toUpperCase();
  const modules = await Module.find({ course });
  res.json({ modules: modules });
};
