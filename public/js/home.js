$(document).ready(function() {
  $.get("/api/modules?course=IEM", function(data, status){
    console.log(data);
    $('#modules').empty();
    var template = `<option disabled selected>Select your module</option>`
    $('#modules').append(template);
    data.modules.forEach((module) => {
      var template = `<option value=` + module.code + `>` + module.code + ` - `+ module.name + `</option>`
      $('#modules').append(template);
    });
  });

});
