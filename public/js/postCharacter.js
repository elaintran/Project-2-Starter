$(document).ready(function () {
    $("#confirmCharacter").on("click", function () {
        var hpStat = $(this).attr("data-hp");
        var strStat = $(this).attr("data-str");
        var defStat = $(this).attr("data-def");
        var spdStat = $(this).attr("data-spd");
        var selectedClass = $(this).attr("data-class");
        var selectedId = $(this).attr("data-id");
        var selectedName = $(this).attr("data-name");
        console.log(hpStat);
        console.log(strStat);
        console.log(defStat);
        console.log(spdStat);
        console.log(selectedClass);
        console.log(selectedId);
        console.log(selectedName);
        var userData = {
            userSelection: selectedId,
        };
        console.log("function fired with " + userData[0]);
<<<<<<< HEAD
        console.log(userData.userSelection);
        // postCharacterData(userData.userSelection);
=======

        postCharacterData(userData.userSelection);
>>>>>>> 69dc9b34477f3dadfb5603d52106f47a9ac457e7

        function postCharacterData(Id) {
            $.ajax({
                method: "PUT",
                url: `/api/users/${Id}`,
                data: userData
            }).then(function (data) {
                console.log(data);
<<<<<<< HEAD
                console.log(userData);
                debugger;
                window.location.replace("/world");
                debugger;
=======
                getUserInfo(Id);
            });
        }

        function getUserInfo(id) {
            $.get("/api/users/" + id).then(function () {
                window.location.href = "/world";
>>>>>>> 69dc9b34477f3dadfb5603d52106f47a9ac457e7
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