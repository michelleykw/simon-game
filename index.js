const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function () {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  generateColorForNextLevel();
});

$('.btn').click(function (event) {
  if (level > 0) {
    const colorClicked = event.target.id;
    playAudioFor(colorClicked);
    animate("#" + colorClicked, "pressed");
    userClickedPattern.push(colorClicked);

    if (isCorrectClick()) {
      if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];
        setTimeout(function() {
          generateColorForNextLevel();
        }, 1000);
      }
    } else {
      $('#level-title').text('Game Over, Press Any Key to Restart');
      level = -1;
    }
  }

  if (level === -1) {
    playAudioFor('wrong');
    animate("body", "game-over");
  }
});

function generateColorForNextLevel() {
  level++;
  $('#level-title').text('Level ' + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const chosenColor = buttonColors[randomNumber];
  gamePattern.push(chosenColor);

  $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playAudioFor(chosenColor);

  return chosenColor;
}

function playAudioFor(color) {
  const audio = new Audio('./sounds/' + color + '.mp3');
  audio.play();
}

function animate(element, cssClass) {
  $(element).addClass(cssClass);
  setTimeout(function() {
    $(element).removeClass(cssClass);
  }, 100);
}

function isCorrectClick() {
  const indexToCheck = userClickedPattern.length -1;
  return userClickedPattern[indexToCheck] === gamePattern[indexToCheck];
}
