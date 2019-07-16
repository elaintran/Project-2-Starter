//POINT DISTRIBUTION PAGE
character = {
  classType : "mage",
  hp : 5,
  def : 5,
  str : 5,
  spd : 1
}; 
console.log("base character hp: " + character.hp);
console.log("Skill points: " + skillPoints);

$(".hp-display").text("HP: " + character.hp);
$(".def-display").text("DEF: " + character.def);
$(".str-display").text("STR: " + character.str);
$(".spd-display").text("SPD: " + character.spd);

var baseHp = character.hp;
var baseDef = character.def;
var baseStr = character.str;
var baseSpd = character.spd;

$(document).ready(function() {
  console.log("Saved Base HP: " + baseHp);
  console.log("Saved Base Def: " + baseDef);
  console.log("Saved Base Str: " + baseStr);
  console.log("Saved Base Spd: " + baseSpd);

  //listen for "add/sub" class and distribute skill points
  gameManager.customChar(character);

});

//upon clicking the confirm button (with class "confirm-btn"):
$(".confirm-btn").on("click", function(){
  //finalizes character customization and posts new character stats
  // gameManager.saveChar();

  //redirect user to the story page
});
