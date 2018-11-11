const AnswerVote = require('../models/AnswerVote');

/**
 * POST /api/answer/vote
 * Voting of answer by user
 * value: 1 for upvote, 0 for unvote, -1 for downvote
 */
exports.vote = async (req, res) => {
  let selector = {
    user_id: req.body.user_id,
    answer_id: req.body.answer_id
  };
  const value = parseInt(req.body.value);
  if (value === 0) {
    await AnswerVote.remove(selector);
  } else if (value === 1 || value === -1) {
    await AnswerVote.updateOne(selector, { value }, { upsert: true });
  }
  return res.status(204).end();
};
