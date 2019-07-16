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
$(document).ready(function(){
  console.log(chapter);
  chapter = 2;
  $("button").on("click", function(){
    $("#chapter-two-btn").removeAttr("disabled");

  });
  switch (chapter){
    case 2:
      console.log("Chapter 2 selected");
      $("#chapter-one-btn").attr("disabled", "disabled");
      $("#chapter-two-btn").removeAttr("disabled");
      break;

    case 3:
      console.log("Chapter 3 selected");
      $("#chapter-two-btn").attr("disabled", "disabled");
      $("#chapter-three-btn").removeAttr("disabled");
  }
});

$(".btn").on("click", function(){
  //redirect user to Battle Action Page
});