//GAME MANAGER ON ALL PAGES
let character;
let skillPoints = 4;
let enemy;

//keeps track of which chapter user is on
let chapter = 1;

let gameManager = {
  charSelect: function(classType) {
    this.createChar(classType);
    this.saveChar();
  },
  customChar: function(){
    this.loadChar();
    this.distrPoints();
  },
  createChar: function(classType) {
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
  saveChar: function() {
    //posts character object to server. Needs server to put data into the database using sequelize
    $.post("/character/stats", character, function(response) {
      
    });

    //this portion belongs on the server page:
    db.Main.create(req.body).then(function() {
      //whatever happens
    });
  },
  loadChar: function() {
    $.get("/character/stats", function(response) {
      //grabs character base stats
    });
  },
  saveChapt: function() {
    //posts chapter data to server. Needs server to put data into the database using sequelize
    $.post("/chapter/status", chapter, function(response) {
      
    });

    //this portion belongs on the server page:
    db.Main.create(req.body).then(function() {
      //whatever happens
    });
  },
  loadChapt: function() {
    $.get("/chapter/status", function(response) {
      //grabs character status and sets the chapter status
      chapter = response;
    });
  },
  distrPoints: function() {
    //save base character stats before point distribution occurs as a record of the minimum base stats
    var baseHp = character.hp;
    var baseDef = character.def;
    var baseStr = character.str;
    var baseSpd = character.spd;
    
    //listen if any buttons with the class "add" is clicked:
    $(".add").on("click", function() {
      //grab the button's data-type is
      var type = $(this).data("type");
    
      if(skillPoints !=0){
      //depending on the data-type, add diff stats
      switch (type) {
        case "hp":
          character.hp += 500;
          skillPoints -= 1;

          break;

        case "def":
          character.def += 100;
          skillPoints -= 1;

          break;
        case "str":
          character.str += 500;
          skillPoints -= 1;

          break;
        case "spd":
          character.spd += 1;
          skillPoints -= 1;

          break;
      }
    }
    });

    $(".sub").on("click", function() {
      //grab the button's data-type is
      var type = $(this).data("type");
    
      if(skillPoints = 4){
      //depending on the data-type, add diff stats
      switch (type) {
        case "hp":
          if (character.hp != baseHp) {
            character.hp -= 500;
            skillPoints += 1;
          }

          break;

        case "def":
          if (character.def != baseDef) {
            character.def -= 100;
            skillPoints += 1;
          }

          break;

        case "str":
          if (character.str != baseStr) {
            character.str -= 500;
            skillPoints += 1;
          }

          break;

        case "hp":
          if (character.spd != baseSpd) {
            character.spd -= 1;
            skillPoints += 1;
          }

          break;
      }
    }
    });
  },
  createEnemy: function(chapter){
    //depending on the chapter we are on, create enemy with diff stats
    switch (chapter) {
      case 1:
        enemy = new Enemy(7000, 200, 700, 3);
        break;
      case 2:
        enemy = new Enemy(1400, 400, 1000, 6);
        break;
      case 3:
        enemy = new Enemy(20000, 600, 1500, 10);
        break;
    }
  },
  pickTarget: function(target) {
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
  setUpFight: function(chapter) {
    //load chapter status
    this.loadChapt();
    //creates enemy using chapter data
    this.createEnemy(chapter);
  },
};

//SELECT CHARACTER PAGE
function Character(classType, hp, def, str, spd) {
  this.classType = classType;
  this.hp = hp;
  this.def = def;
  this.str = str;
  this.spd = spd;
}

//clicking button with the "charClass" class grabs its value (fighter/knight/mage/thief) and triggers create character function for that class
$(this).on("click", function() {
  grabbedClass = $(this).attr("charClass");

  //Char Select fx creates character and posts data to server
  gameManager.charSelect(grabbedClass);

  //needs server to push data to database for storage

  // redirect the user to the point distribution page
});

//POINT DISTRIBUTION PAGE
$(document).on("click", function() {
  //listen for "add/sub" class and distribute skill points
  gameManager.customChar();
});

//upon clicking the confirm button (with class 'confirm-btn'):
$('.confirm-btn').on("click", function(){
  //finalizes character customization and posts new character stats
  gameManager.saveChar();

  //redirect user to the story page
})

//STORY PAGE
//redirect user to CHAPTER SELECT PAGE

//CHAPTER SELECT PAGE
//default chapter select page has all three chapters incomplete, chapter two and three locked

//clicking the chapter button sets the chapter variable to that stage (ie. if chapter one button id = 1, it will set the chapter to 1 upon selection/render data stored for chapter 1)
$(this).on("click", function(){
  var stage = $(this).attr("id");
  chapter = stage;

  //saves chapter data
  gameManager.saveChapt();

  //redirects user to the battle action page
})

//BATTLE ACTION PAGE
function Enemy(hp, def, str, spd){
  this.hp = hp;
  this.def = def;
  this.str = str;
  this.spd = spd;
}

function Target(target, hitChance, bonus, reduceSpd) {
  this.target = target;
  this.hitChance = hitChance;
  this.bonus = bonus;
  this.reduceSpd = reduceSpd;
}

//assigns enemy a random target
let enemyTarget = function(){
  if(chance <- 0.3){
    randomTarget = 'heads';
  } else if (0.31 < chance < 0.6){
    randomTarget = 'body';
  } else {
    randomTarget = 'legs';
  }

  return randomTarget;
};

document.onload = function(){
  //loads chapter status and creates designated enemy
  gameManager.setUpFight(chapter);

  //loads character data
  gameManager.loadChar();
}

//holds character/enemy base speeds prior to actions taken
var charSpd = character.spd;
var enemySpd = enemy.spd;

//random chance
var chance = Math.floor();

var baseDmg;
var enemySpd;
var randomTarget;
var enemyBaseDmg;

//what happens when the character attacks
let charAtk = function(){
  //if target = target clicked:
  if(target.target === grabbedTarget){
    //if chance falls within the hit chance:
    if(chance <= target.hitChance){
      //character's base damage will be char strength + target's additional bonus (added dmg for head/ no added dmg for body/legs)
      baseDmg = character.str + target.bonus;

      //enemy speed is reduced by target's assigne reduced speed (0 for head/body, -1 for legs)
      enemySpd -= target.reduceSpd;
    } else {
      //attack missed
      baseDmg = 0;
    }
  }

  return baseDmg;
}

let enemyAtk = function(){
  //randomly select enemy target
  enemyTarget();

  //grabs target stats using random target
  gameManager.pickTarget(randomTarget);
  
  //if target = random target assigned:
  if(target.target === randomTarget){
    //if chance falls within the hit chance:
    if(chance <= target.hitChance){
      //enemy's base damage will be enemy strength + target's additional bonus (added dmg for head/ no added dmg for body/legs)
      enemyBaseDmg = enemy.str + target.bonus;

      //enemy speed is reduced by target's assigne reduced speed (0 for head/body, -1 for legs)
      charSpd -= target.reduceSpd;
    } else {
      //attack missed
      enemyBaseDmg = 0;
    }
  }

  return enemyBaseDmg;
  
}

$(this).on('click', function(){
  //clicking the target grabs the character's target and populates the target statistics
  grabbedTarget = $(this).attr('data-target');
  gameManager.pickTarget(grabbedTarget);

  if((charSpd > enemySpd) && (character.hp != 0) && (enemy.hp != 0)){
    charAtk();

    let totalDmg = baseDmg - enemy.def;
    enemy.hp -= totalDmg;

    if(enemy.hp = 0){
      //do whatever you want to happen when you win

      //redirect to point distribution page
    }

  } else if ((enemySpd > charSpd) && (character.hp != 0) && (enemy.hp != 0)) {
    enemyAtk();

    let totalDmg = baseDmg - character.def;
    character.hp -= totalDmg;

    if(character.hp = 0){
      //do whatever you want to happen when you lose

      //redirect to character select page or restart level
    }
  }
  
})

//POINT DISTRIBUTION PAGE