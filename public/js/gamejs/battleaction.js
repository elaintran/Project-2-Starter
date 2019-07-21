var chance;
var baseDmg;
var totalDmg;
var enemyTotalDmg;
var speed;
var cap;

let determineCap = function () {
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

let calculateDamage = function () {
  baseDmg = ((character.str/3) + target.bonus);
  totalDmg = (baseDmg - (enemy.def / 10));
};

let enemyStillAlive = function () {
  if (enemy.hp >= 0) {
    $(".enemy-stats")
      .find(".hit-points")
      .text("HP " + enemy.hp.toFixed(0));

    updateEnemyHealthBar();

    console.log("Enemy is still alive!");
    $(".prompt-box").stop().fadeIn(350);
  }
};

let doubleHit = function () {
  speed = ((character.spd - enemy.spd) * 2) / 100;
  chance = Math.random();
};

let hitEnemy = function () {
  console.log("Enemy has been hit!");
  playerStrike();
  shakeEnemy(totalDmg);
  enemy.hp -= Math.ceil(totalDmg);
  animationsTimer = false;
};

let levelUp = function () {
  console.log("Character has leveled up!");
  character.hp += 15;
  character.str += 15;
  character.def += 15;
  character.spd += 15;
};

let calcEnemyDmg = function () {
  let defense = character.def / 10;
  enemyTotalDmg = ((enemy.str/5) + Math.floor(Math.random()*5)) - defense;
};

let enemyDead = function () {
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

    if (chapter < 5) {
      console.log("You've completed a chapter! New Chapter: " + chapter);
      // debugger;
      getUserId(chapter);
      // gameManager.saveChapt();
    } else {
      console.log("You've completed all the chapters and beaten the game!");
      console.log("Chapter:" + chapter);
    }

    // call PUT to update database with chapter here
    // updateChapter(chapter);
  }

  function postChapterOneData(Id, chapterNum) {
    $.ajax({
      method: "PUT",
      url: `/api/users/${Id}`,
      data: (chapterNum === 2) ? { chapterTwo: true } : (chapterNum === 3) ? { chapterThree: true } : (chapterNum === 4) ? { chapterFour: true } : console.log("game completed")
    });
  }

  function getUserId(chapter) {
    $.get("/api/userdata").then(function (data) {
      var userId = data.userId;
      postChapterOneData(userId, chapter);
    });
  }
};



let characterAlive = function () {
  if (character.hp >= 0) {
    $(".player-stats")
      .find(".hit-points")
      .text("HP " + (character.hp / 3).toFixed(0));

    updatePlayerHealthBar();
  }
};

let characterDead = function () {
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


let enemyAttack = function () {
  calcEnemyDmg();
  enemyStrike();
  shakePlayer(enemyTotalDmg);
  //deals damage to character
  character.hp -= Math.ceil(enemyTotalDmg);
  animationsTimer = false;

  //if character hp is >0:
  characterAlive();

  //if character HP drops below zero:
  characterDead();
};

//Character attack sets the character's total damage based on character strength and enemy defense if they hit using the grabbed target
let characterAttack = function (grabbedTarget) {
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
      playerStrike();
      slideEnemy();
      totalDmg = 0;



      console.log("Character attacked, but the attack missed!");
      $(".prompt-box").stop().fadeIn(350);
    }
  }
};


let game = function () {

  $(".cls-1").each(function () {
    $(this).click(function () {
      $(".prompt-box").stop().fadeOut(350);
      grabbedTarget = $(this)
        .parent()
        .attr("data-target");

      gameManager.animations();

      gameManager.pickTarget(grabbedTarget);

      setTimeout(fightCheck, 1000);
      
    });
  });
};

let checker = function () { // eslint-disable-line no-unused-vars
  if (openingScene) {
    game();
    console.log("checker: ", openingScene);
    $(".prompt-box").stop().fadeIn(350);
  }
};

let fightCheck = function () {
  if (animationsTimer) {
    attacks();
  }
};

let attacks = function () {
  console.log("Attacks are now active.");
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

      if ((character.hp > 0) && (enemy.hp > 0)) {
        setTimeout(enemyAttack, 1000);
        // enemyAttack();
      }

    } else {
      enemyAttack();

      if ((character.hp > 0) && (enemy.hp > 0)) {
        setTimeout(function () {
          characterAttack(grabbedTarget);
        }, 1000);
      }

    }
  }
};