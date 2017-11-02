App.controller('calendar', function (page) {

	$(page).find("#semester").html(localStorage.getItem("semester"));
	$(page).find("#semester").on('click', function () {
		App.load('semester', 'fade');
	})

	var courses = new Array();
	if (localStorage.getItem("courses") !== null) {
		courses = JSON.parse(localStorage.getItem("courses"));
	}
	// course = []

	// $(page).find('#courseOptions').html("");
	// $(page).find('#courseOptions').hide();


	// course["id"] = "IIC2333";
	// course["name"] = "SO y redes";
	// course["teacher"] = "cruz";

	// var m1 = []
	// course["schedule"] = 

	// courses = [["IIC2333", "SO y redes", "cruz", [[0, "L", "catedra", "A6"], [0, "W", "catedra", "A6"], [0, "V", "ayudantia", "C202"]]]]
	// courses.push(["IIC2613", "IA", "H.lobel", [[1, "L", "catedra", "B24"], [1, "W", "catedra", "B24"], [1, "V", "ayudantia", "B12"]]]);
	// console.log(courses);
	// localStorage.setItem("courses", JSON.stringify(courses));

	for (var i = 0; i < courses.length; i++) {
		for (var j = 0; j < courses[i][3].length; j++) {
			var module_position = courses[i][3][j][0] - 1;
			var general_module = $(page).find(".module")[module_position];
			$(general_module).find("." + courses[i][3][j][1]).html($(general_module).find("." + courses[i][3][j][1]).html() + '<div class="circle"></div>' + courses[i][0] + " <small>" + courses[i][3][j][3] + "</small>");
			if (courses[i][3][j][2] == "CLAS") {
				$($(general_module).find("." + courses[i][3][j][1])).find(".circle").toggleClass("circle-orange");
			}
			if (courses[i][3][j][2] == "AYU") {
				$($(general_module).find("." + courses[i][3][j][1])).find(".circle").toggleClass("circle-green");
			}
			if (courses[i][3][j][2] == "LAB") {
				$($(general_module).find("." + courses[i][3][j][1])).find(".circle").toggleClass("circle-blue");
			}	
		}	
	}

  $(page).find('#newCourseButton').on('click', function () {
  		var urlBuscaCursos = 'https://serene-reef-82407.herokuapp.com/?callback=response&semester=' + localStorage.getItem("semester") + '&course=' + $(page).find('#courseSearch').val();
  		console.log(urlBuscaCursos);
  		$(page).find('#courseOptions').show();
        $.ajax({
			// type: 'GET',
			url: urlBuscaCursos,
			// data to be added to query string:
			// data: { to: $("#recipient-email").val(), from: $("#sender-email").val(), subject: $("#subject").val(), content: $("#content").val()},
			// type of data we are expecting in return:
			// dataType: 'html',
			// timeout: 300,
			dataType: "jsonp",
			crossOrigin:true,
			success: function(data){
  				$(page).find('#courseOptions').show();
				// console.log(data);
				// console.log(data.length);
				var text = '<ul class="app-list">';
				for (var i = 0; i < data.length; i++) {
					text += '<li class="app-button addCourseOptionButton" data-course="' + i + '">';
					text += data[i][0] + "-" + data[i][4] + " " + data[i][1] + " " + data[i][2];
					text += '</li>';
				}
				text += "</ul>";
				$(page).find('#courseOptions').html(text);
				$(page).find('.addCourseOptionButton').on('click', function () {
					var index = $(this).data("course");

					var add = true;
					for (var j = 0; j < courses.length; j++) {
						if (courses[j][0] == data[index][0]) {
							add = false;
						}
					}
					if (add) {
						courses.push(data[index]);
						localStorage.setItem("courses", JSON.stringify(courses));
					}

					App.load('courses');
				});
			},
			error: function () {
				var text = "Error de conexion, compruebe su conexion a internet.";
				$(page).find('#courseOptions').html(text);
			}
		});
    });
});
       

// try {
//   App.restore();
// } catch (err) {
//   App.load('calendar');
// }

