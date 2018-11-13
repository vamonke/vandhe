$(document).ready(function() {
    $("section[data-step]").hide();
    $("button.button-outline").hide();
    $("section[data-step=1]").show();
    $(".button-primary").hide();

    $("input[type='radio']").change(function(e) {
        $(this).addClass( "selectedRadio" );
        e.preventDefault();
        var step = $("form").data("step");
        var isValid = true;
        $("section[data-step='" + step + "'] input[required='required']").each(function(idx, elem) {
            $(elem).removeClass("error");
            if($(elem).val().trim() === "") {
                isValid = false;
                $(elem).addClass("error");
            }
        });
        if(isValid) {
            step += 1;
            if(step > $("section[data-step]").length) {
                $("form").submit(); //Submit the form to the URL in the action attribute, or you could always do something else.
            }
            console.log(step);
            $("form").data("step", step);
            $("section[data-step]").hide();
            $("section[data-step='" + step + "']").show();
            $("button.button-outline").show();
            if(step === 2){
              // $('#select-course-home').empty();
              // var courses = {
              //   'SCBE': ['CBE', 'BIE'],
              //   'MAE': ['ME', 'AERO'],
              //   'ADM': ['ART'],
              //   'SCSE': ['CS', 'CE'],
              //   'EEE': ['EEE', 'IEM'],
              //   'NBS': ['BUS', 'ACC']
              // }
              // var school = $("input[name=school]:checked").val();
              // var selectedCourses = courses[school];
              // selectedCourses.forEach((course) => {
              //   var template = `<div class="col-6"><input id="course-`+ course.toLowerCase() + `" type="radio" name="course" value="` + course + `"/>
              //   <label class="btn btn-outline-light school-button" for="course-` + course.toLowerCase() + `">`+ course +`</label></div>`;
              //   $('#select-course-home').append(template);
              // })
            }
            if(step === 3){
              $(".login-link").hide();
              $(".button-primary").show();
              console.log($("input[name=course]:checked").val());
              var course = $("input[name=course]:checked").val();
              $.get("/api/modules?course=" + course, function(data, status){
                  console.log(data);
                  $('#modules').empty();
                  var template = `<option disabled selected>Select your module</option>`
                  $('#modules').append(template);
                  data.modules.forEach((module) => {
                    var template = `<option value=` + module.code + `>` + module.code + ` - `+ module.name + `</option>`
                    $('#modules').append(template);
                  });
              });
            }
        }
    });
    $("button.button-outline").click(function(e) {
        e.preventDefault();
        var step = $("form").data("step");
        step -= 1;
        $("form").data("step", step);
        $("section[data-step]").hide();
        $("section[data-step='" + step + "']").show();
        $(".button-primary").hide();

        if(step === 1) {
            $("button.button-outline").hide();
        }

    });
    $(".fa-chevron-left").click(function(e) {
        e.preventDefault();
        var step = $("form").data("step");
        step -= 1;
        $("form").data("step", step);
        $("section[data-step]").hide();
        $("section[data-step='" + step + "']").show();
        $(".button-primary").hide();
        $(".login-link").show();

        if(step === 1) {
            $("button.button-outline").hide();
        }

    });
});
