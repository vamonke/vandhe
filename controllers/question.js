
/**
 * GET /question
 * Get question by id.
 */
exports.getQuestionById = (req, res) => {
  const questionId = req.params.questionId;
  const hardCodedQuestion = {
    id: questionId,
    questionNo: '1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    paper_id: 'paper1',
    user: {
      id: 'user1',
      name: 'User 1'
    }
  };
  res.render('question/question', { question: hardCodedQuestion});
};
