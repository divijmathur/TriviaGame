$(document).ready(function() {
var allQuestions = [
    {
            question: 'Who is actually a chef?',
            answer: 0,
            options: ['Monica', 'Chandler', 'Rachel', 'Ross']
    },
    {
            question: 'What does Joey love to eat?',
            answer: 3,
            options: ['Fish', 'Apples', 'Oranges', 'Sandwhiches']
    },
    {
            question: 'How many times has Ross been divorced?',
            answer: 3,
            options: ['5', '2', '1', '3']
    },
    {
            question: 'How many types of towels does Monica have?',
            answer: 2,
            options: ['3', '8', '11', '6']
    },
    {
            question: "Who stole Monica's thunder after she got engaged?",
            answer: 0,
            options: ['Rachel','Phoebe','Emily','Carol']
    },
    {
            question: 'Who hates Thanksgiving?',
            answer: 1,
            options: ['Joey','Chandler','Rachel','Ross'],
    },
    {
            question: "Who thinks they're always the last to find out everything?",
            answer: 1,
            options: ['Ross', 'Phoebe', 'Monica','Chandler'],
    }];

var correctAnswers = 0; // correctly answered questions
var incorrectAnswers = 0; // incorrect questions
var timer = 20; //set timer
var intervalId; //counting which question we're on- needed to correspond right answer with right question
var userGuess = ""; //what the user guesses
var running = false; //checking whether the game is currently running
var qCount = allQuestions.length; //repetable reference to the length of questions array
var pick; //allows the computer to pick a random question to put to the user
var index; //generates a random index number for the questions array to provide a random question
var newArray = [];
var holder = [];//array for holding the different question options to display to the user

$('#reset').hide();

//when the start button is pressed run this function
$('#start').on('click', function () {
    //hide the start button and get it out of the way
    $("#start").hide();
    //function to display the questions to be answered by the user
    questionDisplay();
    //start the countdown of the timer
    runTimer();
    //loop through the question bank and add them to the question holder array that will store the questions
    for (var i = 0; i < qCount; i++) {
        holder.push(allQuestions[i]);
    }
});

//start timer for the game
function runTimer() {
    if (!running) {
    intervalId = setInterval(decrease, 1000);
    // verifiying that the game has started
    running= true;
    }
}

//counting down the timer 
function decrease() {
    //add the text value to the div with the id timeLeft and update the seconds remaining
    $("#timeLeft").html("<h3> Time remaining: " + timer + "</h3>");
    timer--;

    // what happens if the timer reaches 0
    if(timer == 0) {
        stop();
        $("#answerBlock").html("<p> Time is up! The correct answer is: " + pick.options[pick.answer] + "</p>");
        score();
    }
}

//stop the timer from running 
function stop() {
    running = false;
    clearInterval(intervalId);
}

//randomly pick a question from the array that has not already been displayed
function questionDisplay() {
    //generate random index from array of questions
    index = Math.floor(Math.random()*qCount);
    //get the random question object from the allQuestions array
    pick = allQuestions[index];
    //update the div with the question
    $("#questionBlock").html("<h2>" + pick.question + "</h2>");
    for(var i = 0; i < pick.options.length; i++) {
        // create a new div for every choice the user has
        var userChoice = $("<div>");
        // give it a call of answerchoice
        userChoice.addClass("answerChoice");
        //update the html with the question options
        userChoice.html(pick.options[i]);
        // add the data attribute of the number of options available for that specific question
        userChoice.attr("data-guessvalue", i);
        // add the choice that the user selects to the respective div that will display it
        $("#answerBlock").append(userChoice);
    }


$(".answerChoice").on("click", function() {
    // get the position of the array from the user's guess
    userGuess = parseInt($(this).attr("data-guessvalue"));
    // evalute whether the choice the user picked is right or wrong
    if(userGuess == pick.answer) {
        stop();
        correctAnswers++;
        userGuess="";
        $("#answerBlock").html("<p>Correct Answer! </p>");
        score();
    } else {
        stop();
        incorrectAnswers++;
        userGuess="";
        $("#answerBlock").html("<p>Wrong! the correct answer is: " + pick.options[pick.answer] + "</p>");
        score();

        }
    });
}

function score() {
    var answerRemove = setTimeout(function() {
        $("#answerBlock").empty();
        timer = 20;

        // need to see if all the questions were answered
        if((incorrectAnswers + correctAnswers) === qCount) {
            // empty the questionblock div in the html page
            $("#questionBlock").empty();
            // add html to let the user know that the game is over 
            $("#questionBlock").html("<h3> Game Over! Here's how you did: </h3>");
            // display how many answers were correct
            $("#answerBlock").append("<h4> Correct: " + correctAnswers + "</h4>");
            // display how many answers were incorrect
            $("#answerBlock").append("<h4> Incorrect: " + incorrectAnswers + "</h4>");
            // reset the game environment
            $("#reset").show();
            // reset the number of Correct answers to 0
            correctAnswers = 0;
            // reset the number of inCorrect answers to 0
            incorrectAnswers = 0;
        } else {
            // reset the timer to the beginning
            runTimer();
            // display the new randomized question
            questionDisplay();
        }
        // after a 3 second interval
    }, 3000);
}
// when the reset button is clicked execute this function
$("reset").on('click', function() {
    // hide the reset button from the player
    $("#reset").hide();
    // empty the div with the id answerblock
    $("#answerBlock").empty();
    // empty the div with the id questionblock
    $("#questionBlock").empty();
    // loop over the holder array and add its items to the allQuestions array
    for(var i = 0; i < holder.length; i++) {
        allQuestions.push(holder[i]);
    }
    // run the timer from the start
        runTimer();
    // display the question to be asked from the user
        questionDisplay();
    });
});
