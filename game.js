
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
}
});

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence()
{
    userClickedPattern = [];
    ++level;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    console.log($("#" + randomChosenColour));
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio('./sounds/' + randomChosenColour + '.mp3');
    audio.play();

}

function playSound(name){
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();

}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);

        }
    }
    else{
        console.log("wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
            
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
  
}

function startOver(){
    started = false;
    gamePattern = [];
    level = 0;

}