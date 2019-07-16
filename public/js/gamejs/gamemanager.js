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
