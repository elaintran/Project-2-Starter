$(document).ready(function () {

    var register = $(".register");
    var name = $("#userName");
    var email = $("#userEmail");
    var password = $("#userPassword");
    // var confirmPass = $("#confirmPassword");

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
        // if (userData.password === confirmPass) {
        //     console.log("password matches");

        // } else {
        //     password.val("");
        //     confirmPass.val("");
        //     password.css("border", "1px solid red");
        //     confirmPass.css("border", "1px solid red");
        //     $(".msg-box").text("please confirm password match");
        //     return console.log("invalid confirm");
        // }
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
<<<<<<< HEAD
        }).fail(function () {
            console.log("error has occured");
=======
        }).fail(function (err) {
            console.log(err);
            $(".error-message").css("display", "flex");
            $("#userpassword").css("border", "1px solid #eb5b64");
>>>>>>> 04d5ecbc9f917b69ca5a9221fe85b6a7e5c00162
        });
    }
});
