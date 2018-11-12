function postVote() {
  $this = $(this);
  $answerCard = $this.parents('.answer-card');
  const value = $this.attr('class') === 'upvote' ? 1 : -1;
  const post_id = $answerCard.data('answerId');
  $.ajax({
    type: "POST",
    url: "/api/vote/toggleVote",
    data: { post_id, value },
    success: function(data, status, xhr) {
      const newUserVote = data.value;
      const oldUserVote = $answerCard.attr('data-user-vote');
      $answerCard.attr('data-user-vote', newUserVote);
      const oldVoteCount = parseInt($answerCard.find('h1').text());
      const newVoteCount = oldVoteCount - oldUserVote + newUserVote;
      console.log('New vote count: ' + newVoteCount);
      $answerCard.find('h1').text(newVoteCount);
    },
    dataType: 'json'
  });
};

$(document).ready(function() {
  $('.upvote, .downvote').click(postVote);
});