$(document).ready(function() {


  var schools = ['SCBE', 'MAE', 'NBS', 'ADM', 'SCSE', 'MSE', 'SPMS', 'HSS', 'EEE'];

  var courses = {
    'SCBE': ['CBE', 'BIE'],
    'MAE': ['ME', 'AERO'],
    'ADM': ['ART'],
    'SCSE': ['CS', 'CE'],
    'EEE': ['EEE', 'IEM'],
    'NBS': ['BUS', 'ACC']
  }

  var year = [ 2015, 2016, 2017, 2018];
  var sem = [1, 2];

  var params = window.location.pathname.split('/');

  // get the school, course and code
  var school = params[2];
  var course = params[3];
  var code = params[4];

  var toUpdate = {
    school: params[2],
    course: params[3],
    code: params[4]
  }
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

    toUpdate.school = newSchool;
    var currentSchoolCourse = courses[newSchool];
    $('#courseOption').empty();
    $('#courseOption').append(`<option disabled selected>Select Course</option>`);
    $('#moduleOption').empty();
    $('#moduleOption').append(`<option disabled selected>Select Module</option>`);
    for (idx in currentSchoolCourse){
      var courseOption = `<option>`+ currentSchoolCourse[idx] + `</option>`;
      $("#courseOption").append(courseOption);
    }
    // $('a.target').attr('href', newurl);
  });

  $('#courseOption').change(function(){
    var newCourse = $('#courseOption').val();
    toUpdate.course = newCourse;

    $('#moduleOption').empty();
    $('#moduleOption').append(`<option disabled selected>Select Module</option>`);

    $.get("/api/modules?course=" + newCourse, function(data, status){
      console.log(data);
      $('#modules').empty();
      var template = `<option disabled selected>Select your module</option>`
      $('#modules').append(template);
      data.modules.forEach((module) => {
        var template = `<option value=` + module.code + `>` + module.code + ` - `+ module.name + `</option>`
        $('#moduleOption').append(template);
      });
    });
  });

  $("#moduleOption").change(function(){
    var newModule = $('#moduleOption').val();
    toUpdate.code = newModule;
    var urlString = '/forums/' + toUpdate.school + '/' + toUpdate.course + '/' + toUpdate.code;
    $('#update-link').attr('href', urlString);

  });

  var pypUrl = '/papers?school=' + school + '&course=' + course + '&code=' + code + '&year=2016&sem=1';
  $('#pyp-link').attr('href', pypUrl);





});
