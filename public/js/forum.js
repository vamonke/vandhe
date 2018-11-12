$(document).ready(function() {


  var schools = ['SCBE', 'MAE', 'NBS', 'ADM', 'SCSE', 'MSE', 'SPMS', 'HSS', 'EEE'];

  var courses = {
    'EEE': ['EEE', 'IEM']
  }

  var year = [ 2015, 2016, 2017, 2018];
  var sem = [1, 2];

  var params = window.location.pathname.split('/');

  // get the school, course and code
  var school = params[2];
  var course = params[3];
  var code = params[4];


  // preload sidebar with the correct options
  for (idx in schools) {
    if (schools[idx] == school){
      var schoolOption = `<option selected>` + schools[idx] + `</option>`;
      $("#schoolOption").append(schoolOption);
    } else {
      var schoolOption = `<option>` + schools[idx] + `</option>`;
      $("#schoolOption").append(schoolOption);
    }
  }
  var currentSchoolCourse = courses[school];

  for (idx in currentSchoolCourse){
    if(currentSchoolCourse[idx] == course){
      var courseOption = `<option selected>`+ currentSchoolCourse[idx] + `</option>`;
      $("#courseOption").append(courseOption);
    } else {
      var courseOption = `<option>`+ currentSchoolCourse[idx] + `</option>`;
      $("#courseOption").append(courseOption);
    }
  }

  $.get("/api/modules?course=" + course, function(data, status){
    console.log(data);
    $('#modules').empty();
    var template = `<option disabled selected>Select your module</option>`
    $('#modules').append(template);
    data.modules.forEach((module) => {
      if (module.code == code){
        var template = `<option selected value=` + module.code + `>` + module.code + ` - `+ module.name + `</option>`
        $('#moduleOption').append(template);
      } else {
        var template = `<option value=` + module.code + `>` + module.code + ` - `+ module.name + `</option>`
        $('#moduleOption').append(template);
      }

    });
  });


  $('#schoolOption').change(function() {
    var newSchool = $('#schoolOption').val();
    console.log(newSchool);
    // $('a.target').attr('href', newurl);
  });

  


});
