
/**
 * GET /answers/:questionId
 * Get answers by question id.
 */
exports.getAnswersByQuestionId = (req, res) => {
  const questionId = req.params.questionId;
  const hardCodedAnswers = [{
    id: 'answer_id1',
    text: 'answer1',
    votes: 24,
    user: {
      name: 'name1',
      id: 'user_id1'
    },
    questionId: questionId
  }, {
    id: 'answer_id2',
    text: 'answer2',
    votes: 24,
    user: {
      name: 'name2',
      id: 'user_id2'
    },
    questionId: questionId
  }, {
    id: 'answer_id3',
    text: 'answer3',
    votes: 24,
    user: {
      name: 'name3',
      id: 'user_id3'
    },
    questionId: questionId
  }];
  res.json({ answers: hardCodedAnswers });
};