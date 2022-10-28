var buttonColors =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=1;

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){
    let a= Math.random();
    var randomNumber= Math.floor(a*4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeOut();
    $("#"+randomChosenColor).fadeIn();

    playSound(randomChosenColor);


    $("h1").text("Level "+level );


    
}

function animatePress(currentColor){
        $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");

        },100);

}
var cc=0; //click count to check the pattern for a particular level

function gameOver(){
    cc=0;
    gamePattern=[];
    userClickedPattern=[];
    $("h1").text("Game Over, Press Any Key to Restart");
    level=1;
    cc=0;
    
    check=1;

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200 );

}

function handler(clicked)
{
    cc=cc+1;
    var userChosenColor= clicked;
    userClickedPattern.push(userChosenColor);
    playSound(clicked);
    animatePress(clicked);

    var check= 0;

        if(userClickedPattern[cc-1]!=gamePattern[cc-1])
        {
            gameOver();
            check=1;
        }


    if(check!=1)
    {
        if(cc==gamePattern.length){
            level=level+1;
            userClickedPattern=[];
            cc=0;

            setTimeout(function(){
                nextSequence();

            },1000);
        }

    }
    else{
        check=0;
    }
    
    
}



//Start the game
$(".btn").click(function(){
    handler(this.id);
});


$(document).keypress(function(){
    if(level==1)
        nextSequence();
    });
    
    
$("h1").click(function(){
    if(level==1)
    nextSequence();
});
