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
        if (password.val().trim() === confirmPass.val().trim()) {
            return signUpUser(userData.userEmail, userData.userPassword, userData.userName);
        } else {
            password.val("");
            confirmPass.val("");
            $(".error-message").css("display", "flex");
            password.css("border", "1px solid #eb5b64");
            confirmPass.css("border", "1px solid #eb5b64");
        }
    });

    function signUpUser(userEmail, userPassword, userName) {
        $.post("/api/register", {
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword
        }).done(function () {
            window.location.replace("/character");
        }).fail(function (err) {
            console.log(err);
            $(".error-message").css("display", "flex");
            $("#userpassword").css("border", "1px solid #eb5b64");
        });
    }
});
