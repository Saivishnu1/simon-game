var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3')
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    $('#'+randomChosenColour).fadeOut('fast').fadeIn('fast');

    level++;
    $('h1').text("Level "+level)

    
} 


function animatePress(currentColour) {
    
        $("#"+currentColour).addClass('pressed');
        setTimeout( ()=> {
            $("#"+currentColour).removeClass('pressed');
        }, 100);

}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);

        }
    } else{
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $('body').addClass("game-over");
        setTimeout(() => {
            $('body').removeClass("game-over");
        }, 200);
        $('h1').text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


$(document).on("keydown", function () {
    if(!started){
        $('h1').text('Level '+level);
        nextSequence();
        started = true;
    }
})


$('.btn').on("click", function () { 
    var userChosenColour = $(this).attr('id');
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern); 

    checkAnswer(userClickedPattern.length-1);
});

