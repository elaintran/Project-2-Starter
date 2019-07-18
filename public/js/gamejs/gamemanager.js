//total skill points up for distribution by the player is 10. Each point adds +2 to the character's stats.
let skillPoints = 10;

var enemy;
let target; // eslint-disable-line no-unused-vars

//keeps track of which chapter user is on
let chapter = 1; // eslint-disable-line no-unused-vars
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
  // loadChar: function() {
  //   $.get("/character/stats", function(response) {
  //     //grabs character base stats
  //   });
  // },
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

    $(".enemy-hp").text("Enemy HP: " + enemy.hp);
    $(".enemy-str").text("Enemy Str: " + enemy.str);
    $(".enemy-def").text("Enemy Def: " + enemy.def);
    $(".enemy-spd").text("Enemy Spd: " + enemy.spd);
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

// update health bar on encounter page after each attack
function updateEnemyHealthBar() {
  var hpPercentage = enemy.hp / fullHP * 100;
  $(".enemy-stats").find(".hit-points").text("HP " + enemy.hp);
  $(".enemy-health-bar-fill").css("width", hpPercentage + "%");
  console.log("currentHP: " + enemy.hp);
}

function updatePlayerHealthBar() {
  var hpPercentage = character.hp / fullHP * 100;
  $(".player-stats").find(".hit-points").text("HP " + character.hp);
  $(".player-health-bar-fill").css("width", hpPercentage + "%");
  console.log("currentHP: " + character.hp);
}
