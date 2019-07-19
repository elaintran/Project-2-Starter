var chance;
var baseDmg;
var totalDmg;
var enemyTotalDmg;
var speed;
var cap;

character.spd = 50;

let determineCap = function() {
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
};

let calculateDamage = function() {
  baseDmg = (character.str + target.bonus).toFixed(0);
  totalDmg = (baseDmg - (enemy.def / cap) * character.str).toFixed(0);
};

let checkEnemyHP = function() {
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
};

let doubleHit = function(){
  speed = ((character.spd - enemy.spd) * 2) / 100;
  chance = Math.random();
};

let hitEnemy = function(){
  enemy.hp -= Math.ceil(totalDmg);
};

let levelUp = function(){
  character.hp += 15;
  character.str += 15;
  character.def += 15;
  character.spd += 15;
};

let calcEnemyDmg = function(){
  determineCap();
  let defense = character.def / cap;
  let totalDef = defense * enemy.str;

  enemyTotalDmg = enemy.str - totalDef;
};

//Character attack sets the character's total damage based on character strength and enemy defense if they hit using the grabbed target
let characterAttack = function(grabbedTarget) {
  if (grabbedTarget === target.target) {
    chance = Math.random();

    if (chance <= target.hitChance) {
      determineCap();
      calculateDamage();
      hitEnemy();
      checkEnemyHP();

    } else {
      //attack missed
      totalDmg = 0;

      console.log("Attack missed! Base damage was 0.");
    }
  }
};
//********************************************************************************************************** */
$(document).ready(function() {
  $.get("/api/userdata").then(function() {
    var userId = data.userId;
    gameManager.loadChar(userId);
  });

  $(".cls-1").each(function() {
    $(this).click(function() {
      grabbedTarget = $(this)
        .parent()
        .attr("data-target");

      gameManager.pickTarget(grabbedTarget);

      if (character.hp > 0 && enemy.hp > 0) {
        if (character.spd > enemy.spd) {
          console.log("Your character attacked first!");

          characterAttack(grabbedTarget);

          doubleHit();

          if (chance < speed) {
            hitEnemy();
            checkEnemyHP();
          }

          //if enemy health falls below zero:
          if (enemy.hp <= 0) {
            enemy.hp = 0;

            //set HP text to 0 and update health bar
            $(".enemy-stats")
              .find(".hit-points")
              .text("HP " + 0);

            updateEnemyHealthBar();
            toggleWinLoseModals("win");
            console.log("You defeated the enemy!");

            chapter += 1;

            levelUp();


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

            calcEnemyDmg();

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
          //calculates enemy total damage
          calcEnemyDmg();

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
            characterAttack(grabbedTarget);

            //deal damage
            hitEnemy();

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
              $(".enemy-stats")
                .find(".hit-points")
                .text("HP " + 0);
                
                updateEnemyHealthBar();
                toggleWinLoseModals("win");
              
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
            toggleWinLoseModals("lose");
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
        toggleWinLoseModals("win");
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

