App.controller('courses', function (page) {
	// if (localStorage.getItem("courses") == null) {
	// 	localStorage.setItem("courses", JSON.stringify(courses));
	// }
	var courses = JSON.parse(localStorage.getItem("courses"));
	console.log(courses);

	var coursesList = $(page).find("#coursesList");
	var text = "";
	for (var i = 0; i < courses.length; i++) {
		text += '<li class="app-button courseInfoButton" data-course="' + courses[i][0] + '">';
		text += courses[i][0] + " - ";
		text += courses[i][1] + "";
		text += '</li>';
	}


	coursesList.html(text);
    $(page).find(".courseInfoButton").on("click", function() {
      	localStorage.setItem("currentCourse", $(this).data("course"));
      	App.load('courseInfo', 'fade');
  	});

  	$(page).find('#deleteAllInfo').on('click', function () {
		App.dialog({
				title        : 'Desea eliminar todos los cursos y eventos?',
				okButton     : 'Si, eliminar',
				cancelButton : 'No, cancelar'
			}, function (choice) {
				if (choice == 'ok') {
					localStorage.setItem("semester", "2017-2");
					localStorage.setItem("courses", JSON.stringify([]));
					localStorage.setItem("currentCourse", "");
					localStorage.setItem("events", JSON.stringify([]));
					localStorage.setItem("currentEvent", "");
					console.log(choice);
		     		App.load('calendar', 'fade');
				}
		});
	});

});