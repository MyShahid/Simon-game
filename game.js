
// 3. array buttonColours
var buttonColours = ["red", "blue", "green", "yellow"];

// 5. array gamePattern
var gamePattern = [];

//13. array userClickedPattern 
var userClickedPattern = [];

//25. var started to keep track of if the game is started 
var started = false;

//28. var level to keep track of the level
var level = 0;

//27. To check if any key is pressed inside the document and when that happens for the first time we call nextsequence()
$(document).keypress(function() {
  if (!started) {
    //29. the h1 title starts out saying "Press A Key to Start" . we change it to the level we are on
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// 11. To detect when any of the buttons are clicked by the user and trigger function
$(".btn").click(function() {

    // 12. var UserChosenColour to store the id of the button that got click using this.attr 
    var userChosenColour = $(this).attr("id");

    // 14. pushing userChosenColour at the end of the userClickedPattern to store all the buttons we clicked
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //34. checkAnswer taking userClickedPattern.length-1 cause the counting in the array starts from the 0 so to keep track of answer we -1
    checkAnswer(userClickedPattern.length-1);
});

//33. func checkAnswer that takes currentLevel as a paramter
function checkAnswer(currentLevel) {

    //35. if statements to check if the most recent user answer is the same as the game
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //36. if the user got the most recent answer right then check if they have completed the sequence
      if (userClickedPattern.length === gamePattern.length){
        //37. if the user has completed the sequence then call nextSequence after 1000 milliseconds delay
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      //40. wrong sound
      playSound("wrong");

      //41. adding game-over class after wrong guess and removing it after 200 milliseconds
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //42. changing the h1 title after guessing wrong
      $("#level-title").text("Game Over, Press Any Key to Restart");

      //45. startOver again
      startOver();
    }

}

/*

1. We Create a Pattern to get random numbers generated so we can get the colours generated randomly to us 
2. We create a function called nextSequence() which will be called whenever the user has successfully guessed
3. Now at the top we create a array called buttonColours and let it hold the sequence [red blue green yellow]
4. Now Create a new variable called randomChosenColour and use randomNumber from step 3 to select random colour from the buttonColours
5. Create a empty array at the top called gamePattern
6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern. so gamePattern store all the random colours for us to guess in the further steps

7. Now we need to Show the Sequence to the User with Animations and Sounds
8. Use jQuery to select the button with the same id as the randomChosenColour
9. Now to figure out how you can use Javascript to play the sound for the button colour selected in step 8. we can create a new var audio and audio.play() to play sound according to the colour


10. Now we Check Which Button is Pressed
11. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
12. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
13. At the top we create a new empty array with the name userClickedPattern. To store user click pattern so later we can confirm it with randomChosenColour to play the game
14. Add the contents of the variable userChosenColour created in step 12 to the end of this new userClickedPattern 

15. Now we Add Sounds to Button Clicks
16. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played. e.g if the Green button is clicked, then green.mp3 should be played.
17. Create a new function called playSound() that takes a single input parameter called name.
18. Take the code we used to play sound in the nextSequence() function and add it to playSound().

19. Now we Add Animations to User Clicks
20. Create a new function called animatePress(), it should take a single input parameter called currentColour.
21. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
22. Now to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.

23. To start the game now
24. You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress. 
25. so we will create a var called started and set it to false at the top 
26. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
27. so we will create a keypress func using JQuery 
28. Create a new variable called level and start at level 0.
29. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0". We will do it using id of h1 and .text to change the text
30. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
31. Inside nextSequence(), update the h1 with this change in the value of level.

32. Now we need to check if the user has guessed the pattern correctly
33. Create a new function called checkAnswer(), it should take one input with the name currentLevel
34. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
35. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
36. If the user got the most recent answer right in step 35, then check that they have finished their sequence with another if statement. 
37. Call nextSequence() after a 1000 millisecond delay.
38. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.

39. If the user got the most recent answer wrong in step 35, then stop the game
40. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
41. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
42. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.

43. Now Restarting the game 
44. Create a new function called startOver().
45. Call startOver() if the user gets the sequence wrong.
46. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
*/
function nextSequence() {

  //38. reseting the userClickedPAttern to empty array for next level  
  userClickedPattern = [];
  //30. to increase the sequence by 1 everytime it gets called
  level++;
  //31. updating the value of level
  $("#level-title").text("Level " + level);

  // 2. function next sequence
  var randomNumber = Math.floor(Math.random() * 4);

  // 3. var randomChosenColour
  var randomChosenColour = buttonColours[randomNumber];

  // 6. pushing randomChosenColour at the end of the gamePattern
  gamePattern.push(randomChosenColour);

  // 8. Selecting id with randomChosenColour to get the colour from the html on the basis of their id so we can a animate them accordingly
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // 16. playing sound on the basis of the randomChosenColour using playSound func we created that takes a name as a paramter so we are passing randomChosenColour 
  playSound(randomChosenColour);
}

//17. Creating a func playSound that takes name as a paramter and playSound accordingly
function playSound(name) {

    // 9. var audio to play sound according to the name of the colour
    //18. we have taken this line of code which was previously in the nextSequence() and put it here 
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//20. func animatePress takes currentColour as a parameter to add the animation to the current colour which is connected to the box using id 
function animatePress(currentColor) {

    //21. Using jQuery we add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed");
    //22. to remove the pressed class after 100 milliseconds to give out that animate effect we use setTimeOut func to removeClass
    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//44. func startOver after getting the sequnece worng
function startOver() {

  //46. restarting 
  level = 0;
  gamePattern = [];
  started = false;
}