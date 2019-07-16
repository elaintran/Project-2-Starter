//CHAPTER SELECT PAGE
//default chapter select page has all three chapters incomplete, chapter two and three locked

//clicking the chapter button redirects user to that chapter's attack page and sets the chapter variable to that stage (ie. if chapter one button id = 1, it will set the chapter to 1 upon selection/render data stored for chapter 1) 
// $(this).on("click", function(){
  // var stage = $(this).attr("id");
  // chapter = stage;

  // //saves chapter data
  // gameManager.saveChapt();

  //redirects user to the battle action page
// })

//by default, chapter two and three buttons are disabled 
document.onload(){
  switch (chapter){
    case 2:
      $('#chapter-one-btn').disable();
      $('#chapter-two-btn').enable();
      break;

    case 3:
      $('#chapter-two-btn').disable();
      $('#chapter-three-btn').enable();
  }
}

$('.btn').on("click", function(){
  //redirect user to Battle Action Page
})
