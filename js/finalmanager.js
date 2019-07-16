//GAME MANAGER ON ALL PAGES
let character;
let skillPoints = 4;

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
  }
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

  //upon clicking the confirm button (with class 'confirm-btn'):
  $('.confirm-btn').on("click", function(){
    //finalizes character customization and posts new character stats
    gameManager.saveChar();
  })
});
