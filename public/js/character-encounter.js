// populate enemy portrait dynamically on page load
// possibly store enemy svg data within a javascript object
/*Created for testing purposes: */
character = {
    classType: "Red Mage",
    hp: 12.5,
    def: 50,
    str: 25,
    spd: 37.5
};

//multiplier for character HP
character.hp *= 3;

$(document).ready(function () {
    getUserId();
    //loads chapter status and creates designated enemy
    
    // console.log("Enemy creation: " + enemy.hp);
    // animateEntrance();
    adjustPopupDistance();
    listenForHover();
    
    
});

// event handler for displaying popups when hovering over the parts of the enemy's body
function listenForHover() {
    $(".cls-1").each(function () {
        let bodyPart = ($(this).parent().attr("data-target"));
        // console.log(bodyPart);
        $(this).hover(function () {
            $(".attack-" + bodyPart).css({
                "opacity": "1",
                "left": "0vw"
            });
            $(this).css( "fill", "#f004" );
        }, function () {
            $(".attack-" + bodyPart).css({
                "opacity": "0",
                "left": "-1vw"
            });
            $(this).css({ "fill": "transparent" });
        });
    });
}

function adjustPopupDistance() {
    let chosenEnemy = $("svg.enemy-sprite").find("title").text();
    switch (chosenEnemy) {
        case "bandit":
            $(".attack-area-popups").css({
                "left": "11vw",
                "grid-row-gap": "1.2vw"
            });
            break;
        case "black-knight":
            $(".attack-area-popups").css({
                "left": "14vw",
                "grid-row-gap": "1.2vw"
            });
            break;
        case "dragon-king":
            $(".attack-area-popups").css({
                "left": "18vw",
                "grid-row-gap": "4.2vw"
            });
            break;
        default:
            $(".attack-area-popups").css("left", "11vw");
            break;
    }
}

//  ============================
//      CHARACTER ANIMATIONS
//  ============================
function animateEntrance() { // eslint-disable-line no-unused-vars
    $(".player-sprite").css({ left: "-50vw" });
    $(".player-stats").css({ top: "-10vw" });
    $(".enemy-stats").css({ top: "-10vw" });
    $(".player-sprite").animate({ left: "+=50vw" }, 3500);
    setTimeout(function () {
        $(".player-stats").animate({ "top": "+=10vw" }, 1450, "easeOutBounce");
        $(".enemy-stats").animate({ "top": "+=10vw" }, 1550, "easeOutBounce");
    }, 3500);
}

function playerStrike() { // eslint-disable-line no-unused-vars
    $(".player-sprite").animate({"left": "+=3vw" }, 100);
    $(".player-sprite").animate({"left": "-=3vw" }, 300);
}

function enemyStrike() { // eslint-disable-line no-unused-vars
    $("div.enemy-sprite").animate({"right": "+=3vw" }, 100);
    $("div.enemy-sprite").animate({"right": "-=3vw" }, 300);
}

function shakePlayer(enemyTotalDmg) { // eslint-disable-line no-unused-vars
    let d = $(".player-damage");
    let p = $(".player-sprite");
    // shake character
    p.effect("shake", { distance: 10 }, 300);
    // update damage number value
    d.text(enemyTotalDmg);
    // reset damage number
    d.css({ 
        "top": 0,
        "opacity": 1 
    });
    // slide damage number up and fade out
    d.animate({
        "top": "-=7vw",
        "opacity": 0
    }, 1000, "easeOutCirc");
}

function shakeEnemy(totalDmg) { // eslint-disable-line no-unused-vars
    let d = $(".enemy-damage");
    let e = $("div.enemy-sprite");
    $("#enemy-image > image").attr("xlink:href", displayEnemy[chapter - 1].altSprite);
    e.effect("shake", { distance: 10 }, 300);
    d.text(totalDmg);
    d.css({ 
        "top": 0,
        "opacity": 1 
    });
    setTimeout(function() {
        $("#enemy-image > image").attr("xlink:href", displayEnemy[chapter - 1].origSprite);
    }, 300);
    d.animate({
        "top": "-=7vw",
        "opacity": 0
    }, 1000, "easeOutCirc");
}

function slidePlayer() { // eslint-disable-line no-unused-vars
    let d = $(".player-damage");
    let p = $(".player-sprite");
    p.animate({"left": "-=4vw" }, 200);
    d.text("MISS");
    d.css({ 
        "top": 0,
        "-webkit-text-stroke": "2px dodgerblue",
        "font-size": "3vw",
        "opacity": 1 
    });
    d.animate({
        "top": "-=7vw",
        "opacity": 0
    }, 1000, "easeOutCirc");
    
    p.animate({"left": "+=4vw" }, 800);
}

function slideEnemy() { // eslint-disable-line no-unused-vars
    let d = $(".enemy-damage");
    let e = $("div.enemy-sprite");
    e.animate({"right": "-=4vw" }, 200);
    d.text("MISS");
    d.css({ 
        "top": 0,
        "-webkit-text-stroke": "2px dodgerblue",
        "font-size": "3vw",
        "opacity": 1 
    });
    d.animate({
        "top": "-=7vw",
        "opacity": 0
    }, 1000, "easeOutCirc");
    
    e.animate({"right": "+=4vw" }, 800);
}

//  ==========================
//      DATABASE FUNCTIONS
//  ==========================


function getUserData(Id) {
    $.ajax({
        method: "GET",
        url: `/api/users/${Id}`
    }).then(function (data) {
        // debugger;
        console.log("data: ", data);
        var userChibi = data.Main.mainChibi;
        var userPortrait = data.Main.mainPortrait;
        $(".player-sprite").attr("src", userChibi);
        $(".player-portrait").attr("src", userPortrait);
        $(".character-name").text(data.Main.mainClass);
        getChapter(data);
        console.log("getChapter ran");
    });
}
function getUserId() {
    $.get("/api/userdata").then(function (data) {
        var userId = data.userId;
        getUserData(userId);
    });
}

// loginUser does a post to our "api/login" route and if successful, redirects us the the landing page
// function putChapterWin() {
//     function postCharacterData(Id) {
//         $.ajax({
//             method: "PUT",
//             url: `/api/users/${Id}`,
//             data: userData
//         }).then(function () {
//             window.location.href = "/world";
//         });
//     }

//     function gatherUserId() {
//         $.get("/api/userdata").then(function (data) {
//             console.log(data);
//             var userId = data.userId;
//             postCharacterData(userId);
//         });
//     }
//     gatherUserId();
// }

