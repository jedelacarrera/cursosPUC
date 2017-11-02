if (localStorage.getItem("semester") == null) {
	localStorage.setItem("semester", "2017-2");
}

if (localStorage.getItem("courses") == null) {
	localStorage.setItem("courses", JSON.stringify([]));
}

if (localStorage.getItem("currentCourse") == null) {
	localStorage.setItem("currentCourse", "");
}

if (localStorage.getItem("events") == null) {
	localStorage.setItem("events", JSON.stringify([]));
}

if (localStorage.getItem("currentEvent") == null) {
	localStorage.setItem("currentEvent", "");
}

App.load('calendar', 'fade');