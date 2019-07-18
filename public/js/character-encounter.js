// populate enemy portrait dynamically on page load
// possibly store enemy svg data within a javascript object

var player = [
    {
        name: "Swordmaster",
        hp: 99,
        portrait: "./images/resource-images/encounter/fighter-red-portrait.png",
        sprite: "./images/resource-images/chibi/fighter-sword-red.png"
    }, {
        name: "Lance Fighter",
        hp: 99,
        portrait: "./images/resource-images/encounter/fighter-blue-portrait.png",
        sprite: "./images/resource-images/chibi/fighter-lance-blue.png"
    }, {
        name: "Axe Fighter",
        hp: 99,
        portrait: "./images/resource-images/encounter/fighter-green-portrait.png",
        sprite: "./images/resource-images/chibi/fighter-axe-green.png"
    }, {
        name: "Bow Fighter",
        hp: 99,
        portrait: "./images/resource-images/encounter/fighter-purple-portrait.png",
        sprite: "./images/resource-images/chibi/fighter-bow-purple.png"
    }, {
        name: "Red Mage",
        hp: 99,
        portrait: "./images/resource-images/encounter/mage-red-portrait.png",
        sprite: "./images/resource-images/chibi/mage-red.png"
    }, {
        name: "Manakete",
        hp: 99,
        portrait: "./images/resource-images/encounter/manakete-blue-portrait.png",
        sprite: "./images/resource-images/chibi/manakete-blue.png"
    }, {
        name: "Knight",
        hp: 99,
        portrait: "./images/resource-images/encounter/knight-green-portrait.png",
        sprite: "./images/resource-images/chibi/knight-axe-green.png"
    }, {
        name: "Thief",
        hp: 99,
        portrait: "./images/resource-images/encounter/thief-purple-portrait.png",
        sprite: "./images/resource-images/chibi/thief-purple.png"
    }
];

var enemies = [
    `<svg class="enemy-sprite" style="height: 15vw" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 126 181">
        <defs>
            <style>.cls-1{fill:transparent;fill-rule:evenodd;}</style>
        </defs>
        <title>mage-blue</title>
        <g id="Layer2" data-name="Layer 2">
            <g id="mage">
                <image width="126" height="181" transform="matrix(-1, 0, 0, 1, 126, 0)" xlink:href="./images/resource-images/chibi/mage-blue.png"/>
            </g>
            <g id="mage_legs" data-part="legs">
                <path class="cls-1" d="M9,135c16.29-.23,100.44-3.79,107,2,3,6,6.27,17.85,5,24-16.72,3.18-27.85,16.14-42,20l-58-3C14,160.11,6.68,157.63,9,135Z"/>
            </g>
            <g id="mage_body" data-part="body">
                <path class="cls-1" d="M34.11,76c9.09.24,44.23-3.12,51,3,11,11.32,19.23,21.16,36,27,.32,12.37-4.2,16.83-6,29H8.11v-1c4.14-15.43-8.75-22.25-7-29C16.34,100.63,26,87.63,34.11,76Z"/>
            </g>
            <g id="mage_head" data-part="head">
                <path class="cls-1" d="M62,1c9.76,5.22,19.22,10.52,30,16l4,26L92,57c5.63.64,6.51,1.44,9,5-7.31,20.78-58.17,20.18-74,8L21,58l8-2c-1.47-12.65-1.83-29.1,3-38C42.9,15.7,53.57,6.93,62,1Z"/>
            </g>
        </g>
    </svg>`,
    `<svg class="enemy-sprite" style="height: 15vw" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 169 179.19">
        <defs>
            <style>
                .cls-1{fill:transparent;fill-rule:evenodd;}
            </style>
        </defs>
        <title>knight-red</title>
        <g id="Layer2" data-name="Layer 2">
            <g id="knight">
                <image width="169" height="179" transform="matrix(-1, 0, 0, 1, 169, 0.19)" xlink:href="./images/resource-images/chibi/knight-sword-red.png"/>
            </g>
            
            <g id="knight_head" data-part="head">
                <path class="cls-1" d="M69,1.41c12-.33,49.67-4.4,55,3,3.89,9,.34,39.11-3,45-7.21,9-30.75,21.26-43,24-13.44-12.52-28-41.65-20-71Z"/>
            </g>
            <g id="knight_body" data-part="body">
                <path class="cls-1" d="M31.78,44.41l16,8,19,1c.21,11.83,6.83,14.42,13,20,17.62-3.8,26.67-19.32,45-22l2,1c.75,11.23,9.46,11.47,13,20l4,19h1l22,13c-9.25,10.73-14.26,7-17,24h-87v1l-7,17c-6.13,10.63-13.56,22.45-22,31l-5-4c-16.12-35.42-42-63.85-19-113C17.05,61.27,26.9,49.77,31.78,44.41Z"/>
            </g>
            <g id="knight_legs" data-part="legs">
                <path class="cls-1" d="M149.78,128.41c-.29,35.94-18.94,13.32-33,28h-2c.69,9.43,2.89,14.47-1,21-14.91-1.11-43.52,2.74-56-3,4.19-8.15,1.53-31.73,4-46Z"/>
            </g>
        </g>
    </svg>`, 

    `<svg class="enemy-sprite" style="height: 27vw" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 454 446">
        <defs>
            <style>.cls-1{fill:transparent;fill-rule:evenodd;}</style>
        </defs>
        <title>dragon-king</title>
        <g id="Layer2" data-name="Layer 2">
            <g id="dragon">
                <image width="454" height="446" xlink:href="./images/resource-images/chibi/dragon-king.png"/>
            </g>
            <g id="dragon_legs" data-part="legs">
                <path class="cls-1" d="M294,243c15,11.4,13.28,26.78,22,45,12.93,2,20.87,9.41,30,15,32.36,19.82,58.86,33.49,42,82,18.57-3.86,30.33-18.65,45-27l4,1,16,32c-13.27,16.58-21.44,32.48-43,41l-27,5c-4.92,1.78-12.1,6-22,4l-23-10c-15.52.83-56.88,11.06-74,15,0,0-69.75-6.49-72-7-20-4.54-77.35,11.84-85,3-16.8-4.73-49.2-28.37-52-45l10-50c3.09-13.64,1.74-26.51,8-37,5.71-9.58,16.45-15.18,24-23l5,1c4.09,12.5,11,38.29,24,42,.63-8.4.56-18.14,6-22l3-2c31.89,5.3,33.92,46.77,33,82h4c2.76-4.45,5.21-7.79,9-6,12.43,6.68,12.13,12.32,26,3,7.13-41.66-9-103.52,30-116,9.17-2.94,21.21-1.94,28,3,5.75,4.19,7.82,11.18,12,17l2-1Z"/>
            </g>
            <g id="dragon_body" data-part="body">
                <path class="cls-1" d="M264,43c37.69-.56,53.36,12.45,77,23,45.86,20.48,76.83,37.8,91,90,3.76,13.86,17.16,42.52,12,58l-46,37c-17.73-5.71-86.25-13.68-105-9l-14,47-4-1c-6.94-25.72-44.3-24.46-58-6-10.88,14.67-5.75,80.61-10,104-11.89,7-19,5.11-27-6l-8,8-2,1-2-1c1-44.67-1.18-57.35-26-81-17.46-.63-14.25,11.55-16,23l-4-2c-15.48-8-23.48-54.11-25-74H95l-57-7c-1.94-4.58-27.4-24-33-26,.51-17.91,6.76-33,11-48l32-12c14.7-3.91,24.27.25,34-7l12-17c6.41,4.67,18.32,9.19,24,15,9.79,10,7.2,34.21,15,46,8.33,2.65,11.48,7.82,17,13h4c22.43-26.28,53.08-33.21,90-46-2.18-16.63-9.57-27.6-13-42,35.56-9.51,46.14-6.42,61-38-10.13-10.72-34.78-8.59-41-23l-1-7C253.71,47.63,257.09,47.08,264,43Z"/>
            </g>
            <g id="dragon_head" data-part="head">
                <path class="cls-1" d="M95,1c14.22,2.33,65.87,7.11,73,15-6.22,12.59-16.9,25-27,34l1,2c47.47,11.85,72.41,35,90,76,4.49,10.47,16.08,29.37,10,43-21.38,2.42-45.83,12.41-62,22-9.55,5.66-18.32,16.09-31,18-5.08-7.06-14.75-9.85-19-17-7.4-14.18-6.14-31.22-14-43-30-8.1-83.37,26-109,23C-14.51,130.62,66.77,22.45,95,1Z"/>
            </g>
        </g>
    </svg>`
];
console.log(enemy);
var enemy = [
    {
        name: "Blue Mage",
        hp: 100,
        portrait: "./images/resource-images/encounter/enemy-mage-portrait.png",
        sprite: enemies[0]
    },{
        name: "Red Knight",
        hp: 200,
        portrait: "./images/resource-images/encounter/enemy-portrait.png",
        sprite: enemies[1]
    },{
        name: "Dragon King",
        hp: 400,
        portrait: "./images/resource-images/encounter/dragon-king-portrait.png",
        sprite: enemies[2]
    }
];

var background = [
    "./images/resource-images/encounter/bg-forest-entrance.jpg",
    "./images/resource-images/encounter/bg-forest.jpg",
    "./images/resource-images/encounter/bg-castle.jpg"
];

// * player[0] = swordmaster
// * player[1] = lance fighter
// * player[2] = axe fighter
// * player[3] = bow fighter
// * player[4] = red mage
// * player[5] = manakete
// * player[6] = knight
// * player[7] = thief
function populateBattle(character, stage) {
    var p;
    switch (character) {
        case "swordmaster":
            p = player[0];
            break;
        case "lance fighter":
            p = player[1];
            break;
        case "axe fighter":
            p = player[2];
            break;
        case "bow fighter":
            p = player[3];
            break;
        case "red mage":
            p = player[4];
            break;
        case "manakete":
            p = player[5];
            break;
        case "knight":
            p = player[6];
            break;
        case "thief":
            p = player[7];
            break;                
        default: 
            p = player[0];
            break;
    }

    switch (stage) {
        case 1:
            e = enemy[0];
            s = 0;
            break;
        case 2:
            e = enemy[1];
            s = 1;
            break;
        case 3:
            e = enemy[2];
            s = 2;
            break;
        default:
            e = enemy[0];
            s = 0;
            break;
    }

    $("body").css("background-image", "url(\"" + (background[s]) + "\")");

    // display correct player portrait
    $(".player-avatar > img").attr("src", p.portrait);
    // display correct player name
    $(".character-name").text(p.name);
    // display correct player hp
    $(".player-stats").find(".hit-points").text("HP " + p.hp);
    // display correct hp amount on health bar
    $(".player-health-bar-fill").css("width", "100%");
    // display correct player sprite
    $(".player-sprite").attr("src", p.sprite);

    //enemy
    // display correct enemy portrait
    $(".enemy-avatar > img").attr("src", e.portrait);
    // display correct enemy name
    $(".enemy-name").text(e.name);
    // dispaly correct enemy hp
    $(".enemy-stats").find(".hit-points").text("HP " + e.hp);
    // display correct hp amount on health bar
    $(".enemy-health-bar-fill").css("width", "100%");
    // display correct enemy sprite
    $(".enemy-sprite").html("").append(e.sprite);

    listenForHover();
}

populateBattle();
var fullHP = enemy[0].hp;
var currentHP = fullHP;
function testAttack(damage) {
    currentHP = (currentHP - damage);
    var hpPercentage = currentHP / fullHP * 100;
    $(".enemy-stats").find(".hit-points").text("HP " + enemy[0].hp);
    $(".enemy-health-bar-fill").css("width", hpPercentage + "%");
    console.log("currentHP: " + currentHP);
}

// event handler for displaying popups when hovering over the parts of the enemy's body
function listenForHover() {
    $(".cls-1").each(function() {    
        var target = ($(this).parent().attr("data-part"));
        // console.log(target);
        $(this).hover(function() {
            $(".attack-" + target).css({
                "opacity": "1",
                "left": "0"
            });
            $(this).css({"fill":"#f006"});
        },function() {
            $(".attack-" + target).css({
                "opacity": "0",
                "left": "-1vw"
            });
            $(this).css({"fill":"transparent",});
        });
        $(this).click(function() {
            testAttack(25);
        });
    });
}

listenForHover();