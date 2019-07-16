$(document).ready(function () {

    var register = $(".register");
    // var name = $("#userName");
    var email = $("#userEmail");
    var password = $("#userPassword");

    register.on("submit", function (event) {
        console.log("submit made");
        event.preventDefault();
        var userData = {
            // userName: name.val().trim(),
            userEmail: email.val().trim(),
            userPassword: password.val().trim()
        };
        console.log(userData);
        if (!userData.userEmail || !userData.userPassword) {
            return;
        }
        //
        signUpUser(userData.userEmail, userData.userPassword);
        email.val("");
        password.val("");
        // name.val("");
    });

    function signUpUser(userEmail, userPassword) {
        $.post("/api/register", {
            userEmail: userEmail,
            userPassword: userPassword
        })
            .then(function () {
                window.location.replace("/character");
            });
    }
});
