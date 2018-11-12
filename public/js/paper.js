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
    'EEE': ['EEE', 'IEM']
  }

  var year = [ 2015, 2016, 2017, 2018];
  var sem = [1, 2];
  var selectedSchool = getUrlVars()["school"];
  var selectedCourse = getUrlVars()["course"];
  var selectedCode = getUrlVars()["code"];
  var selectedYear = getUrlVars()["year"];
  var selectedSem = getUrlVars()["sem"];

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


});
