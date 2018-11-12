$(document).ready(function() {

  function getUrlVars()
  {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      return vars;
  }

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

  var selectedSchool = getUrlVars()["school"];
  var selectedCourse = getUrlVars()["course"];
  var selectedCode = getUrlVars()["code"];
  var selectedYear = getUrlVars()["year"];
  var selectedSem = getUrlVars()["sem"];

  console.log(selectedSchool);

  // FOR POST METHOD

  if (selectedSchool == undefined){
    selectedSchool = params.school;
  }
  if (selectedCourse == undefined){
    selectedCourse = params.course;
  }
  if (selectedCode == undefined){
    selectedCode = params.code;
  }
  if (selectedYear == undefined){
    selectedYear = params.year;
  }
  if (selectedYear == undefined){
    selectedSem = params.sem;
  }

  console.log(selectedSchool, selectedCourse, selectedYear, selectedCode, selectedSem)
  var forumLink = '/forums/' + selectedSchool + '/' + selectedCourse + '/' + selectedCode
  $('#forum-link').attr('href', forumLink);

  // preload sidebar with the correct options
  for (idx in schools) {
    if (schools[idx] == selectedSchool){
      var schoolOption = `<option selected>` + schools[idx] + `</option>`;
      $("#schoolOption").append(schoolOption);
    } else {
      var schoolOption = `<option>` + schools[idx] + `</option>`;
      $("#schoolOption").append(schoolOption);
    }
  }
  var currentSchoolCourse = courses[selectedSchool];

  for (idx in currentSchoolCourse){
    if(currentSchoolCourse[idx] == selectedCourse){
      var courseOption = `<option selected>`+ currentSchoolCourse[idx] + `</option>`;
      $("#courseOption").append(courseOption);
    } else {
      var courseOption = `<option>`+ currentSchoolCourse[idx] + `</option>`;
      $("#courseOption").append(courseOption);
    }
  }

  $.get("/api/modules?course=" + selectedCourse, function(data, status){
    console.log(data);
    $('#modules').empty();
    var template = `<option disabled selected>Select your module</option>`
    $('#modules').append(template);
    data.modules.forEach((module) => {
      if (module.code == selectedCode){
        var template = `<option selected value=` + module.code + `>` + module.code + ` - `+ module.name + `</option>`
        $('#moduleOption').append(template);
      } else {
        var template = `<option value=` + module.code + `>` + module.code + ` - `+ module.name + `</option>`
        $('#moduleOption').append(template);
      }

    });
  });


  // var currentSchoolCourse = courses[selectedSchool];

  for (idx in year){
    if(year[idx] == selectedYear){
      var yearOption = `<option selected>`+ year[idx] + `</option>`;
      $("#yearOption").append(yearOption);
    } else {
      var yearOption = `<option>`+ year[idx] + `</option>`;
      $("#yearOption").append(yearOption);
    }
  }

  for (idx in sem){
    if(sem[idx] == selectedSem){
      var semOption = `<option selected>`+ sem[idx] + `</option>`;
      $("#semOption").append(semOption);
    } else {
      var semOption = `<option>`+ sem[idx] + `</option>`;
      $("#semOption").append(semOption);
    }
  }

  $('#schoolOption').change(function() {
    var newSchool = $('#schoolOption').val();
    console.log(newSchool);

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
  });





});
