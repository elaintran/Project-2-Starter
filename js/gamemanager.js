//object holding game methods
let GameManager = {
    //game set up calls the character create and fight setup methods
    gameSetUp: function(characterClass){
        this.resetPlayer(characterClass);
        this.setUpFight(characterClass);
    },
    //method creates character
    resetPlayer: function(/*health, strength, defense, speed*/){
        switch(characterClass){
            case "fighter":
                player = new Player(characterClass, 125, 125, 125, 125);
                break;
            case "knight":
                player = new Player(characterClass, 200, 200, 50, 50);
                break;
            case "mage":
                player = new Player(characterClass, 50, 350, 50, 50);
                break;
            case "thief":
            player = new Player(characterClass, 100, 100, 150, 150);
            break;

        }
    },
    //method sets up fight
    setUpFight: function(){

    }
}

function save(){
    var save = {
        player: player,
        inventory: inventory,
        boss: boss
    }

    localStorage.setItem("save", JSON.stringify(save));
}

function load(){
    var savegame = JSON.parse(localStorage.getItem("save"));

    if (savegame !=null && savegame != undefined){
        inventory = savegame.inventory;
        player = savegame.player;
    }
}