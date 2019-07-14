let character;
let target;
let grabbedTarget;
let grabbedClass;
let chance = Math.floor();
let baseDmg;
let enemySpd;
let enemyBaseDmg;

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
            let randomTar;

            //assigns random target for enemy (1/3 chance)
            let enemyTar = function(){
                if(chance <= 0.3){
                    randomTar = "heads";
                } else if (0.31 < chance <= 0.6){
                    randomTar = "body";
                } else {
                    randomTar = "legs";
                }
            }
            //passes random target to functions
            if(target.target === randomTar){
                //if the hit chance is whatever that target's hit chance was (0.25 for head, 0.95 for body), add that target's bonus damage to the attack damage
                if(chance <= target.hitChance){
                    enemyBaseDmg = enemy.str + target.bonus;
                    enemySpd -= target.reduceSpd;
                } else {
                        //attack missed
                        enemyBaseDmg = 0;
                }
            }

            return enemyBaseDmg;
        }

        //if character speed > enemy speed, user attacks first
        if(charSpd >= enemySpd){
            charAtk();
            enemy.hp = enemy.hp - (baseDmg - enemy.def);
            
            //reflect damage taken
            $('#hp-display').innerHTML("Whatever you want here")
        }
    }

}