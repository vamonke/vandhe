function appendNewAnswer(newAnswer, status, xhr) {
  $('#answer-text').val('');
  $('#answer-text').html('');
  $('.answers-container')
    .append(
      $('<div style="display: none;"></div>')
      .addClass("answer-card")
      .attr({ 'data-user-vote': 0, 'data-answer-id': newAnswer._id })
      .append($('<div></div>').addClass("votes")
        .append($('<a></a>').addClass("upvote").text('▲'))
        .append($('<h1></h1>').text('0'))
        .append($('<a></a>').addClass("downvote").text('▼')))
      .append($('<p></p>').text(newAnswer.text))
      .append($('<div></div>')
        .addClass("details")
        .text(newAnswer.user.email + ' | ' + newAnswer.createdAt)));
  $('.answers-container').children("div:last").slideDown("fast");
  $('.upvote, .downvote').click(postVote);
}

$(document).ready(function() {
  $('#submit-answer').click(function() {
    $this = $(this);
    let formData = {};
    $this.parents('form').serializeArray().forEach(function(input) {
      // console.log(input);
      formData[input.name] = input.value;
    });

    if (!formData.text) {
      console.log("Text field is empty");
      return;
    }
    // console.log(formData);

    $.ajax({
      type: "POST",
      url: "/api/answers",
      data: formData,
      success: appendNewAnswer,
      dataType: 'json'
    });
  });
});
