$('.btn-approve').click(function(event){
  console.log(this.id);


  $.ajax({
    method: "PUT",
    url: "/api/answer",
    data: { "id": this.id }
  })
  .done(function( msg ) {
    window.location.reload()
  });
});
