$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/userdata").then(function (data) {
        $(".user-name").text(data.userName);
        $(".user-selection").text(data.userSelection);
        $(".user-progression").text(data.userProgression);
    });
});
