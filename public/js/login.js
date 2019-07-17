$(document).ready(function () {
    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var emailInput = $("#inputEmail");
    var passwordInput = $("#inputPassword");

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            userEmail: emailInput.val().trim(),
            userPassword: passwordInput.val().trim()
        };

        if (!userData.userEmail || !userData.userPassword) {
            return;
        }

        // if we have an email and password we run the loginUser function and clear the form
        loginUser(userData.userEmail, userData.userPassword);
        emailInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the landing page
    function loginUser(userEmail, userPassword) {
        $.post("/api/login", {
            userEmail: userEmail,
            userPassword: userPassword
        }).then(function () {
            console.log("before replace");
            window.location.replace("/api/userdata");
            console.log("after replace");
        });
    }
});