var chance;
var baseDmg;
var totalDmg;
var enemyTotalDmg;
var speed;
var cap;

console.log("Character Start HP: " + character.hp);
console.log("Character Start SPD: " + character.spd);

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

let enemyStillAlive = function() {
  if (enemy.hp >= 0) {
    $(".enemy-stats")
      .find(".hit-points")
      .text("HP " + enemy.hp.toFixed(0));

    updateEnemyHealthBar();

    console.log("Enemy is still alive!");
  }
};

let doubleHit = function() {
  speed = ((character.spd - enemy.spd) * 2) / 100;
  chance = Math.random();
};

let hitEnemy = function() {
  console.log("Enemy has been hit!");
  enemy.hp -= Math.ceil(totalDmg);
};

let levelUp = function() {
  console.log("Character has leveled up!");
  character.hp += 15;
  character.str += 15;
  character.def += 15;
  character.spd += 15;
};

let calcEnemyDmg = function() {
  determineCap();
  let defense = character.def / cap;
  let totalDef = defense * enemy.str;

  enemyTotalDmg = enemy.str - totalDef;
};

let enemyDead = function() {
  if (enemy.hp <= 0) {
    enemy.hp = 0;
    console.log("The enemy is dead!");

    $(".enemy-stats")
      .find(".hit-points")
      .text("HP " + 0);

    updateEnemyHealthBar();

    toggleWinLoseModals("win");

    chapter += 1;

    levelUp();

    if (chapter < 3) {
      console.log("You've completed a chapter! New Chapter: " + chapter);

      // gameManager.saveChapt();
    } else {
      console.log("You've completed all the chapters and beaten the game!");
      console.log("Chapter:" + chapter);
    }
  }
};

let characterAlive = function() {
  if (character.hp >= 0) {
    $(".player-stats")
      .find(".hit-points")
      .text("HP " + (character.hp / 3).toFixed(0));

    //updates hp bar
    updatePlayerHealthBar();
  }
};

let characterDead = function() {
  if (character.hp <= 0) {
    character.hp = 0;
    console.log("Character has died.");
    //display HP as 0
    $(".player-stats")
      .find(".hit-points")
      .text("HP " + 0);

    //update health bar
    updatePlayerHealthBar();
    toggleWinLoseModals("lose");
  }
};

let enemyAttack = function() {
  calcEnemyDmg();

  //deals damage to character
  character.hp -= Math.ceil(enemyTotalDmg);

  //if character hp is >0:
  characterAlive();

  //if character HP drops below zero:
  characterDead();
};

//Character attack sets the character's total damage based on character strength and enemy defense if they hit using the grabbed target
let characterAttack = function(grabbedTarget) {
  console.log("Character attacked!");
  console.log(grabbedTarget);
  if (grabbedTarget === target.target) {
    chance = Math.random();

    if (chance <= target.hitChance) {
      console.log("Character attacked the enemy!");
      determineCap();
      calculateDamage();
      hitEnemy();
      enemyStillAlive();
      enemyDead();
    } else {
      //attack missed
      totalDmg = 0;

      console.log("Character attacked, but the attack missed!");
    }
  }
};
//********************************************************************************************************** */
$(document).ready(function() {
  // $.get("/api/userdata").then(function() {
  //   var userId = data.userId;
  //   gameManager.loadChar(userId);
  // });

  gameManager.setUpFight();
  console.log("Enemy Start HP: " + enemy.hp);
  console.log("Enemy Start SPD: " + enemy.spd);

  $(".cls-1").each(function() {
    $(this).click(function() {
      grabbedTarget = $(this)
        .parent()
        .attr("data-target");

      gameManager.pickTarget(grabbedTarget);

      if (character.hp > 0 && enemy.hp > 0) {
        if (character.spd > enemy.spd) {
          console.log("Character attacked first!");

          characterAttack(grabbedTarget);

          doubleHit();

          if (chance < speed) {
            hitEnemy();
            enemyStillAlive();
            enemyDead();
          }

          enemyAttack();
        
        } else {
        
          enemyAttack();
          characterAttack(grabbedTarget);
        
        }
      }
    });
  });
});
