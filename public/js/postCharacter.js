$(document).ready(function () {
    // var strengthStat = $(".filled").attr("y");
    // var selectedClass = $(this).attr("data-class");
    // var selectedName = $(this).attr("data-name");

    $("#confirmCharacter").on("click", function () {
        var strengthStat = $(".filled").attr("y");
        var selectedClass = $(this).attr("data-class");
        var selectedName = $(this).attr("data-name");
        console.log(strengthStat);
        console.log(selectedClass);
        console.log(selectedName);
        var userData = {
            userSelection: selectedClass
        };
        console.log("function fired with " + userData);

        // postCharacterData(userData.userSelection);

        function postCharacterData(Id) {
            $.ajax({
                method: "PUT",
                url: `/api/users/${Id}`,
                data: userData
            }).then(function () {
                window.location.href = "/world";
            });
        }

        function gatherUserId() {
            $.get("/api/userdata").then(function (data) {
                console.log(data);
                var userId = data.userId;
                postCharacterData(userId);
            });
        }
        gatherUserId();
    });
});