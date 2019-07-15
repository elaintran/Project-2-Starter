//***************Home Page****************************
//Homepage options: 1)Login or 2) Create User

//***********Create User Page/Modal:**************************

//Create user form: 1) Username Input 2)Password Input 3)Link to go back to Homepage

//Submit username and password on submit button
$('#create-user-form').on('submit', function(){
    //push user data up to table
})

//Go back to homepage to log in
$('#homepage-link').on('click', function(){
    //route to homepage
})

//***************Log In Page****************************

//Login Form: 1) Username Input 2) Password Input
$('#login-form').on('submit', function(){
    //user authentification: if correct, take to character select page or chapter select depending on saved data
    
    //load any saved data
    gameManager.load();

    //if saved character exists, take to chapter select and set button values to saved data values
    if(character){
        //set chapter button "completion-state" value to whatever the saved chapter completion state values were
        $('#chapter-one').attr('completion-state', chapter.chaptOne);
        $('#chapter-two').attr('completion-state', chapter.chaptOne);
        $('#chapter-three').attr('completion-state', chapter.chaptOne);


        //default state of chapter one button is in color and unlocked, enabled and ready to start game. Chapter two and three buttons is locked and gray borders
        if($('#chapter-one').attr('completion-state') === 'complete'){
            //display chapter one with 'COMPLETED' stamp across it, set border to gray and disable

            //set chapter two button to color, remove locked image and enable button
        } 

        if($('#chapter-two').attr('completion-state' === 'complete')){
            //display chapter two with 'COMPLETED' stamp across it, set border to gray and disable

            //set chapter three button to color, remove locked image and enable button
        } 

        if($('chapter-three').attr('completion-state') === 'complete'){
            //set display to gray with 'COMPLETED' stamp across it, disable button
        }
        
    }
})

//***********Character Select Page****************************
//clicking button with "charClass" class grabs the character image, base stats and displays it on the screen
$(this).on("click", function(){
    //sets the character class to whatever the charClass value was
    var charClass = $(this).attr('charClass');

    //grabs and displays data for that specific class
    $('#img-display').attr('src', image.charClass)
})

//clicking button with the "charClass" class grabs its value (warrior/knight/mage/thief) and triggers create character function for that class
$(this).on("click", function() {
    grabbedClass = $(this).attr('charClass');
    gameManager.charSelect(grabbedClass);
});

//clicking confirm button moves to next stage
$('#confirm-btn').on('submit', function(){
    //save selected character
    gameManager.save();

    //load next page
})

//***********Point Distribution Page***************************
//clicking on (+) or (-) button next to skill adds skill point to it
$(this).on('click',function(){
    //check if (+) or (-) button
    if($(this).attr('btn-type') === '+'){
    gameManager.distrPoints();

    }

    //display remaining skill points on screen
    $('#skills-display').text(points)
}