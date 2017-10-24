App.controller('eventEdit', function (page) {

	var currentEvent = -1;

	$(page).find("#saveEventButton").html("Crear");

	if (localStorage.getItem("currentEvent") != "") {
		currentEvent = localStorage.getItem("currentEvent");
		$(page).find("#saveEventButton").html("Guardar");
	}

	if (localStorage.getItem("currentCourse") !== "") {
		var currentCourse = localStorage.getItem("currentCourse");
		$(page).find("#eventCourse").val(currentCourse);
	}

	var events = JSON.parse(localStorage.getItem("events"));
	// console.log("currentEvent " + currentEvent);
	// console.log(events);

	var position = -1;

	for (var i = 0; i < events.length; i++) {
		if (events[i][0] == currentEvent) {
			position = i;
			console.log("found event" + i);
			$(page).find("#eventCourse").val(events[i][1]);
			$(page).find("#eventDate").val(events[i][2]);
			$(page).find("#eventName").val(events[i][3]);
			$(page).find("#eventDescription").val(events[i][4]);
		}
	}
	$(page).find("#eventBackButton").on("click", function() {
		if (localStorage.getItem("currentCourse") != "") {
			App.load('courseInfo', 'fade');
		} else {
			App.load('events', 'fade');
		}
	});

	$(page).find("#saveEventButton").on("click", function() {
      	localStorage.setItem("currentEvent", "");
      	if ($(page).find("#eventCourse").val() == "" || $(page).find("#eventDate").val() == "" ||
      		$(page).find("#eventName").val() == "") {
      		console.log('missing arguments');
      		return;
      	}
      	if (position >= 0) {
      		console.log('updating');
      		events[position][1] = $(page).find("#eventCourse").val().toUpperCase();
			events[position][2] = $(page).find("#eventDate").val();
			events[position][3] = $(page).find("#eventName").val();
			events[position][4] = $(page).find("#eventDescription").val();
      	} else {
      		var event = new Array();
      		console.log('creating');
      		if (events.length > 0) {
				event[0] = events[events.length - 1][0] + 1;
      		} else {
      			event[0] = 0;
      		}
			event[1] = $(page).find("#eventCourse").val();
			event[2] = $(page).find("#eventDate").val();
			event[3] = $(page).find("#eventName").val();
			event[4] = $(page).find("#eventDescription").val();
			currentEvent = event[0];
			position = events.length;
			console.log(event);
			events.push(event);
      	}
      	// console.log(events);
		localStorage.setItem("events", JSON.stringify(events));
		$(page).find("#saveEventButton").html("Guardar");

	});

	$(page).find('#deleteEvent').on('click', function () {

		App.dialog({
				title        : 'Desea eliminar el evento?',
				okButton     : 'Si, eliminar',
				cancelButton : 'No, cancelar'
			}, function (choice) {
				if (choice == 'ok') {
					var index = -1;
					for (var i = 0; i < events.length ; i++) {
						if (events[i][0] == currentEvent) {
							index = i;
						}
					}
					if (index >= 0) {
						events.splice(index, 1);
						localStorage.setItem("events", JSON.stringify(events));
					}
		     		App.load('events','fade');
				}
				console.log(choice);
		});
	});

});