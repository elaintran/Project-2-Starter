let character;
let target;
let randomTar;
let grabbedTarget;
let grabbedClass;
let chance = Math.floor();
let baseDmg;
let enemySpd;
let enemyBaseDmg;
let currentChapt = 1;
var points = 4;

function Character(classType, hp, def, str, spd) {
  this.classType = classType;
  this.hp = hp;
  this.def = def;
  this.str = str;
  this.spd = spd;
}

function Chapter(
  chaptOne,
  chaptTwo,
  chaptThree,
  chaptOneOn,
  chaptTwoOn,
  chaptThreeOn
) {
  this.chaptOne = chaptOne;
  this.chaptTwo = chaptTwo;
  this.chaptThree = chaptThree;
  this.chaptOneOn = chaptOneOn;
  this.chaptTwoOn = chaptTwoOn;
  this.chaptThreeOn - chaptThreeOn;
}

function Target(target, hitChance, bonus, redSpd) {
  this.target = target;
  this.hitChance = hitChance;
  this.bonus = bonus;
  this.reduceSpd = reduceSpd;
}

let charMoves = {
  calcAtk: function() {
    //higher spd attacks first
    let charSpd = character.spd;
    let enemySpd = enemy.spd;

    //player attacks
    let charAtk = function() {
      //if target is whatever the target clicked was:
      if (target.target === grabbedTarget) {
        //if the hit chance is whatever that target's hit chance was (0.25 for head, 0.95 for body), add that target's bonus damage to the attack damage
        if (chance <= target.hitChance) {
          baseDmg = character.str + target.bonus;
          enemySpd -= target.reduceSpd;
        } else {
          //attack missed
          baseDmg = 0;
        }
      }

      return baseDmg;
    };

    let enemyAtk = function() {
      //assigns random target for enemy (1/3 chance)
      let enemyTar = function() {
        if (chance <= 0.3) {
          randomTar = "heads";
        } else if (0.31 < chance <= 0.6) {
          randomTar = "body";
        } else {
          randomTar = "legs";
        }
      };
      //passes random target to functions
      if (target.target === randomTar) {
        //if the hit chance is whatever that target's hit chance was (0.25 for head, 0.95 for body), add that target's bonus damage to the attack damage
        if (chance <= target.hitChance) {
          enemyBaseDmg = enemy.str + target.bonus;
          charSpd -= target.reduceSpd;
        } else {
          //attack missed
          enemyBaseDmg = 0;
        }
      }

      return enemyBaseDmg;
    };

    //if character speed > enemy speed, user attacks first
    if (charSpd >= enemySpd) {
      charAtk();
      let totalDmg = baseDmg - enemy.def;
      enemy.hp = enemy.hp - totalDmg;

      //display text showing damage dealt
      $("#dmg-display").text("You attacked for" + totalDmg + "damage!");

      //reflect damage taken
      $("#hp-display").innerHTML("Whatever you want here");

      if (enemy.hp <= 0) {
        //display text showing damage dealt
        $("#dmg-display").text(
          "You've defeated the enemy and leveled up! Level up your new skills and prepare for the next battle!"
        );

        //replace fight scene with point distribution options

        //set chapter

        gameManager.distrbPoints();
      } else {
        enemyAtk();
        let totalDmg = enemyBaseDmg - character.def;
        character.hp -= totalDmg;

        //display text showing damage dealt
        $("#dmg-display").text("You've been hit for" + totalDmg + "damage!");

        //reflect damage taken
        $("#hp-display").innerHTML("Whatever you want here");

        if (character.hp <= 0) {
          $("#dmg-display").text("You've been slain!");

          //go back to selection screen
        }
      }
    } else if (enemySpd > charSpd) {
      enemyAtk();
      let totalDmg = enemyBaseDmg - character.def;
      character.hp -= totalDmg;

      //display text showing damage dealt
      $("#dmg-display").text("You've been hit for" + totalDmg + "damage!");

      //reflect damage taken
      $("#hp-display").innerHTML("Whatever you want here");

      if (character.hp <= 0) {
        $("#dmg-display").text("You've been slain!");

        //go back to selection screen
      } else {
        charAtk();
        let totalDmg = baseDmg - enemy.def;
        enemy.hp = enemy.hp - totalDmg;

        //display text showing damage dealt
        $("#dmg-display").text("You attacked for" + totalDmg + "damage!");

        //reflect damage taken
        $("#hp-display").innerHTML("Whatever you want here");

        if (enemy.hp <= 0) {
          //display text showing damage dealt
          $("#dmg-display").text(
            "You've defeated the enemy and leveled up! Level up your new skills and prepare for the next battle!"
          );

          //replace fight scene with point distribution options

          pointDistr();

          //keep track of stage:
          currentChapt += 1;

          //if current chapter is 2, set chapter one to completed/disabled and turn on chapter 2
          if (currentChapt === 2) {
            Chapter.chaptOne = "complete";
            Chapter.chaptOneOn = "disabled";

            Chapter.chaptTwoOn = "enabled";
          } else if (currentChapt === 3) {
            //if current chapter is 3, set chapter two to completed/disabled and turn on chapter 3
            Chapter.chaptTwo = "complete";
            Chapter.chaptTwoOn = "disabled";

            Chapter.chaptThreeOn = "enabled";
          }
        }
      }
    }
  }
};


//GAME MANAGER
//object holding game methods
let gameManager = {
  //game set up calls the character create and fight setup methods
  gameSetUp: function(classType) {
    this.createChar(classType);
    this.pickTarget(target);
    this.setUpFight(classType);
    this.pickTarget(randomTar);
  },
  //Character Select Page Triggers this function, grabbing user's character class and creating a character with those base stats and saving it
  charSelect: function(classType) {
    //create character using grabbed character class
    this.createChar(classType);

    //Check if character was created with correct base stats
    console.log(character);

    //save character data
    this.save(character);
  },
  //sets chapter buttons to default states
  createChapt: function() {
    //default all chapters incomplete
    chapter = new Chapter(
      "incomplete",
      "incomplete",
      "incomplete",
      "enabled",
      "disabled",
      "disabled"
    );

    $("#chapter-one").attr("completion-state", chapter.chaptOne);
    $("#chapter-two").attr("completion-state", chapter.chaptTwo);
    $("#chapter-three").attr("completion-state", chapter.chaptThree);

    //default only chapter one is enabled and without lock
    $("#chapter-one").attr("enable", chapter.chaptOneOn);
    $("#chapter-two").attr("enable", chapter.chaptTwoOn);
    $("#chapter-three").attr("enable", chapter.chaptThreeOn);
  },
  //method creates character with different base stats
  createChar: function(/*classType, hp, def, str, spd*/) {
    switch (classType) {
      case "fighter": //well rounded
        character = new Character(classType, 7000, 200, 700, 3);
        break;
      case "knight": //high hp and defense
        character = new Character(classType, 10000, 300, 500, 1);
        break;
      case "mage": //high attack
        character = new Character(classType, 5000, 100, 1000, 4);
        break;
      case "thief": //low hp and defense
        character = new Character(classType, 6000, 150, 800, 5);
        break;
    }
  },
  pickTarget: function() {
    switch (target) {
      case "head": //lower hit chance, higher damage
        target = new Target(target, 0.25, 100, 0);
        break;
      case "body": //higher hit chance, lower damage
        target = new Target(target, 0.95, 0, 0);
        break;
      case "legs": //medium hit chance, lowers speed
        target = new Target(target, 0.85, 0, 1);
        break;
    }
  },
  //method sets up fight
  setUpFight: function() {
    let enemy00 = new Enemy("enemy00", 7000, 200, 700, 3);
    let enemy01 = new Enemy("enemy01", 1400, 400, 1000, 6);
    let enemy02 = new Enemy("Boss", 20000, 600, 1500, 10);

    chapter = 1;
    switch (chapter) {
      case 1:
        enemy = enemy00;
        break;
      case 2:
        enemy = enemy01;
      case 3:
        enemy = enemy02;
    }
  },
  distrPoints: function() {
    //clicking the skill button with a specific value will add one point to that skill
    var operator = $(this).attr("data-pointDist");
    
    if (skillPoints != 0) {
      if (operator === 'addHp') {
        $(this).on("click", function() {
          character.hp += 500;
          points -= 1;
        });
      } else if (operator === 'addDef') {
        $(this).on("click", function() {
          character.def += 100;
          skill -= 1;
        });
      } else if (operator === 'addStr') {
        $(this).on("click", function() {
          character.str += 500;
          points -= 1;
        });
      } else if (operator === 'addSpd'){
        $(this).on("click", function() {
          character.spd += 1;
          points -= 1;
        });
      }
    }
  },
  //method saves character to local storage
  save: function() {
    var save = {
      char1: character,
      chapt1: chapter
    };

    localStorage.setItem("save", JSON.stringify(save));
  },
  //loads any saved character data
  load: function() {
    var savedChar = JSON.parse(localStorage.getItem("save"));
    var savedChapt = JSON.parse(localStorage.getItem("save"));
    if (savedChar != null && savedChar != undefined) {
      character = savedChar.char1;
      chapter = savedChapt.chapt1;
    }
  }
};

//clicking button with the "charClass" class grabs its value (fighter/knight/mage/thief) and triggers create character function for that class
$(this).on("click", function() {
  grabbedClass = $(this).attr("charClass");
  gameManager.gameSetUp(grabbedClass);

  gameManager.save();
});

//clicking button with the "target" class grabs its value (head/body/legs) and triggers select target function for that target
$(this).on("click", function() {
  grabbedTarget = $(this).attr("data-target");
  gameManager.pickTarget(grabbedTarget);
});

