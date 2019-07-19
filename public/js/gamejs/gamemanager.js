//total skill points up for distribution by the player is 10. Each point adds +2 to the character's stats.
let skillPoints = 10;

var enemy;
let target; // eslint-disable-line no-unused-vars

//keeps track of which chapter user is on
// let chapter = 1; // eslint-disable-line no-unused-vars

// dummy code for simulating json response with chapter data
let chapters = [
  {
    complete: true
  },{
    complete: false
  },{
    complete: false
  },{
    complete: false
  }
];

function getChapter() {
  if (chapters[3].complete) {
    chapter = 4;
    console.log("chapter: ", chapter);
    return chapter;
  } else if (chapters[2].complete) {
    chapter = 3;
    console.log("chapter: ", chapter);
    return chapter;
  } else if (chapters[1].complete) {
    chapter = 2;
    console.log("chapter: ", chapter);
    return chapter;
  } else if (chapters[0].complete) {
    chapter = 1;
    console.log("chapter: ", chapter);
    return chapter;
  } else {
    chapter = 1;
    console.log("chapter defaulting to: ", chapter);
    return chapter = 1;
  }
}
getChapter();

var player = [ // eslint-disable-line no-unused-vars
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
  `<svg  class="enemy-sprite" style="height: 15vw" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 137 169">
      <defs>
          <style>.cls-1{fill:transparent;fill-rule:evenodd;}</style>
      </defs>
      <title>bandit</title>
      <g id="Layer2" data-name="Layer 2">
          <g id="enemy-image">
              <image width="137" height="169" xlink:href="./images/resource-images/chibi/ogma.png"/>
          </g>
          <g id="bandit_legs" data-target="legs">
              <path class="cls-1" d="M30,98l38,1c4.4,15.44,10.4,52.37,9,68,0,0-59.46-.84-60-1,1.41-8.93,4.82-13.18,5-25L2,151l-1-1C3.78,130.11,21.14,114.12,30,98Z"/>
          </g>
          <g id="bandit_body" data-target="body">
              <path class="cls-1" d="M131,6h3c.79,43-27.77,63-28,108-15.08,4.69-14.67,20-28,24l-1-1c-.28-15.85,4.19-25-7-37-11.56-2.25-28.9-3.33-41-1-5.44,6.31-14.5,26.47-25,15-2.44-2.67-3.86-5.72-2-10,3.85-7.79,13.05-10.56,18-17,6.79-8.84,6-19.4,15-26,15.15,7,26.09-1.21,37-5,3,5,6.6,7.31,14,8V63l-3-7c9.86-3.38,10.85-12.8,18-18,4.53-3.29,7.87.77,10-2C118.18,24.35,122.32,15.41,131,6Z"/>
          </g>
          <g id="bandit_head" data-target="head">
              <path class="cls-1" d="M58,1c46.3,6.79,19.17,37.61,28,63-8.19-.83-10.44-3.93-15-8-12.34,6.3-26.07,11.67-40,2-1.15-6.58-.71-13-5-17-1.42,4-.41,1.79-3,3V42c-2.42-5.62.85-9.28,2-13C33.24,2.29,29.42,11.75,58,1Z"/>
          </g>
      </g>
  </svg>`,
  `<svg  class="enemy-sprite" style="height: 19vw" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 166 180">
      <defs>
          <style>.cls-1{fill:transparent;fill-rule:evenodd;}</style>
      </defs>
      <title>black-knight</title>
      <g id="Layer2" data-name="Layer 2">
          <g id="enemy-image">
              <image width="166" height="180" xlink:href="./images/resource-images/chibi/black-knight.png"/>
          </g>
          <g id="black_knight_legs" data-target="legs">
              <path class="cls-1" d="M35.67,120.33l83,1c1.59,6.43,4.71,9.35,9,13l-4,5c3.13,4.42,7.17,6.93,8,11,.68,13.32-20.94,10.28-29,18-3.38,3.24-.55,7.19-5,10l-6,1c-8-3.88-9.49-8.21-11-16-6.06,2.93-14.06,2.25-19,5-1.16,8.76-6.77,7.87-14,10l-5-2c.25-11.94,1.3-12.61,3-22h-1c-5.22,2.94-4.4,6.87-8,11-7.68-4.47-23.55-3.48-34-6l-1-2c6.68-12.06,15.74-10.28,25-19C28.2,136.89,33.41,123.9,35.67,120.33Z"/>
          </g>
          <g id="black_knight_body" data-target="body">
              <path class="cls-1" d="M52.67,47.33l3,17,9,7,9-2,2,4,15-7c4.68-8.23-2.07-18.52,5-24,11.08-3.93,22.89,5.23,29,10-.72,6-1.52,8.31,0,12,6.82,3.15,11.5,10.57,15,17-.81,4.44-.39,13.36-4,16l-14,1,3,7c11.53,4.47,15.76-1.49,27,1l1,5c-2.63,3.54-3.07,4.4-9,5l1,2c9.94,2.59,15.94,11.44,20,20-1.89,3.76-25.23,9.84-32,11l-8-9,3-6c-3.91-4.36-7.25-7.2-9-14h-84c-5,14-15.62,17.54-28,24-3.83-1.32-2.08,0-4-3-8.75-21.94,25.68-34.35,33-47l-14-5v-4c6-9.5,12.11-14.64,20-22-1.26-6-3.93-12.57,1-16Z"/>
          </g>
          <g id="black_knight_head" data-target="head">
              <path class="cls-1" d="M73.67.33c12.6,4.42,28.86,12.52,38,21l-6,21c-5-1.08-9.18-.9-13,1l-2,23c-4.16,1.18-24,5-24,5-12.61-3.75-26.33-43.82-20-58,8-3,9.11-9.15,16-12l2,7c3.18-2.76,3.36-1.07,8,0Z"/>
          </g>
      </g>
  </svg>`,
  `<svg class="enemy-sprite" style="height: 27vw" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 454 446">
      <defs>
          <style>.cls-1{fill:transparent;fill-rule:evenodd;}</style>
      </defs>
      <title>dragon-king</title>
      <g id="Layer2" data-name="Layer 2">
          <g id="enemy-image">
              <image width="454" height="446" xlink:href="./images/resource-images/chibi/dragon-king.png"/>
          </g>
          <g id="dragon_legs" data-target="legs">
              <path class="cls-1" d="M294,243c15,11.4,13.28,26.78,22,45,12.93,2,20.87,9.41,30,15,32.36,19.82,58.86,33.49,42,82,18.57-3.86,30.33-18.65,45-27l4,1,16,32c-13.27,16.58-21.44,32.48-43,41l-27,5c-4.92,1.78-12.1,6-22,4l-23-10c-15.52.83-56.88,11.06-74,15,0,0-69.75-6.49-72-7-20-4.54-77.35,11.84-85,3-16.8-4.73-49.2-28.37-52-45l10-50c3.09-13.64,1.74-26.51,8-37,5.71-9.58,16.45-15.18,24-23l5,1c4.09,12.5,11,38.29,24,42,.63-8.4.56-18.14,6-22l3-2c31.89,5.3,33.92,46.77,33,82h4c2.76-4.45,5.21-7.79,9-6,12.43,6.68,12.13,12.32,26,3,7.13-41.66-9-103.52,30-116,9.17-2.94,21.21-1.94,28,3,5.75,4.19,7.82,11.18,12,17l2-1Z"/>
          </g>
          <g id="dragon_body" data-target="body">
              <path class="cls-1" d="M264,43c37.69-.56,53.36,12.45,77,23,45.86,20.48,76.83,37.8,91,90,3.76,13.86,17.16,42.52,12,58l-46,37c-17.73-5.71-86.25-13.68-105-9l-14,47-4-1c-6.94-25.72-44.3-24.46-58-6-10.88,14.67-5.75,80.61-10,104-11.89,7-19,5.11-27-6l-8,8-2,1-2-1c1-44.67-1.18-57.35-26-81-17.46-.63-14.25,11.55-16,23l-4-2c-15.48-8-23.48-54.11-25-74H95l-57-7c-1.94-4.58-27.4-24-33-26,.51-17.91,6.76-33,11-48l32-12c14.7-3.91,24.27.25,34-7l12-17c6.41,4.67,18.32,9.19,24,15,9.79,10,7.2,34.21,15,46,8.33,2.65,11.48,7.82,17,13h4c22.43-26.28,53.08-33.21,90-46-2.18-16.63-9.57-27.6-13-42,35.56-9.51,46.14-6.42,61-38-10.13-10.72-34.78-8.59-41-23l-1-7C253.71,47.63,257.09,47.08,264,43Z"/>
          </g>
          <g id="dragon_head" data-target="head">
              <path class="cls-1" d="M95,1c14.22,2.33,65.87,7.11,73,15-6.22,12.59-16.9,25-27,34l1,2c47.47,11.85,72.41,35,90,76,4.49,10.47,16.08,29.37,10,43-21.38,2.42-45.83,12.41-62,22-9.55,5.66-18.32,16.09-31,18-5.08-7.06-14.75-9.85-19-17-7.4-14.18-6.14-31.22-14-43-30-8.1-83.37,26-109,23C-14.51,130.62,66.77,22.45,95,1Z"/>
          </g>
      </g>
  </svg>`
];

var displayEnemy = [
  {
      name: "Bandit",
      hp: 100,
      portrait: "./images/resource-images/encounter/enemy-bandit-portrait.png",
      sprite: enemies[0],
      altSprite: "./images/resource-images/chibi/ogma2.png",
      origSprite: "./images/resource-images/chibi/ogma.png"
  }, {
      name: "Black Knight",
      hp: 200,
      portrait: "./images/resource-images/encounter/enemy-black-knight-portrait.png",
      sprite: enemies[1],
      altSprite: "./images/resource-images/chibi/black-knight.png",
      origSprite: "./images/resource-images/chibi/black-knight.png"
  }, {
      name: "Dragon King",
      hp: 400,
      portrait: "./images/resource-images/encounter/dragon-king-portrait.png",
      sprite: enemies[2],
      altSprite: "./images/resource-images/chibi/dragon-king2.png",
      origSprite: "./images/resource-images/chibi/dragon-king.png"
  }
];

var background = [
  "./images/resource-images/encounter/bg-forest-entrance.jpg",
  "./images/resource-images/encounter/bg-forest.jpg",
  "./images/resource-images/encounter/bg-castle2.jpg"
];

// starting point for HP bar
let fullHP;
//Enemy constructor
function Enemy(hp, def, str, spd) {
  this.hp = hp;
  this.def = def;
  this.str = str;
  this.spd = spd;
}

//Target data constructor
function Target(target, hitChance, bonus, reduceSpd) {
  this.target = target;
  this.hitChance = hitChance;
  this.bonus = bonus;
  this.reduceSpd = reduceSpd;
}

let gameManager = {// eslint-disable-line no-unused-vars
  
  charSelect: function(classType) {
    this.createChar(classType);
    // this.saveChar();
  },
  customChar: function(character) {
    // this.loadChar();
    this.distrPoints(character);
  },
  createChar: function(classType) {
    //strength out of 4. So 4/4 = 50 max points (60 total - 10 skill points = 50)
    switch (classType) {
      case "Swordmaster": //2-2-3-3 so 50*2/4, 50*2/4, 50*3/4, 50*3/4
        character = new Character(classType, 25, 25, 37.5, 37.5);
        break;
      case "Lance Fighter": //3-3-2-2
        character = new Character(classType, 37.5, 37.5, 25, 25);
        break;
      case "Axe Fighter": //3-1-4-2
        character = new Character(classType, 37.5, 12.5, 50, 25);
        break;
      case "Bow Fighter": //2-3-2-3
        character = new Character(classType, 25, 37.5, 25, 37.5);
        break;
      case "Red Mage": //1-2-4-3
        character = new Character(classType, 12.5, 25, 50, 37.5);
        break;
      case "Manakete": //1-3-4-2
        character = new Character(classType, 12.5, 37.5, 50, 25);
        break;
      case "Knight": //4-4-1-1
        character = new Character(classType, 50, 50, 12.5, 12.5);
        break;
      case "Thief": //2-2-2-4
        character = new Character(classType, 25, 25, 25, 50);
        break;
    }
  },
  // saveChar: function() {
  //   //posts character object to server. Needs server to put data into the database using sequelize
  //   $.post("/character/stats", character, function(response) {});

  //   //this portion belongs on the server page:
  //   db.Main.create(req.body).then(function() {
  //     //whatever happens
  //   });
  // },
  loadChar: function(Id) {
    //grab the character class and the character chapter status
    $.ajax({
      method: "GET",
      url:`/api/users/${Id}`,
    }).then(function(data){
      console.log(data);
    });

    $.get("/api/userdata").then(function(){
      var userId = data.userId;
      this.loadChar(userId);
    });

  },
  // saveChapt: function() {
  //   //posts chapter data to server. Needs server to put data into the database using sequelize
  //   $.post("/chapter/status", chapter, function(response) {});

  //   //this portion belongs on the server page:
  //   db.Main.create(req.body).then(function() {
  //     //whatever happens
  //   });
  // },
  // loadChapt: function() {
  //   $.get("/chapter/status", function(response) {
  //     //grabs character status and sets the chapter status
  //     chapter = response;
  //   });
  // },
  distrPoints: function(character) {
    $(".skill-display").text("Skill Points: " + skillPoints);

    //listen if any buttons with the class "add" is clicked:
    $(".add").on("click", function() {
      //grab the button's data-type is
      var type = $(this).data("type");
      console.log("selected data-type: " + type);

      if (skillPoints !== 0) {
        //if skill points > 0, you can add +2 to a trait
        switch (type) {
          case "hp":
            if (character.hp <= 59) {
              character.hp += 2;
              skillPoints -= 1;

              console.log("Added hp");
              $(".skill-display").text("Skill Points: " + skillPoints);
              console.log("HP: " + character.hp);
              $(".hp-display").text("HP: " + character.hp);
            }

            break;

          case "def":
            if (character.hp <= 59) {
              character.def += 2;
              skillPoints -= 1;

              console.log("Added Def");
              $(".skill-display").text("Skill Points: " + skillPoints);
              console.log("Def: " + character.def);
              $(".def-display").text("Def: " + character.def);
            }
            break;

          case "str":
            if (character.str <= 59) {
              character.str += 2;
              skillPoints -= 1;

              console.log("Added str");
              $(".skill-display").text("Skill Points: " + skillPoints);
              console.log("str: " + character.str);
              $(".str-display").text("str: " + character.str);
            }

            break;
          case "spd":
            if (character.spd <= 59) {
              character.spd += 2;
              skillPoints -= 1;

              console.log("Added spd");
              $(".skill-display").text("Skill Points: " + skillPoints);
              console.log("spd: " + character.spd);
              $(".spd-display").text("spd: " + character.spd);
            }

            break;
        }
      }
    });

    $(".sub").on("click", function() {
      //grab the button's data-type is
      var type = $(this).data("type");
      console.log("selected data-type: " + type);

      if (skillPoints < 10) {
        //depending on the data-type, add diff stats
        switch (type) {
          case "hp":
            if (character.hp !== baseHp) {
              character.hp -= 2;
              skillPoints += 1;

              console.log("Removed hp");
              $(".skill-display").text("Skill Points: " + skillPoints);
              console.log("HP: " + character.hp);
              $(".hp-display").text("HP: " + character.hp);
            }

            break;

          case "def":
            if (character.def !== baseDef) {
              character.def -= 2;
              skillPoints += 1;

              console.log("Removed def");
              $(".skill-display").text("Skill Points: " + skillPoints);
              console.log("def: " + character.def);
              $(".def-display").text("def: " + character.def);
            }

            break;

          case "str":
            if (character.str !== baseStr) {
              character.str -= 2;
              skillPoints += 1;

              console.log("Removed str");
              $(".skill-display").text("Skill Points: " + skillPoints);
              console.log("str: " + character.str);
              $(".str-display").text("str: " + character.str);
            }

            break;

          case "spd":
            if (character.spd !== baseSpd) {
              character.spd -= 2;
              skillPoints += 1;

              console.log("Removed spd");
              $(".skill-display").text("Skill Points: " + skillPoints);
              console.log("spd: " + character.spd);
              $(".spd-display").text("spd: " + character.spd);
            }

            break;
        }
      }
    });
  },
  createEnemy: function(chapter) {
    //depending on the chapter we are on, create enemy with diff stats
    switch (chapter) {
      case 1: //3-2-2-3 60*3/4, 60*2/4, 60*2/4, 60*3/4
        enemy = new Enemy(45, 30, 30, 45);
        console.log("Enemy for chapter " + chapter + " created");
        fullHP = enemy.hp;
        break;
      case 2: //3-2-2-3 80*3/4, 80*2/4, 80*2/4, 80*3/4
        enemy = new Enemy(60, 40, 40, 60);
        console.log("Enemy for chapter " + chapter + " created");
        fullHP = enemy.hp;
        break;
      case 3: //3-2-2-3 100*3/4, 100*2/4, 100*2/4, 100*3/4
        enemy = new Enemy(75, 50, 50, 75);
        console.log("Enemy for chapter " + chapter + " created");
        fullHP = enemy.hp;
        break;
    }

    // $(".enemy-hp").text("Enemy HP: " + enemy.hp);
    // $(".enemy-str").text("Enemy Str: " + enemy.str);
    // $(".enemy-def").text("Enemy Def: " + enemy.def);
    // $(".enemy-spd").text("Enemy Spd: " + enemy.spd);
  },
  pickTarget: function(grabbedTarget) {
    switch (grabbedTarget) {
      case "head": //lower hit chance, higher damage
        target = new Target(grabbedTarget, 0.15, 50, 0);
        break;
      case "body": //higher hit chance, lower damage
        target = new Target(grabbedTarget, 0.95, 0, 0);
        break;
      case "legs": //medium hit chance, lowers speed
        target = new Target(grabbedTarget, 0.75, 0, 5);
        break;
    }
  },
  setUpFight: function(chapter) {
    //load chapter status
    // this.loadChapt();
    //creates enemy using chapter data
    this.createEnemy(chapter);
  }
};

function populateBattle() { // eslint-disable-line no-unused-vars
    let i = chapter - 1;
    $("body").css("background-image", "url(\"" + (background[i]) + "\")");

    // display correct player portrait
    $(".player-avatar > img").attr("src", player.portrait);
    // display correct player name
    $(".character-name").text(player.name);
    // display correct player hp
    $(".player-stats").find(".hit-points").text("HP " + (character.hp).toFixed(0));
    // display correct hp amount on health bar
    $(".player-health-bar-fill").css("width", "100%");
    // display correct player sprite
    $(".player-sprite").attr("src", player.sprite);

    //enemy
    // display correct enemy portrait
    $(".enemy-avatar > img").attr("src", displayEnemy[i].portrait);
    // display correct enemy name
    $(".enemy-name").text(displayEnemy[i].name);
    // dispaly correct enemy hp
    $(".enemy-stats").find(".hit-points").text("HP " + enemy.hp.toFixed(0));
    // display correct hp amount on health bar
    $(".enemy-health-bar-fill").css("width", "100%");
    // display correct enemy sprite
    $(".enemy-sprite").html("").append(displayEnemy[i].sprite);

    animateEntrance();
    listenForHover();
    adjustPopupDistance();
}


// update health bar on encounter page after each attack
function updateEnemyHealthBar() { // eslint-disable-line no-unused-vars
  var hpPercentage = enemy.hp / fullHP * 100;
  $(".enemy-stats").find(".hit-points").text("HP " + (enemy.hp).toFixed(0));
  $(".enemy-health-bar-fill").css("width", hpPercentage + "%");
  console.log("currentHP: " + enemy.hp);
}

function updatePlayerHealthBar() { // eslint-disable-line no-unused-vars
  var hpPercentage = character.hp / fullHP * 100;
  $(".player-stats").find(".hit-points").text("HP " + (character.hp).toFixed(0));
  $(".player-health-bar-fill").css("width", hpPercentage + "%");
  console.log("currentHP: " + character.hp);
}

// trigger modals for a win or lose scenario
function toggleWinLoseModals(state) { // eslint-disable-line no-unused-vars
  if (state === "win") {
    // let completed = true;
    setTimeout(function() {
      $("#winModal").modal("show");
    }, 1000);
    // postChapterWin(completed);
    setTimeout(function() {
      window.location.assign("/world"); // redirects without replacing current page.
    }, 6000);
  } else if (state === "lose") {
    setTimeout(function() {
      $("#loseModal").modal("show");
    }, 2000);
  }
  
}