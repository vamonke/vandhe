const Module = require('../models/Module');
const Thread = require('../models/Thread');
const Reply = require('../models/Reply');

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
  // let replyCount = 0;
  // let lastReplied = null;
  // if (count.length) {
  //   replyCount = count[0].replyCount;
  //   lastReplied = count[0].lastReplied;
  // }
  // return { replyCount, lastReplied };
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
  const thread_ids = threads.map(thread => thread._id);
  let counts = await getThreadReplyCounts(thread_ids);
  console.log(counts);

  threads = threads.map(thread => {
    let threadObj = thread.toObject();
    const countObj = counts.find(count =>
      count._id.toString() == threadObj._id.toString());
    if (countObj) {
      console.log(countObj);
      threadObj.replyCount = countObj.replyCount;
      const lastReplied = moment(countObj.lastReplied).fromNow();
      threadObj.lastReplied = 'Last replied ' + lastReplied;
    } else {
      const createdAt = moment(threadObj.createdAt).fromNow();
      threadObj.createdAt = 'Asked ' + createdAt;
    }
    return threadObj;
  });
  console.log(threads);
  res.render('forums/forum', {
    mod: mod,
    threads: threads,
    params: req.params,
  });
};

// getThread