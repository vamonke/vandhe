const lorem_ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

/**
 * GET /answers/:questionId
 * Get answers by question id.
 */
exports.getAnswersByQuestionId = (req, res) => {
  const questionId = req.params.questionId;
  const hardCodedAnswers = [{
    id: 'answer_id1',
    text: lorem_ipsum,
    votes: 24,
    user: {
      name: 'name1',
      id: 'user_id1'
    },
    questionId: questionId
  }, {
    id: 'answer_id2',
    text: lorem_ipsum,
    votes: 24,
    user: {
      name: 'name2',
      id: 'user_id2'
    },
    questionId: questionId
  }, {
    id: 'answer_id3',
    text: lorem_ipsum,
    votes: 24,
    user: {
      name: 'name3',
      id: 'user_id3'
    },
    questionId: questionId
  }];
  res.json({ answers: hardCodedAnswers });
};