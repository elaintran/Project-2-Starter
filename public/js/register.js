$(document).ready(function () {

    var register = $(".register");
    var name = $("#userName");
    var email = $("#userEmail");
    var password = $("#userPassword");
    var confirmPass = $("#confirmPassword");

    register.on("submit", function (event) {
        console.log("submit made");
        event.preventDefault();
        var userData = {
            userName: name.val().trim(),
            userEmail: email.val().trim(),
            userPassword: password.val().trim()
        };
        console.log(userData);
        if (!userData.userEmail || !userData.userPassword || !userData.userName) {
            return;
        }
        if (userData.password === confirmPass) {
            console.log("password matches");

        } else {
            console.log("invalid confim");
        }
        signUpUser(userData.userEmail, userData.userPassword, userData.userName);
        email.val("");
        password.val("");
        name.val("");
    });

    function signUpUser(userEmail, userPassword, userName) {
        $.post("/api/register", {
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword
        }).done(function () {
            window.location.replace("/character");
        }).fail(function () {
            console.log("error has occured");
        });
    }
});
