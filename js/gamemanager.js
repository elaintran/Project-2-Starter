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

    stage = 1;
    switch (stage) {
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
