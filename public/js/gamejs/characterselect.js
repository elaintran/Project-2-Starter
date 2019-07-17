//SELECT CHARACTER PAGE
function Character(classType, hp, def, str, spd) {// eslint-disable-line no-unused-vars
  this.classType = classType;
  this.hp = hp;
  this.def = def;
  this.str = str;
  this.spd = spd;
}

//clicking button with the "charClass" class grabs its value (fighter/knight/mage/thief) and triggers create character function for that class
$("button").on("click", function() {
  grabbedClass = $(this).attr("character-class");
  console.log(grabbedClass);

  //Char Select fx creates character and posts data to server
  gameManager.charSelect(grabbedClass);
  
  console.log(character);
  //needs server to push data to database for storage

  // redirect the user to the point distribution page
});
