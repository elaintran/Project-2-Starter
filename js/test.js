let gameManager = {
    gameSetUp: function(classType){
        this.createChar(classType);
    },
    createChar: function(){
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
        var save = {
            char1: character
        };

        //push character data up to database
    },
    load: function(){
        var savedChar; //grab character from database
        if (savedChar != null && savedChar != undefined) {
            character = savedChar.char1;
        }
        console.log(character);
    }
}

let character;

function Character(classType, hp, def, str, spd){
    this.classType = classType;
    this.hp = hp;
    this.def = def;
    this.str = str;
    this.spd = spd;
}