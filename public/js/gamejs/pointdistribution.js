//POINT DISTRIBUTION PAGE
$(document).on("click", function() {
  //listen for "add/sub" class and distribute skill points
  gameManager.customChar();
});

//upon clicking the confirm button (with class 'confirm-btn'):
$('.confirm-btn').on("click", function(){
  //finalizes character customization and posts new character stats
  gameManager.saveChar();

  //redirect user to the story page
})
