


//STORY PAGE
//redirect user to CHAPTER SELECT PAGE

//BATTLE ACTION PAGE
function Enemy(hp, def, str, spd){
  this.hp = hp;
  this.def = def;
  this.str = str;
  this.spd = spd;
}

function Target(target, hitChance, bonus, reduceSpd) {
  this.target = target;
  this.hitChance = hitChance;
  this.bonus = bonus;
  this.reduceSpd = reduceSpd;
}

//assigns enemy a random target
let enemyTarget = function(){
  if(chance <- 0.3){
    randomTarget = 'heads';
  } else if (0.31 < chance < 0.6){
    randomTarget = 'body';
  } else {
    randomTarget = 'legs';
  }

  return randomTarget;
};

document.onload = function(){
  //loads any saved chapters
  gameManager.loadChapt();

  //loads chapter status and creates designated enemy
  gameManager.setUpFight(chapter);

  //loads character data
  gameManager.loadChar();
}

//holds character/enemy base speeds prior to actions taken
var charSpd = character.spd;
var enemySpd = enemy.spd;

//random chance
var chance = Math.floor();

var baseDmg;
var enemySpd;
var randomTarget;
var enemyBaseDmg;

//what happens when the character attacks
let charAtk = function(){
  //if target = target clicked:
  if(target.target === grabbedTarget){
    //if chance falls within the hit chance:
    if(chance <= target.hitChance){
      //character's base damage will be char strength + target's additional bonus (added dmg for head/ no added dmg for body/legs)
      baseDmg = character.str + target.bonus;

      //enemy speed is reduced by target's assigne reduced speed (0 for head/body, -1 for legs)
      enemySpd -= target.reduceSpd;
    } else {
      //attack missed
      baseDmg = 0;
    }
  }

  return baseDmg;
}

let enemyAtk = function(){
  //randomly select enemy target
  enemyTarget();

  //grabs target stats using random target
  gameManager.pickTarget(randomTarget);
  
  //if target = random target assigned:
  if(target.target === randomTarget){
    //if chance falls within the hit chance:
    if(chance <= target.hitChance){
      //enemy's base damage will be enemy strength + target's additional bonus (added dmg for head/ no added dmg for body/legs)
      enemyBaseDmg = enemy.str + target.bonus;

      //enemy speed is reduced by target's assigne reduced speed (0 for head/body, -1 for legs)
      charSpd -= target.reduceSpd;
    } else {
      //attack missed
      enemyBaseDmg = 0;
    }
  }

  return enemyBaseDmg;
  
}

$(this).on('click', function(){
  //clicking the target grabs the character's target and populates the target statistics
  grabbedTarget = $(this).attr('data-target');
  gameManager.pickTarget(grabbedTarget);

  if((charSpd > enemySpd) && (character.hp != 0) && (enemy.hp != 0)){
    charAtk();

    let totalDmg = baseDmg - enemy.def;
    enemy.hp -= totalDmg;

    if(enemy.hp = 0){
      //do whatever you want to happen when you win

      if(chapter < 3){
        //increase chapter 
        chapter += 1;

        gameManager.saveChapt();

      //redirect to point distribution page

      } else {
        //whatever happens when you beat the game

      }
    }

  } else if ((enemySpd > charSpd) && (character.hp != 0) && (enemy.hp != 0)) {
    enemyAtk();

    let totalDmg = baseDmg - character.def;
    character.hp -= totalDmg;

    if(character.hp = 0){
      //do whatever you want to happen when you lose

      //redirect to character select page or restart level
    }
  }
  
})

//POINT DISTRIBUTION PAGE
//CHAPTER SELECT PAGE
//BATTLE ACTION PAGE
//WINNER'S PAGE