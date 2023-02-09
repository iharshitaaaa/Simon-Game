// Arary to store all the colours available in the game
var buttonColours = ["red", "blue", "green", "yellow"];

// Array which is storing the computer color call
var gamePattern = [];

// array which is storing the colour buton pressed by the user
var userClickedPattern = [];

// Variable to tell us wheher the game has started or not
var started = false;
// variable to tell us the gamelevel
var level = 0;

// anonymous function to be callled when there is any keypress on the entire website
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Anonymous function to be called when there is any button is clicked

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


// Function to check whether the user answer is right or wrong
function checkAnswer(currentLevel) {

    // if the gamePattern last element is same as userclickedPattern that means users answer is correct
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

    //Call nextSequence() after a 1000 millisecond delay,means user has passed the current level and reaches next level
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }
    // If answer is wrong 
     else {

    //    Play the sound of wrong and show game ovr on the screen and resatrt the game y calling start over function
      playSound("wrong");
      $("body").addClass("game-over");

      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      $("h1").text("Game Over! Press Any Key to Restart");

      startOver();
    }

}

function nextSequence() {

  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to show animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to start over the game
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}
