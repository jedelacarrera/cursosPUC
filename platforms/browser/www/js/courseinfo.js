App.controller('courseInfo', function (page) {
	if (localStorage.getItem("currentCourse") == "") {
		console.log('no currentCourse');
		App.load("courses", 'fade');
	}

	var currentCourse = localStorage.getItem("currentCourse");
	var courses = JSON.parse(localStorage.getItem("courses"));

	for (var i = courses.length - 1; i >= 0; i--) {
		if (courses[i][0] == currentCourse) {
			$(page).find("#courseSigla").html("Sigla: " + currentCourse);
			$(page).find("#courseSection").html("Seccion: " + courses[i][4]);
			$(page).find("#courseName").html("Nombre: " + courses[i][1]);
			$(page).find("#courseTeacher").html("Profesor: " + courses[i][2]);

			var text = "<label>Horario</label>";
			for (var j = 0; j < courses[i][3].length; j++) {
				var module = courses[i][3][j][1] + "-" + courses[i][3][j][0] + ": " + courses[i][3][j][2] + " en " + courses[i][3][j][3];
				text += '<li>' + module + '</li>';
			}


			$(page).find("#courseModules").html(text);

		}
	}
	var events = JSON.parse(localStorage.getItem("events"));

	var eventsListItem = $(page).find("#courseEventsList");
	var text = "<label>Eventos</label>";
	for (var i = 0; i < events.length; i++) {
		if (events[i][1] == currentCourse) {
			// console.log('entro');
			text += '<li class="app-button eventEditButton" data-event="' + events[i][0] + '">';
			text += events[i][2] + ": ";
			text += events[i][3];
			text += '</li>';
		}
	}

	eventsListItem.html(text);

	$(page).find(".eventEditButton").on("click", function() {
      	localStorage.setItem("currentEvent", $(this).data("event"));
      	App.load('eventEdit');

      });


	$(page).find("#newCourseEventButton").on("click", function() {
      	localStorage.setItem("currentEvent", "");
      	App.load('eventEdit');

      });

	$(page).find('#deleteCourse').on('click', function () {
		App.dialog({
				title        : 'Desea eliminar curso?',
				okButton     : 'Si, eliminar',
				cancelButton : 'No, cancelar'
			}, function (choice) {
				if (choice == 'ok') {
					var index = -1;
					for (var i = 0; i < courses.length ; i++) {
						if (courses[i][0] == currentCourse) {
							index = i;
						}
					}
					if (index >= 0) {
						courses.splice(index, 1);
						localStorage.setItem("courses", JSON.stringify(courses));
					}
		     		App.load('courses', 'fade');
				}
				console.log(choice);
		});
	});
});