let character;
let skillPoints = 4;

let gameManager = {
  gameSetUp: function(classType) {
    this.createChar(classType);
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
  save: function() {
    $.post("/url", character, function(response) {
      // do whatever you want after the server is done
    });

    //this portion belongs on the server page:
    db.Main.create(req.body).then(function() {
      //whatever happens
    });
  },
  load: function() {
    $.get("/url", function(response) {
      //probaby not needed. Check if data exists during user authentification/login, and populate handlebars with the user data if it exists, if it doesn't exist, just render the create user page
    });
  },
  distrPoints: function() {
    //listen if any buttons with the class "add" is clicked:
    $(".add").on("click", function() {
      //grab the button's data-type is
      var type = $(this).data("type");

      //save base character stats
      var baseHp = character.hp;
      var baseDef = character.def;
      var baseStr = character.str;
      var baseSpd = character.spd;
    
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
  gameManager.gameSetUp(grabbedClass);

  //save created character with base stats
  gameManager.save();
  console.log("Hopefully game saved");

  // redirect the user to the point distribution page
});

//********************************************* */on js file for the point distribution page the following JS:
$(this).on("click", function() {
  gameManager.distrPoints();
});
