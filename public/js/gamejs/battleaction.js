//STORY PAGE
//redirect user to CHAPTER SELECT PAGE

//BATTLE ACTION PAGE

//testing code for example html page
// $(".character-hp").text("Character HP: " + character.hp);
// $(".character-str").text("Character Str: " + character.str);
// $(".character-def").text("Character Def: " + character.def);
// $(".character-spd").text("Character Spd: " + character.spd);

/*End of created for testing purposes: */

//random chance
var chance;
var baseDmg;
var totalDmg;
var enemyTotalDmg;
var speed;

//Character attack sets the character's total damage based on character strength and enemy defense if they hit using the grabbed target
let charAtk = function(grabbedTarget) {
  console.log(
    "Character Attack function triggered. Grabbed target was: " + grabbedTarget
  );

  //if target = target clicked:
  if (grabbedTarget === target.target) {
    //if chance falls within the hit chance:

    // console.log(
    //   "What you rolled: " + chance + "\nHit Chance: " + target.hitChance
    // );

    if (chance <= target.hitChance) {
      //character's base damage will be char strength + target's additional bonus (added dmg for head/ no added dmg for body/legs)

      baseDmg = (character.str + target.bonus).toFixed(0);
      let cap;
      // console.log("Chapter used for cap calculation: " + chapter);

      if (chapter) {
        switch (chapter) {
          case 1:
            cap = 60;
            console.log("Cap is " + cap);

            break;
          case 2:
            cap = 80;
            console.log("Cap is " + cap);

            break;
          case 3:
            cap = 100;
            console.log("Cap is " + cap);

            break;
        }
      }

      totalDmg = (baseDmg - (enemy.def / cap) * character.str).toFixed(0);

      // console.log("Your Character's Total Damage Dealt: " + totalDmg);
      // console.log("Enemy hp: " + enemy.hp);
    } else {
      //attack missed
      totalDmg = 0;

      console.log("Attack missed! Base damage was 0.");
    }
  }

  return totalDmg;
};

$(document).ready(function() {
  //loads any saved chapters
  // gameManager.loadChapt();
  //grab character class and chapter number

  //loads character data
  // gameManager.loadChar();

  //for each attack button (with class "cls-1"):
  $(".cls-1").each(function() {
    // console.log("Attack button clicked.");

    $(this).click(function() {
      //clicking the target grabs the character"s target and populates the target statistics
      grabbedTarget = $(this)
        .parent()
        .attr("data-target");
      // console.log("You've clicked on the " + grabbedTarget + " target!");

      //roll die to see if your attack hits (must be lower than target's hit chance)
      chance = Math.random();

      //creates hit chance based on target you chose
      gameManager.pickTarget(grabbedTarget);

      // console.log("Character speed: " + character.spd);
      // console.log("Enemy base speed: " + enemy.spd);

      //if both the enemy and character are alive:
      if (character.hp > 0 && enemy.hp > 0) {
        //if character is faster than enemy:
        if (character.spd > enemy.spd) {
          console.log("Your character attacked first!");

          //calculate total damage character will deal
          charAtk(grabbedTarget);

          //deal damage to enemy
          enemy.hp -= Math.ceil(totalDmg);

          //if enemy hp is greater than zero, show the enemy HP text and update the health bar
          if (enemy.hp >= 0) {
            $(".enemy-stats")
              .find(".hit-points")
              .text("HP " + enemy.hp.toFixed(0));

            updateEnemyHealthBar();

            console.log(
              "Enemy hp when character attacked first and their HP is above zero: " +
                enemy.hp
            );
          }

          // console.log(
          //   "The enemy took " + totalDmg + "damage in the first attack!");

          // $(".enemy-hp").text("Enemy HP: " + enemy.hp);
          // $(".enemy-str").text("Enemy Str: " + enemy.str);
          // $(".enemy-def").text("Enemy Def: " + enemy.def);
          // $(".enemy-spd").text("Enemy Spd: " + enemy.spd);

          //roll die again to see if your character's speed is high enought to launch a second attack before the enemy attacks
          chance = Math.random();

          //calculates character's odds of a double attack
          speed = ((character.spd - enemy.spd) * 2) / 100;

          if (chance < speed) {
            //hit enemy again
            enemy.hp -= Math.ceil(totalDmg);

            //if enemy hp is not zero, show the enemy text and update health bar
            if (enemy.hp >= 0) {
              $(".enemy-stats")
                .find(".hit-points")
                .text("HP " + enemy.hp.toFixed(0));

              console.log(
                "Enemy hp when character attacked two times first and their HP is above zero: " +
                  enemy.hp
              );

              updateEnemyHealthBar();
            }
            // console.log("The enemy was hit twice!");
            // console.log("The enemy took an additional " + totalDmg + "damage.");
            // console.log("Enemy hp: " + enemy.hp);

            // $(".enemy-hp").text("Enemy HP: " + enemy.hp);
            // $(".enemy-str").text("Enemy Str: " + enemy.str);
            // $(".enemy-def").text("Enemy Def: " + enemy.def);
            // $(".enemy-spd").text("Enemy Spd: " + enemy.spd);
          }

          //if enemy health falls below zero:
          if (enemy.hp <= 0) {
            enemy.hp = 0;

            //set HP text to 0 and update health bar
            $(".enemy-stats")
              .find(".hit-points")
              .text("HP " + 0);

            updateEnemyHealthBar();

            console.log("You defeated the enemy!");

            chapter += 1;

            //if you're still on stage 1 or 2
            if (chapter < 3) {
              console.log(
                "You've completed a chapter! New Chapter: " + chapter
              );

              // gameManager.saveChapt();

              //redirect to point distribution page
            } else {
              console.log(
                "You've completed all the chapters and beaten the game!"
              );
              console.log("Chapter:" + chapter);
              //whatever happens when you beat the game
            }
          } else {
            //if enemy is not dead, enemy attacks after you attack

            //calculates enemy total damage based on enemy strength and character defense
            enemyTotalDmg = enemy.str - character.def;

            //deals damage to character
            character.hp -= Math.ceil(enemyTotalDmg);

            //if character hp is >0:
            if (character.hp >= 0) {
              $(".player-stats")
                .find(".hit-points")
                .text("HP " + (character.hp / 3).toFixed(0));

              //updates hp bar
              updatePlayerHealthBar();
            }

            // $(".character-hp").text("Character HP: " + character.hp);
            // $(".character-str").text("Character Str: " + character.str);
            // $(".character-def").text("Character Def: " + character.def);
            // $(".character-spd").text("Character Spd: " + character.spd);

            console.log("The enemy attacked for " + enemyTotalDmg + "!");
            // console.log("character hp: " + character.hp);

            //if character HP drops below zero:
            if (character.hp <= 0) {
              character.hp = 0;
              console.log("Character has died.");

              //display HP as 0
              $(".player-stats")
                .find(".hit-points")
                .text("HP " + 0);

              //update health bar
              updatePlayerHealthBar();

              //whatever happens when character loses
            }
          }
        } else {
          //if character speed < enemy speed, the enemy attacks first
          console.log("The enemy attacked first.");

          //set cap to use in defense calculation (based on chapter)
          let cap;

          // console.log("Chapter used for cap calculation: " + chapter);

          if (chapter) {
            switch (chapter) {
              case 1:
                cap = 60;
                console.log("Cap is " + cap);

                break;
              case 2:
                cap = 80;
                console.log("Cap is " + cap);

                break;
              case 3:
                cap = 100;
                console.log("Cap is " + cap);

                break;
            }
          }

          //calculates enemy total damage
          let defense = character.def / cap;
          let totalDef = defense * enemy.str;

          enemyTotalDmg = enemy.str - totalDef;

          // console.log("Character defense: " + defense);
          // console.log("Character total defense: " + totalDef);
          // console.log("Enemy Total Damage: " + enemyTotalDmg);

          //deals enemy damage
          character.hp -= Math.ceil(enemyTotalDmg);
          console.log("Character got hit for " + enemyTotalDmg);
          console.log("Character hp after being hit first: " + character.hp);

          //if character hp is not zero or below
          if (character.hp > 0) {
            $(".player-stats")
              .find(".hit-points")
              .text("HP " + (character.hp / 3).toFixed(0));

            //updates hp bar
            updatePlayerHealthBar();
          } else {
            character.hp = 0;
            console.log(
              "Character hp dropped below zero when enemy attacked first."
            );
            $(".player-stats")
              .find(".hit-points")
              .text("HP " + 0);

            //updates hp bar
            updatePlayerHealthBar();
          }

          // console.log("The enemy attacked first for " + enemyTotalDmg + "!");
          // // console.log("Character hp is now :" + character.hp);

          // $(".character-hp").text("Character HP: " + character.hp);
          // $(".character-str").text("Character Str: " + character.str);
          // $(".character-def").text("Character Def: " + character.def);
          // $(".character-spd").text("Character Spd: " + character.spd);

          //check character HP. If alive, they attack next
          if (character.hp > 0) {
            console.log("Character attacked second.");

            //calculate damage
            charAtk(grabbedTarget);

            //deal damage
            enemy.hp -= Math.ceil(totalDmg);

            //if enemy is alive show enemy hp text and update hp bar
            if (enemy.hp >= 0) {
              $(".enemy-stats")
                .find(".hit-points")
                .text("HP " + enemy.hp.toFixed(0));

              updateEnemyHealthBar();
            }

            // console.log("Enemy hp after hit: " + enemy.hp);

            // $(".enemy-hp").text("Enemy HP: " + enemy.hp);
            // $(".enemy-str").text("Enemy Str: " + enemy.str);
            // $(".enemy-def").text("Enemy Def: " + enemy.def);
            // $(".enemy-spd").text("Enemy Spd: " + enemy.spd);

            //if enemy hp below 0
            if (enemy.hp <= 0) {
              //do whatever you want to happen when you win
              enemy.hp = 0;
              //show enemy hp at 0 and update hp bar
              $(".enemy-stats")
                .find(".hit-points")
                .text("HP " + 0);

              updateEnemyHealthBar();

              console.log("You defeated the enemy!");
              // console.log("Chapter: " + chapter);

              if (chapter < 3) {
                chapter += 1;
              }

              //if you're still on stage 1 or 2
              if (chapter < 3) {
                console.log(
                  "You've completed a chapter! New Chapter: " + chapter
                );

                // gameManager.saveChapt();

                //redirect to point distribution page
              } else {
                console.log(
                  "You've completed all the chapters and beaten the game!"
                );
                // console.log("Chapter:" + chapter);
                //whatever happens when you beat the game
              }
            }
          } else {
            //do whatever you want to happen when you lose
            $(".player-stats")
              .find(".hit-points")
              .text("HP " + (character.hp / 3).toFixed(0));

            //updates hp bar
            updatePlayerHealthBar();
            //redirect to character select page or restart level

            console.log("Character died.");
          }
        }
        //if character or enemy is dead, check to see if it is the character or enemy who is dead:
      } else if (character.hp <= 0) {
        character.hp = 0;
        console.log("Character died.");

        //display zero
        $(".player-stats")
          .find(".hit-points")
          .text("HP " + 0);

        updatePlayerHealthBar();
      } else {
        console.log("You've defeated the enemy!");
        console.log("Chapter: " + chapter);
        chapter += 1;

        if (chapter < 3) {
          console.log("You've completed a chapter! New Chapter: " + chapter);

          // gameManager.saveChapt();

          //redirect to point distribution page
        } else {
          console.log("You've completed all the chapters and beaten the game!");

          console.log("Chapter: " + chapter);
          //whatever happens when you beat the game
        }
      }
    });
  });
});

//POINT DISTRIBUTION PAGE
//CHAPTER SELECT PAGE
//BATTLE ACTION PAGE
//WINNER'S PAGE
