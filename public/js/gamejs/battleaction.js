


//STORY PAGE
//redirect user to CHAPTER SELECT PAGE

//BATTLE ACTION PAGE

/*Created for testing purposes: */
character = {
  classType: "thief",
  hp: 1000,
  def: 200,
  str: 300,
  spd: 4
};

console.log("character HP: " + character.hp + "\ncharacter str: " + character.str + "\ncharacter def: " + character.def);
/*End of created for testing purposes: */

//random chance
var chance = Math.random();
var baseDmg;
var enemySpd;
var totalDmg;
var charSpd;
var enemySpd;

//what happens when the character attacks
let charAtk = function(grabbedTarget){
  console.log("CharAtk triggered. Grabbed target was: " + grabbedTarget);

  console.log("Your target should the " + target.target);

  //if target = target clicked:
  if(grabbedTarget === target.target){
    //if chance falls within the hit chance:

    console.log("What you rolled: " + chance + "\nHit Chance: " + target.hitChance);

    if(chance <= target.hitChance){
      //character's base damage will be char strength + target's additional bonus (added dmg for head/ no added dmg for body/legs)

      baseDmg = character.str + target.bonus;
      totalDmg = baseDmg - enemy.def;

      console.log("Base Damage: " + baseDmg);

      //enemy speed is reduced by target's assigne reduced speed (0 for head/body, -1 for legs)
      enemySpd -= target.reduceSpd;
    } else {
      //attack missed
      totalDmg = 0;
      console.log("Chance: " + chance);
      console.log("Attack missed! Base damage was 0.");
    }
  }

  return baseDmg;
};

$(document).ready(function(){
  //loads any saved chapters
  // gameManager.loadChapt();

  /*Created for testing purposes: */
  console.log("Current chapter: " + chapter);


  //loads chapter status and creates designated enemy
  gameManager.setUpFight(chapter);

  /*Created for testing purposes: */
  console.log("Enemy with an HP of: " + enemy.hp + " has been created!");

  //holds character/enemy base speeds prior to actions taken
  charSpd = character.spd;
  enemySpd = enemy.spd;
  //loads character data
  // gameManager.loadChar();
});

$("button").on("click", function(){
<<<<<<< HEAD
  //clicking the target grabs the character's target and populates the target statistics
=======
  //clicking the target grabs the character"s target and populates the target statistics
>>>>>>> master
  grabbedTarget = $(this).attr("data-target");

  console.log("You've clicked on the " + grabbedTarget + " target!");

  gameManager.pickTarget(grabbedTarget);
  console.log("Target object created: " + target.target);

  console.log("Character speed: " + charSpd);
  console.log("Enemy base speed: " + enemy.spd);

  if((charSpd > enemySpd) && (character.hp !== 0) && (enemy.hp !== 0)){

    console.log("Your character attacked first!");

    charAtk(grabbedTarget);

    enemy.hp -= totalDmg;

    console.log("Enemy took a hit! Current enemy hp: " + enemy.hp);

    if(enemy.hp = 0){
      //do whatever you want to happen when you win

      console.log("You defeated the enemy!");

      if(chapter < 3){
        //increase chapter 
        chapter += 1;
        console.log("You've completed a chapter! New Chapter: " + chapter);

        // gameManager.saveChapt();

      //redirect to point distribution page

      } else {
        //whatever happens when you beat the game

      }
    }

  } else if ((enemySpd > charSpd) && (character.hp !== 0) && (enemy.hp !== 0)) {
    let totalDmg = enemy.str - character.def;
    character.hp -= totalDmg;

    console.log("character took a hit! Current hp: " + character.hp);

    if(character.hp = 0){
      //do whatever you want to happen when you lose

      //redirect to character select page or restart level

      console.log("Character died.");
    }
  }
  
});

//POINT DISTRIBUTION PAGE
//CHAPTER SELECT PAGE
//BATTLE ACTION PAGE
//WINNER'S PAGE