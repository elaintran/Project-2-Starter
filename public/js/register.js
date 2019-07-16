$(document).ready(function () {

    var register = $("form.register");
    var userEmail = $("#userEmail").val().trim();
    var userPassword = $("#userPassword").val().trim();

    register.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            userEmail: userEmail,
            userPassword: userPassword
        };
        if (!userData.userEmail || !userData.userPassword) {
            return;
        }
        //
        signUpUser(userData.userEmail, userData.userPassword);
        userEmail.val("");
        userPassword.val("");
    });

    function signUpUser(userEmail, userPassword) {
        $.post("/api/register", {
            userEmail: userEmail,
            userPassword: userPassword
        }).then(function () {
            window.location.replace("/character");
        }).catch(handleLoginErr);
    }
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
