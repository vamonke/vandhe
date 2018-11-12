const Vote = require('../models/Vote');

/**
 * POST /api/vote/toggleVote
 * Voting of question/answer by user
 */
exports.toggleVote = async (req, res) => {
  let selector = {
    user_id: req.user._id,
    post_id: req.body.post_id,
  };
  // console.log(selector);
  const value = parseInt(req.body.value);
  let vote = await Vote.findOne(selector);
  let result = null;
  if (vote) {
    if (vote.value === value) {
      await vote.remove();
      result = { value: 0 };
    } else {
      vote.value = value;
      await vote.save();
      result = { value };
    }
  } else {
    await Vote.create(Object.assign(selector, { value }));
    result = { value };
  }
  res.send(result);
};
