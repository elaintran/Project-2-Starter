//POINT DISTRIBUTION PAGE
character = {
  classType : "mage",
  hp : 1,
  def : 2,
  str : 3,
  spd : 4
}
console.log("base character hp: " + character.hp);
console.log("Skill points: " + skillPoints);

$(".hp-display").text(character.hp);
$(".def-display").text(character.def);
$(".str-display").text(character.str);
$(".spd-display").text(character.spd);


$("button").on("click", function() {
  
  //listen for "add/sub" class and distribute skill points
  gameManager.customChar(character);
});

//upon clicking the confirm button (with class "confirm-btn"):
$(".confirm-btn").on("click", function(){
  //finalizes character customization and posts new character stats
  // gameManager.saveChar();

  //redirect user to the story page
})
