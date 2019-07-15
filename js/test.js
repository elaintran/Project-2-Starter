let character;

let gameManager = {
    gameSetUp: function(classType){
        this.createChar(classType);
    },
    createChar: function(classType){
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
    save: function(){
        db.main.create({
            mainClass: character.classType,
            mainHp: character.hp,
            mainStr: character.str,
            mainDef: character.def,
            mainSpd: character.spd,
        });

    },
    load: function(){

    }
}

function Character(classType, hp, def, str, spd){
    this.classType = classType;
    this.hp = hp;
    this.def = def;
    this.str = str;
    this.spd = spd;
}

//clicking button with the "charClass" class grabs its value (warrior/knight/mage/thief) and triggers create character function for that class
$(this).on("click", function() {
    grabbedClass = $(this).attr("charClass");
    gameManager.gameSetUp(grabbedClass);
  
    gameManager.save();
    console.log("Hopefully game saved");

    gameManager.load();
    console.log("Hopefully game loaded");

  });