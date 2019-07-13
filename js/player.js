let player;

let hitChance;
let dmg;
let crit;
let dcrSpd;

var c = Math.random();

//object holds target's stats
let target = {
    head: {
        hitChance: 0.25, //25% hit chance
        dmg: 50, //3 times damage
        dcrSpd: 0 //does not increase speed
    },
    body: {
        hitChance: 0.95, //95% hit chance
        dmg: 0, //no added damage
        dcrSpd: 0 //no decreased speed
    },
    legs: {
        hitChance: 0.85, //85% hit chance
        dmg: 0, //no added damage
        dcrSpd: 10 //decreases speed by flat rate
    }
}

//function calculates damage/speed decrease based on target
function calcDmg(target){
    if(target === "head"){
        if(d<=0.25){
            Enemy.health -= (player.strength + 100); 
        }
    } else if (target === "body"){
        if(d<=0.95){
            Enemy.health -= (player.strength);
        }
    } else {
        if(d <=0.85){
            Enemy.health -= (player.strength);
            Enemy.speed -= 50;
        }
    }
    
}

function Player(characterClass, health, strength, defense, speed){
    this.character_class = characterClass;
    this.character_hp = health;
    this.character_str = strength;
    this.character_def = defense;
    this.character_spd = speed
}

let gameMechanics = {
    firstMove: function(){
        if (player.speed > enemy.speed){
            //let player attack first
            gameMechanics.playerAttack();
        } else {
            //let enemy attack first
            gameMechanics.enemyAttack();
        }
    },
    pickTarget = function(){
        if (target === 'head'){
            hitChance = 0.25;
            criticalHit = 1.5;
            dcrSpd = 0;
        }
        else if (target === 'body'){
            hitChance = 0.95;
            criticalHit = 1;
            dcrSpd = 0;
        } else {
            hitChance = 0.75;
            criticalHit = 1;
            dcrSpd = 5;
        }
    },
    playerAttack = function(){
        playerAtkDmg = 
    }
}