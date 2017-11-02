App.controller('events', function (page) {
	// events = [[0, "IIC2333", "10/11", "I1", "Entra toda la materia"]]
	// events.push([1, "IIC2613", "12/11", "Tarea 2", "Sobre arboles de desicion"]);
	// console.log(events);
	// localStorage.setItem("events", JSON.stringify(events));
	
	var events = JSON.parse(localStorage.getItem("events"));

	var eventsListItem = $(page).find("#eventsList");
	var text = "";
	for (var i = 0; i < events.length; i++) {
		text += '<li class="app-button eventEditButton" data-event="' + events[i][0] + '">';
		text += events[i][2] + " - ";
		text += events[i][1] + ": ";
		text += events[i][3];
		text += '</li>';
	}

	if (events.length == 0) {
		text = "<label>No hay eventos, crea uno</label>";
	}

	// console.log(text);

	eventsListItem.html(text);

    $(page).find(".eventEditButton").on("click", function() {
      	localStorage.setItem("currentEvent", $(this).data("event"));
      	localStorage.setItem("currentCourse", "");
      	console.log($(this).data("event"));
      	App.load('eventEdit', 'fade');

      });

	$(page).find("#newEventButton").on("click", function() {
      	localStorage.setItem("currentEvent", "");
      	localStorage.setItem("currentCourse", "");
      	App.load('eventEdit', 'fade');

      });


});