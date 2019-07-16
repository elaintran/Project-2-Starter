


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

$(document).ready(function(){
  //loads any saved chapters
  // gameManager.loadChapt();
  console.log("Chapter: " + chapter);
  //loads chapter status and creates designated enemy
  gameManager.setUpFight(chapter);
  console.log('Enemy Strength: ' + enemy.str + " Enemy HP: " + enemy.hp);

  //loads character data
  // gameManager.loadChar();
})

character = {
  classType: "thief",
  hp: 1000,
  def: 200,
  str: 300,
  spd: 4
}

console.log("Character HP: " + character.hp + " Character Strength: " + character.str);

//random chance
var chance = Math.floor();

var baseDmg;
var enemySpd;

//what happens when the character attacks
let charAtk = function(grabbedTarget){
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

$('button').on('click', function(){
  //holds character/enemy base speeds prior to actions taken
  var charSpd = character.spd;
  var enemySpd = enemy.spd;

  //clicking the target grabs the character's target and populates the target statistics
  grabbedTarget = $(this).attr('data-target');
  gameManager.pickTarget(grabbedTarget);

  if((charSpd > enemySpd) && (character.hp != 0) && (enemy.hp != 0)){
    charAtk(grabbedTarget);

    let totalDmg = baseDmg - enemy.def;
    enemy.hp -= totalDmg;

    console.log("Enemy hp: " + enemy.hp);

    if(enemy.hp = 0){
      //do whatever you want to happen when you win

      if(chapter < 3){
        //increase chapter 
        chapter += 1;
        console.log("Chapter: " + chapter);

        // gameManager.saveChapt();

      //redirect to point distribution page

      } else {
        //whatever happens when you beat the game

      }
    }

  } else if ((enemySpd > charSpd) && (character.hp != 0) && (enemy.hp != 0)) {
    let totalDmg = enemy.str - character.def;
    character.hp -= totalDmg;

    console.log("character hp: " + character.hp)

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