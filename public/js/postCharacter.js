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

        postCharacterData(userData.userSelection);

        function postCharacterData(selectedClass) {
            $.ajax({
                method: "PUT",
                url: "/api/userdata",
                data: { userSelection: selectedClass }
            }).then(function () {
                window.location.href = "/world";
            });
        }
    });
});