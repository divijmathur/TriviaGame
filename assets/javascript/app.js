$(document).ready(function() {
    var correctAnswers = 0; //counting correctly answered questions
    var incorrectAnswers = 0; //counting incorrect questions
    var questionTimer; //set timer
    var counter = 0; //counting which question we're on 

    var allQuestions = [
        {
            question: 'Who is actually a chef?',
            answer: 'Monica',
            options: ['Monica', 'Chandler', 'Rachel', 'Ross']
        },
        {
            question: 'What does Joey love to eat?',
            answer: 'Sandwhiches',
            options: ['Fish', 'Apples', 'Oranges', 'Sandwhiches']
        },
        {
            question: 'How many times has Ross been divorced?',
            answer: '3',
            options: ['5', '2', '1', '3']
        },
        {
            question: 'How many types of towels does Monica have?',
            answer: '11',
            options: ['3', '8', '11', '6']
        },
        {
            question: "Who stole Monica's thunder after she got engaged?",
            answer: 'Rachel',
            options: ['Rachel','Phoebe','Emily','Carol']
        },
        {
            question: 'Who hates Thanksgiving?',
            answer: 'Chandler',
            options: ['Joey','Chandler','Rachel','Ross'],
        },
        {
            question: "Who thinks they're always the last to find out everything?",
            answer: 'Phoebe',
            options: ['Ross', 'Phoebe', 'Monica','Chandler'],
        }
    ];

function createQuestion() {
    // loop over the number of options that the user will get
    for (var i = 0; i <allQuestions[counter].options.length; i++){
        // add a button to the page
        $("#questionBank").append("<button>");
        // add to the text of the button the values of the option keys
        $("#questionBank button:last-child").text(allQuestions[counter].options[i]);
        // add attribute of each unique question
        $("#questionBank button:last-child").attr("value", allQuestions[counter].options[i]);
        // give each question the class of option for styling purposes
        $("#questionBank button:last-child").attr("class", "option");
        // make button disabled
        $("#questionBank button:last-child").attr("disabled", false);
    }
}

function results() {
    $('button').remove();
    $("<h2>").text("Better luck next time: ");
    $('#questionBank').append("<p>");
    $("#questionBank p:last-child").text("correct answer was " + correctAnswers);
    $('#questionBank').append("<p>");
    $("#questionBank p:last-child").text("incorrect answer: " + incorrectAnswers);
    $("#questionBank").append("<button>");
    $("#questionBank button").text("Try Again?");
    $("#questionBank").attr('id', 'start');
}

function 





});