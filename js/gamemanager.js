//object holding game methods
let gameManager = {
  //game set up calls the character create and fight setup methods
  gameSetUp: function(classType) {
    this.createChar(classType);
    this.pickTarget(target);
    this.setUpFight(classType);
    this.pickTarget(randomTar);
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
  distrPoints: function(){
    //clicking the skill button with a specific value will add one point to that skill
    var points = 4;
    var skill = $('#skill-btn').val()
    if(skill === character.hp){
        $('#skill-btn').on('click', function(){
            character.hp += 500;
        })
    } else if (skill === character.def){
        $('#skill-btn').on('click', function(){
            character.def += 100;
        })
    } else if (skill === character.str){
        $('#skill-btn').on('click', function(){
            character.str += 500;
        })
    } else {
        $('#skill-btn').on('click', function(){
            character.spd += 1;
        })
    }
  },
  //method saves character to local storage
  save: function() {
    var save = {
      char1: character
    };

    localStorage.setItem("save", JSON.stringify(save));
  },
  //loads any saved character data
  load: function() {
    var savedChar = JSON.parse(localStorage.getItem("save"));

    if (savedChar != null && savedChar != undefined) {
      character = savedChar.char1;
    }
  }
};

//clicking button with the "charClass" class grabs its value (warrior/knight/mage/thief) and triggers create character function for that class
$(".char-btn").on("click", function() {
  grabbedClass = $("#charClass").val();
  gameManager.gameSetUp(grabbedClass);
});

//clicking button with the "target" class grabs its value (head/body/legs) and triggers select target function for that target
$(".target-btn").on("click", function() {
  grabbedTarget = $("#target").val();
  gameManager.pickTarget(grabbedTarget);
});
