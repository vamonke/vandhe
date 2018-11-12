exports.getForumQuestions = async (req, res) => {

  const questions = [{
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id bibendum justo. Integer in augue sed tellus consectetur rhoncus. Fusce euismod, nisl vitae auctor scelerisque, tellus diam lobortis sem, ac bibendum nulla dui id tortor. Aliquam sodales ligula in metus blandit, ac dictum massa dapibus. Maecenas suscipit placerat nulla, quis tempus purus egestas in. Donec at ante dapibus nisl porta rutrum. Proin quis ipsum eget dui facilisis mollis vel in dolor."
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id bibendum justo. Integer in augue sed tellus consectetur rhoncus. Fusce euismod, nisl vitae auctor scelerisque, tellus diam lobortis sem, ac bibendum nulla dui id tortor. Aliquam sodales ligula in metus blandit, ac dictum massa dapibus. Maecenas suscipit placerat nulla, quis tempus purus egestas in. Donec at ante dapibus nisl porta rutrum. Proin quis ipsum eget dui facilisis mollis vel in dolor."
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id bibendum justo. Integer in augue sed tellus consectetur rhoncus. Fusce euismod, nisl vitae auctor scelerisque, tellus diam lobortis sem, ac bibendum nulla dui id tortor. Aliquam sodales ligula in metus blandit, ac dictum massa dapibus. Maecenas suscipit placerat nulla, quis tempus purus egestas in. Donec at ante dapibus nisl porta rutrum. Proin quis ipsum eget dui facilisis mollis vel in dolor."
  },
  {
    id: 4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id bibendum justo. Integer in augue sed tellus consectetur rhoncus. Fusce euismod, nisl vitae auctor scelerisque, tellus diam lobortis sem, ac bibendum nulla dui id tortor. Aliquam sodales ligula in metus blandit, ac dictum massa dapibus. Maecenas suscipit placerat nulla, quis tempus purus egestas in. Donec at ante dapibus nisl porta rutrum. Proin quis ipsum eget dui facilisis mollis vel in dolor."
  }]
  res.render('forums/forum', {
    questions: questions,
  });
};
