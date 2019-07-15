let character;
let target;
let randomTar;
let grabbedTarget;
let grabbedClass;
let chance = Math.floor();
let baseDmg;
let enemySpd;
let enemyBaseDmg;
let currentChapt = 1;
var points = 4;


function Character(classType, hp, def, str, spd){
    this.classType = classType;
    this.hp = hp;
    this.def = def;
    this.str = str;
    this.spd = spd;
}

function Chapter(chaptOne, chaptTwo, chaptThree, chaptOneOn, chaptTwoOn, chaptThreeOn){
    this.chaptOne = chaptOne;
    this.chaptTwo = chaptTwo;
    this.chaptThree = chaptThree;
    this.chaptOneOn = chaptOneOn;
    this.chaptTwoOn = chaptTwoOn;
    this.chaptThreeOn - chaptThreeOn;
}

function Target(target, hitChance, bonus, redSpd){
    this.target = target;
    this.hitChance = hitChance;
    this.bonus = bonus;
    this.reduceSpd = reduceSpd;
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
                    charSpd -= target.reduceSpd;
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
            let totalDmg = baseDmg - enemy.def;
            enemy.hp = enemy.hp - totalDmg;
            
            //display text showing damage dealt
            $('#dmg-display').text("You attacked for" + totalDmg + "damage!")

            //reflect damage taken
            $('#hp-display').innerHTML("Whatever you want here")

            if(enemy.hp <= 0){
                //display text showing damage dealt
                $('#dmg-display').text("You've defeated the enemy and leveled up! Level up your new skills and prepare for the next battle!")

                //replace fight scene with point distribution options

                //set chapter

                gameManager.distrbPoints();

            } else {
                enemyAtk();
                let totalDmg = enemyBaseDmg - character.def;
                character.hp -= totalDmg;

                //display text showing damage dealt
                $('#dmg-display').text("You've been hit for" + totalDmg + "damage!")

                //reflect damage taken
                $('#hp-display').innerHTML("Whatever you want here")

                if(character.hp <= 0){
                    $('#dmg-display').text("You've been slain!");

                    //go back to selection screen
                }
            }
        } else if (enemySpd > charSpd){
            enemyAtk();
            let totalDmg = enemyBaseDmg - character.def;
            character.hp -= totalDmg;

            //display text showing damage dealt
            $('#dmg-display').text("You've been hit for" + totalDmg + "damage!")

            //reflect damage taken
            $('#hp-display').innerHTML("Whatever you want here")

            if(character.hp <= 0){
                $('#dmg-display').text("You've been slain!");

                //go back to selection screen
            } else {
                
            charAtk();
            let totalDmg = baseDmg - enemy.def;
            enemy.hp = enemy.hp - totalDmg;
            
            //display text showing damage dealt
            $('#dmg-display').text("You attacked for" + totalDmg + "damage!")

            //reflect damage taken
            $('#hp-display').innerHTML("Whatever you want here")

            if(enemy.hp <= 0){
                //display text showing damage dealt
                $('#dmg-display').text("You've defeated the enemy and leveled up! Level up your new skills and prepare for the next battle!")

                //replace fight scene with point distribution options
                
                pointDistr();

                //keep track of stage:
                currentChapt += 1;

                //if current chapter is 2, set chapter one to completed/disabled and turn on chapter 2
                if(currentChapt === 2){
                    Chapter.chaptOne = "complete";
                    Chapter.chaptOneOn = "disabled";

                    Chapter.chaptTwoOn = "enabled";
                } else if (currentChapt === 3){
                    //if current chapter is 3, set chapter two to completed/disabled and turn on chapter 3
                    Chapter.chaptTwo = "complete";
                    Chapter.chaptTwoOn = "disabled";

                    Chapter.chaptThreeOn = "enabled";
                }
            }
        }
    }

}