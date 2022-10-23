var level=0;
var started=false;
var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];



$(document).keypress(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});


function nextSequence(){
  userClickedPattern=[];
  $("h1").text("Level "+level);
  level++;
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  //

}
$(".btn").on("click",function(event){
  // userClickedPattern=[]
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});
function playSound(event){
  var audio=new Audio(event+".mp3");
  audio.play();
}
function animatePress(event){
  $("#"+event).addClass("pressed");
  setTimeout(function () {
    $("#" + event).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
  }


  function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
