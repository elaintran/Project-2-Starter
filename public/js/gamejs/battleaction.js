//STORY PAGE
//redirect user to CHAPTER SELECT PAGE

//BATTLE ACTION PAGE

$(".character-hp").text("Character HP: " + character.hp);
$(".character-str").text("Character Str: " + character.str);
$(".character-def").text("Character Def: " + character.def);
$(".character-spd").text("Character Spd: " + character.spd);

/*End of created for testing purposes: */

//random chance
var chance;
var baseDmg;
var totalDmg;
var enemyTotalDmg;
var speed;

//what happens when the character attacks
let charAtk = function(grabbedTarget) {
  console.log(
    "Character Attack function triggered. Grabbed target was: " + grabbedTarget
  );

  //if target = target clicked:
  if (grabbedTarget === target.target) {
    //if chance falls within the hit chance:

    console.log(
      "What you rolled: " + chance + "\nHit Chance: " + target.hitChance
    );

    if (chance <= target.hitChance) {
      //character's base damage will be char strength + target's additional bonus (added dmg for head/ no added dmg for body/legs)

      baseDmg = character.str + target.bonus;
      let cap;
      console.log("Chapter used for cap calculation: " + chapter);

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

      totalDmg = baseDmg - (enemy.def / cap) * character.str;

      console.log("Your Character's Total Damage Dealt: " + totalDmg);
      console.log("Enemy hp: " + enemy.hp);

      //enemy speed is reduced by target's assigned reduced speed (0 for head/body, -1 for legs)
      if (enemy.spd > 0) {
        enemy.spd -= Math.ceil(target.reduceSpd);
        console.log("Enemy speed was reduced by: " + target.reduceSpd);
        console.log("Enemy speed: " + enemy.spd);
      } else {
        console.log("Enemy speed cannot go any lower.");
        console.log("Enemy speed: " + enemy.spd);
      }
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

  $(".cls-1").each(function() {
    console.log("Attack button clicked.");

    $(this).click(function() {
      //clicking the target grabs the character"s target and populates the target statistics
      grabbedTarget = $(this)
        .parent()
        .attr("data-target");
      console.log("You've clicked on the " + grabbedTarget + " target!");

      //roll die to see if your attack hits (must be lower than target's hit chance)
      chance = Math.random();

      //selects hit chance based on target you chose
      gameManager.pickTarget(grabbedTarget);

      console.log("Character speed: " + character.spd);
      console.log("Enemy base speed: " + enemy.spd);

      //if both the enemy and character are alive:
      if (character.hp > 0 && enemy.hp > 0) {
        //if character is faster than enemy:
        if (character.spd > enemy.spd) {
          console.log("Your character attacked first!");

          //calculate total damage character will deal
          charAtk(grabbedTarget);

          //deal damage to enemy
          enemy.hp -= Math.ceil(totalDmg);
          if(enemy.hp !== 0){
            
            $(".enemy-stats")
            .find(".hit-points")
            .text("HP " + enemy.hp.toFixed(0));
            updateEnemyHealthBar();
          }
          console.log(
            "The enemy took " + totalDmg + "damage in the first attack!"
          );

          $(".enemy-hp").text("Enemy HP: " + enemy.hp);
          $(".enemy-str").text("Enemy Str: " + enemy.str);
          $(".enemy-def").text("Enemy Def: " + enemy.def);
          $(".enemy-spd").text("Enemy Spd: " + enemy.spd);

          //roll die again to see if your character's speed is high enought to launch a second attack before the enemy attacks
          chance = Math.random();

          //calculates character's odds of a double attack
          speed = ((character.spd - enemy.spd) * 2) / 100;

          if (chance < speed) {
            enemy.hp -= Math.ceil(totalDmg);
            if(enemy.hp !== 0){
              
              $(".enemy-stats")
              .find(".hit-points")
              .text("HP " + enemy.hp.toFixed(0));
              updateEnemyHealthBar();
            }
            console.log("The enemy was hit twice!");
            console.log("The enemy took an additional " + totalDmg + "damage.");
            console.log("Enemy hp: " + enemy.hp);

            $(".enemy-hp").text("Enemy HP: " + enemy.hp);
            $(".enemy-str").text("Enemy Str: " + enemy.str);
            $(".enemy-def").text("Enemy Def: " + enemy.def);
            $(".enemy-spd").text("Enemy Spd: " + enemy.spd);
          }

          //check enemy HP
          if (enemy.hp <= 0) {
            //do whatever you want to happen when you win
            
            $(".enemy-stats")
              .find(".hit-points")
              .text("HP " + 0);
              updateEnemyHealthBar();
              toggleWinLoseModals("win");
            console.log("You defeated the enemy!");
            console.log("Chapter: " + chapter);

            //if you're still on stage 1 or 2
            if (chapter < 3) {
              //increase chapter
              chapter += 1;
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
            enemyTotalDmg = enemy.str - character.def;
            character.hp -= Math.ceil(enemyTotalDmg);
            if(character.hp !==0){
              $(".player-stats")
              .find(".hit-points")
              .text("HP " + (character.hp / 3).toFixed(0));
              console.log("first");
              updatePlayerHealthBar();
            }
            $(".character-hp").text("Character HP: " + character.hp);
            $(".character-str").text("Character Str: " + character.str);
            $(".character-def").text("Character Def: " + character.def);
            $(".character-spd").text("Character Spd: " + character.spd);

            console.log("The enemy attacked for " + enemyTotalDmg + "!");
            console.log("character hp: " + character.hp);

            //check character HP
            if (character.hp <= 0) {
              character.hp = 0;
              console.log("Character has died.");
              $(".player-stats")
                .find(".hit-points")
                .text("HP " + character.hp);
                console.log("second");
                updatePlayerHealthBar();

              //whatever happens when character loses
            }
          }
        } else {
          //if character speed < enemy speed, the enemy attacks first
          console.log("The enemy attacked first.");
          let cap;
          console.log("Chapter used for cap calculation: " + chapter);

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
          console.log("Character defense: " + defense);
          console.log("Character total defense: " + totalDef);
          console.log("Enemy Total Damage: " + enemyTotalDmg);

          //deals enemy damage
          character.hp -= Math.ceil(enemyTotalDmg);
          if(character.hp !== 0){
          $(".player-stats")
            .find(".hit-points")
            .text("HP " + (character.hp / 3).toFixed(0));
            console.log("third");
            updatePlayerHealthBar();
          }

          console.log("The enemy attacked first for " + enemyTotalDmg + "!");
          console.log("Character hp is now :" + character.hp);

          $(".character-hp").text("Character HP: " + character.hp);
          $(".character-str").text("Character Str: " + character.str);
          $(".character-def").text("Character Def: " + character.def);
          $(".character-spd").text("Character Spd: " + character.spd);

          //check character HP. If alive, they attack next
          if (character.hp > 0) {
            console.log("Character attacked second.");
            charAtk(grabbedTarget);

            enemy.hp -= Math.ceil(totalDmg);
            if(enemy.hp!==0){
              
              $(".enemy-stats")
              .find(".hit-points")
              .text("HP " + enemy.hp.toFixed(0));
              updateEnemyHealthBar();
              
            }
            console.log("Enemy hp after hit: " + enemy.hp);

            $(".enemy-hp").text("Enemy HP: " + enemy.hp);
            $(".enemy-str").text("Enemy Str: " + enemy.str);
            $(".enemy-def").text("Enemy Def: " + enemy.def);
            $(".enemy-spd").text("Enemy Spd: " + enemy.spd);

            //check enemy HP
            if (enemy.hp <= 0) {
              //do whatever you want to happen when you win
              enemy.hp = 0;
              $(".enemy-stats")
                .find(".hit-points")
                .text("HP " + 0);
                
                updateEnemyHealthBar();
                toggleWinLoseModals("win");
              
              console.log("You defeated the enemy!");
              console.log("Chapter: " + chapter);

              //if you're still on stage 1 or 2
              if (chapter < 3) {
                //increase chapter
                chapter += 1;
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
            }
          } else {
            //do whatever you want to happen when you lose

            //redirect to character select page or restart level
            toggleWinLoseModals("lose");
            console.log("Character died.");
          }
        }
      } else if (character.hp <= 0) {
        console.log("Character died.");
        character.hp = 0;
        $(".player-stats")
          .find(".hit-points")
          .text("HP " + character.hp);
          console.log("fourth");
          updatePlayerHealthBar();
      } else {
        toggleWinLoseModals("win");
        console.log("You've defeated the enemy!");
        console.log("Chapter: " + chapter);

        if (chapter < 3) {
          //increase chapter
          chapter += 1;
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
