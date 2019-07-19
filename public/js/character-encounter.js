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

    //loads chapter status and creates designated enemy
    gameManager.setUpFight(chapter);
    // console.log("Enemy creation: " + enemy.hp);
    // animateEntrance();
    populateBattle();
    adjustPopupDistance();
    

});





// function populateBattle(characters, stage) {
    // var p;
    // switch (characters) {
    //     case "swordmaster":
    //         p = player[0];
    //         break;
    //     case "lance fighter":
    //         p = player[1];
    //         break;
    //     case "axe fighter":
    //         p = player[2];
    //         break;
    //     case "bow fighter":
    //         p = player[3];
    //         break;
    //     case "red mage":
    //         p = player[4];
    //         break;
    //     case "manakete":
    //         p = player[5];
    //         break;
    //     case "knight":
    //         p = player[6];
    //         break;
    //     case "thief":
    //         p = player[7];
    //         break;
    //     default:
    //         p = player[0];
    //         break;
    // }

    // switch (stage) {
    //     case 1:
    //         e = displayEnemy[0];
    //         s = 0;
    //         break;
    //     case 2:
    //         e = displayEnemy[1];
    //         s = 1;
    //         break;
    //     case 3:
    //         e = displayEnemy[2];
    //         s = 2;
    //         break;
    //     default:
    //         e = displayEnemy[0];
    //         s = 0;
    //         break;
    // }

//     $("body").css("background-image", "url(\"" + (background[s]) + "\")");

//     // display correct player portrait
//     $(".player-avatar > img").attr("src", p.portrait);
//     // display correct player name
//     $(".character-name").text(p.name);
//     // display correct player hp
//     $(".player-stats").find(".hit-points").text("HP " + (character.hp / 3).toFixed(0));
//     // display correct hp amount on health bar
//     $(".player-health-bar-fill").css("width", "100%");
//     // display correct player sprite
//     $(".player-sprite").attr("src", p.sprite);

//     //enemy
//     // display correct enemy portrait
//     $(".enemy-avatar > img").attr("src", e.portrait);
//     // display correct enemy name
//     $(".enemy-name").text(e.name);
//     // dispaly correct enemy hp
//     $(".enemy-stats").find(".hit-points").text("HP " + enemy.hp.toFixed(0));
//     // display correct hp amount on health bar
//     $(".enemy-health-bar-fill").css("width", "100%");
//     // display correct enemy sprite
//     $(".enemy-sprite").html("").append(e.sprite);

//     animateEntrance();
//     listenForHover();
//     adjustPopupDistance();
// }



// function updateHealthBar() {
//     var hpPercentage = enemy.hp / fullHP * 100;
//     $(".enemy-stats").find(".hit-points").text("HP " + enemy.hp);
//     $(".enemy-health-bar-fill").css("width", hpPercentage + "%");
//     console.log("currentHP: " + enemy.hp);
// }

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

function getUserId() {
    $.get("/api/userdata").then(function (data) {
        var userId = data.userId;
        getUserData(userId);
    });
}
function getUserData(Id) {
    $.ajax({
        method: "GET",
        url: `/api/users/${Id}`
    }).then(function (data) {
        console.log(data);
        var userChibi = data.Main.mainChibi;
        var userPortrait = data.Main.mainPortrait;
        $(".player-sprite").attr("src", userChibi);
        $(".player-portrait").attr("src", userPortrait);
        $(".character-name").text(data.Main.mainClass);
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

$(document).ready(function () {
    // animateEntrance();
    listenForHover();
    getUserId();
});
