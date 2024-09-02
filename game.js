// -- Variables -- // 

var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;

var level = 0;

// -- Functions -- //

// First key press to start the game
$(document).one('keypress', function () {
  $("#level-title").text("Level " + level);
  started = true;
  nextSequence();

});

// Button click function
$(`.btn`).on('click', function () {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});

// playSound function for clicked buttons
function playSound(name) {

  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();

};

// Button press animation function
function animatePress(currentColor) {

  $(`#${currentColor}`).addClass('pressed');
  setTimeout(function () { $(`#${currentColor}`).removeClass('pressed'); }, 100);

};

// checkAnswer function
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();
      }, 1000);

    };

  } else {

    console.log("wrong");

    playSound('wrong');

    $('body').addClass('game-over');

    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);

    $('h1').text("Game Over, Press Any Key to Restart");

    startOver();

  };

};

// Start over function
function startOver() {

  gamePattern = [];
  level = 0;
  started = false;

  $(document).one('keypress', function () {
    $("#level-title").text("Level " + level);
    started = true;

    nextSequence();
  });
}

// Next sequence function
function nextSequence() {

  userClickedPattern = [];

  level++; // Increases the value of level by 1
  $('#level-title').text(`Level ${level}`); // Changes the h1 text according to the current level

  var randomNumber = Math.floor(Math.random() * 4); // Gives a random number between 0 to 3
  var randomChosenColor = buttonColors[randomNumber]; // Detects which random color was chosen by the game
  gamePattern.push(randomChosenColor); // Adds the random random color chosen by the game to the gamePattern array

  $(`#${randomChosenColor}`).fadeOut(120).fadeIn(120); // randomChosenColor animation
  playSound(randomChosenColor);

};




