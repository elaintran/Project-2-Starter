let character;
let target;
let grabbedTarget;
let grabbedClass;
let chance = Math.floor();
let baseDmg;
let enemyDmg;

function Character(classType, hp, def, str, spd){
    this.classType = classType;
    this.hp = hp;
    this.def = def;
    this.str = str;
    this.spd = spd;
}

function Target(target, hitChance, bonus, redSpd){
    this.target = target;
    this.hitChance = hitChance;
    this.bonus = bonus;
    this.redSpd = reduceSpd;
}

let charMoves = {
    calcAtk: function(){
        //higher spd attacks first
        let charSpd = character.spd;
        let enemySpd = enemy.spd;

        //player attacks 
        let charAtk = function(){

            //if target is whatever the target clicked was:
            if(target.target === grabbedTarget){
                //if the hit chance is whatever that target's hit chance was (0.25 for head, 0.95 for body), add that target's bonus damage to the attack damage
                if(chance <= target.hitChance){
                baseDmg = character.str + target.bonus;
                enemySpd -= target.reduceSpd;
                } else {
                    //attack missed
                    baseDmg = 0;
                }
            } 

            return baseDmg;
        }

        let enemyAtk = function(){
            //randomly select target
            if(target.target === randomTar){
                if(chance <= )
            }
        }
    }

}