const Module = require('../models/Module');
const Thread = require('../models/Thread');
const Reply = require('../models/Reply');
const Vote = require('../models/Vote');

const moment = require('moment');

async function getThreadReplyCounts(thread_ids) {
  const counts = await Reply.aggregate([
    { $match: {
      thread_id: { $in: thread_ids }
    }},
    { $project: {
      createdAt: 1,
      thread_id: 1
    }},
    { $group: {
      _id: '$thread_id',
      replyCount: { $sum: 1 },
      lastReplied: { $max: '$createdAt' }
    }}
  ]);
  return counts;
}

exports.getForumThreads = async (req, res) => {
  const code = req.params.code.toUpperCase();
  const mod = await Module.findOne({ code });
  // const module_id = mod._id;
  if (!mod) {
    return res.render('forums/forum', {});
  }
  let threads = await Thread.find({ module: code });
  let thread_ids = threads.map(thread => thread._id);
  let replyCounts = await getThreadReplyCounts(thread_ids);
  thread_ids = thread_ids.map(id => id.toString());

  const voteCounts = await Vote.aggregate([
    { $match: {
      post_id: { $in: thread_ids }
    }},
    { $project: {
      post_id: 1,
      value: 1,
      user_id: 1,
    }},
    { $group: {
      _id: '$post_id',
      voteCount: { $sum: '$value' },
    }}
  ]);
  // console.log(voteCounts);

  // Find user votes
  let userVotes = [];
  if (req.user) {
    userVotes = await Vote.aggregate([
      { $match: {
        post_id: { $in: thread_ids },
        user_id: { $eq: req.user._id }
      }},
      { $project: {
        _id: 0,
        post_id: 1,
        value: 1,
      }}
    ]);
    // console.log(userVotes);
  }

  threads = threads.map(thread => {
    let threadObj = thread.toObject();
    
    // Add vote count
    const threadVoteCount = voteCounts.find(vote =>
      (vote._id.toString() == threadObj._id.toString())
    );
    // console.log(threadVoteCount);
    threadObj.votes = threadVoteCount ? threadVoteCount.voteCount : 0;
    
    // Add thread user vote
    const threadUserVote = userVotes.find(userVote =>
      (userVote.post_id.toString() == threadObj._id)
    );
    threadObj.userVote = threadUserVote ? threadUserVote.value : 0;

    // Add reply count
    const replyCountObj = replyCounts.find(count =>
      count._id.toString() == threadObj._id);
    if (replyCountObj) {
      threadObj.replyCount = replyCountObj.replyCount;
      const lastReplied = moment(replyCountObj.lastReplied).fromNow();
      threadObj.lastReplied = lastReplied;
    } else {
      const createdAt = moment(threadObj.createdAt).fromNow();
      threadObj.createdAt = createdAt;
    }
    return threadObj;
  });
  // console.log(threads);
  res.render('forums/forum', {
    mod: mod,
    threads: threads,
    params: req.params,
  });
};

exports.getThread = async (req, res) => {
  const thread_id = req.params.thread_id;
  let thread = await Thread.findById(thread_id).populate('user_id', '_id email profile').exec();

  // Convert MongoDB document to JSON object
  thread = thread.toObject();

  let replies = await Reply
    .find({ thread_id })
    .populate('user_id', '_id email profile')
    .exec();

  let post_ids = replies.map(ans => ans._id.toString());
  post_ids.push(thread_id);

  const voteCounts = await Vote.aggregate([
    { $match: {
      post_id: { $in: post_ids }
    }},
    { $project: {
      post_id: 1,
      value: 1,
      user_id: 1,
    }},
    { $group: {
      _id: '$post_id',
      voteCount: { $sum: '$value' },
    }}
  ]);

  let userVotes = [];
  post_ids.push(thread_id);

  if (req.user) {
    userVotes = await Vote.aggregate([
      { $match: {
        post_id: { $in: post_ids },
        user_id: { $eq: req.user._id }
      }},
      { $project: {
        _id: 0,
        post_id: 1,
        value: 1,
      }}
    ]);
  }

  // Add thread user vote
  const threadUserVote = userVotes.find(userVote =>
    (userVote.post_id.toString() == thread_id)
  );
  thread.userVote = threadUserVote ? threadUserVote.value : 0;
  thread.createdAt = moment(thread.createdAt).fromNow();


  const threadVoteCount = voteCounts.find(vote =>
    (vote._id.toString() == thread._id.toString())
  );
  thread.votes = threadVoteCount ? threadVoteCount.voteCount : 0;


  replies = replies.map((reply) => {
    // Convert MongoDB document to JSON object
    replyObj = reply.toObject();

    // Add vote count
    const replyVote = voteCounts.find(vote =>
      (vote._id.toString() == replyObj._id.toString())
    );
    replyObj.votes = replyVote ? replyVote.voteCount : 0;

    // Add user vote
    const userVote = userVotes.find(vote =>
      (vote.post_id.toString() == replyObj._id.toString())
    );
    replyObj.userVote = userVote ? userVote.value : 0;

    // Parse date
    replyObj.createdAt = moment(replyObj.createdAt).fromNow();

    return replyObj;
  });
  res.render('thread/thread', {
    render: 'thread',
    thread: thread,
    replies: replies.sort((a,b) => b.votes - a.votes),
  });
}

exports.reply = async (req, res) => {
  const newReply = {
    text: req.body.text,
    thread_id:  req.body.thread_id,
    user_id: req.user._id.toString()
  }
  let reply = await Reply.create(newReply);
  reply = reply.toObject();
  reply.user = req.user;
  reply.createdAt = moment(reply.createdAt).fromNow();
  res.json(reply);
}

exports.getQuestionForm = async (req, res) => {
  res.render('forums/forum', {
    render: 'forum ask',
    params: req.params
  });
}

exports.createThread = async (req, res, next) => {

  const thread = new Thread({
    title: req.body.title,
    description: req.body.description,
    module: req.body.module,
    user_id: req.body.user_id
  })

  thread.save((err, newthread) => {
    if (err) { return next(err); }
    // console.log()
    res.redirect(req.body.redirect + '/' + newthread._id);
  })

}
