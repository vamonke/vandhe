function postVote() {
  $votes = $(this).parent();
  const value = $(this).attr('class') === 'upvote' ? 1 : -1;
  const post_id = $votes.data('postId');
  // console.log($votes.data('userVote'));
  $.ajax({
    type: "POST",
    url: "/api/vote/toggleVote",
    data: { post_id, value },
    success: function(data, status, xhr) {
      const newUserVote = data.value;
      const oldUserVote = $votes.attr('data-user-vote');
      $votes.attr('data-user-vote', newUserVote);
      const oldVoteCount = parseInt($votes.children().eq(1).text());
      const newVoteCount = oldVoteCount - oldUserVote + newUserVote;
      console.log('New vote count: ' + newVoteCount);
      $votes.find('h1').text(newVoteCount);
    },
    dataType: 'json'
  });
};

$(document).ready(function() {
  $('.upvote, .downvote').click(postVote);
});