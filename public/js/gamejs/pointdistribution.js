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

var baseHp = character.hp; // eslint-disable-line no-unused-vars
var baseDef = character.def; // eslint-disable-line no-unused-vars
var baseStr = character.str; // eslint-disable-line no-unused-vars
var baseSpd = character.spd; // eslint-disable-line no-unused-vars

$(document).ready(function() {
  //listen for "add/sub" class and distribute skill points
  gameManager.customChar(character);

});

//upon clicking the confirm button (with class "confirm-btn"):
$(".confirm-btn").on("click", function(){
  //finalizes character customization and posts new character stats
  // gameManager.saveChar();

  //redirect user to the story page
});
