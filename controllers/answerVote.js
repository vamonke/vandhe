const AnswerVote = require('../models/AnswerVote');

/**
 * POST /api/answer/toggleVote
 * Voting of answer by user
 */
exports.vote = async (req, res) => {
  let selector = {
    user_id: req.user._id,
    answer_id: req.body.answer_id,
  };
  // console.log(selector);
  const value = parseInt(req.body.value);
  let answerVote = await AnswerVote.findOne(selector);
  let result = null;
  if (answerVote) {
    if (answerVote.value === value) {
      await answerVote.remove();
      result = { value: 0 };
    } else {
      answerVote.value = value;
      await answerVote.save();
      result = { value };
    }
  } else {
    await AnswerVote.create(Object.assign(selector, { value }));
    result = { value };
  }
  res.send(result);
};
