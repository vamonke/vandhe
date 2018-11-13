function appendNewAnswer(newAnswer, status, xhr) {
  $('#answer-text').val('');
  $('#answer-text').html('');
  console.log(newAnswer);
  const gravatar = $('img').last().attr('src');
  console.log(gravatar);
  const user = ((newAnswer.user.profile && newAnswer.user.profile.name) || newAnswer.user.email);
  $('.answers-container')
    .append(
      $('<div style="display: none;"></div>')
      .addClass("answer-card")
      .append($('<div></div>').addClass("votes").attr({ 'data-user-vote': 0, 'data-post-id': newAnswer._id })
        .append($('<a></a>').addClass("upvote").text('▲'))
        .append($('<h1></h1>').text('0'))
        .append($('<a></a>').addClass("downvote").text('▼')))
      .append($('<p></p>').text(newAnswer.text))
      .append($('<div></div>').addClass("details")
        .append($('<img></img>').addClass("answer-gravatar").attr({ src: gravatar }))
        .append($('<span></span>').text(user + ' | ' + newAnswer.createdAt))));
  $('.answers-container').children("div:last").slideDown("fast");
  $('.upvote, .downvote').click(postVote);
}

$(document).ready(function() {
  $('#submit-answer').click(function() {
    $this = $(this);
    let formData = {};
    let type;
    $this.parents('form').serializeArray().forEach(function(input) {
      // console.log(input);
      if (input.name == 'question_id') {
        type = 'answer';
      } else if (input.name == 'thread_id') {
        type = 'reply';
      }
      formData[input.name] = input.value;
    });

    if (!formData.text) {
      console.log("Text field is empty");
      return;
    }
    // console.log(formData);

    $.ajax({
      type: "POST",
      url: "/api/" + type,
      data: formData,
      success: appendNewAnswer,
      dataType: 'json'
    });
  });
});
