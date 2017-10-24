App.controller('semester', function (page) {
	$(page).find("#saveSemesterButton").on("click", function() {
		if ($(page).find("#semesterInput").val() != "") {
			localStorage.setItem("semester", $(page).find("#semesterInput").val());
			App.load("calendar", 'fade');
		}
	});
});