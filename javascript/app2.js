$(document).ready(function () {
    //list questions in a array of objects
    var questions = [
        {
            question: "What year was the first comic book appearance of Batman?",
            choice: ["1925", "1930", "1939", "1940"],
            answer: 2,
            photo: "assets/images/firstbatmanapperance.png",
        },

        {
            question: "Who were the creator(s) of Batman?",
            choice: ["Bob Kane", "Christopher Nolan", "Bill Finger", "Bill Finger and Bob Kane"],
            answer: 3,
            photo: "assets/images/sm_batmananimated.gif"
        },

        {
            question: "What does Batman do as Bruce Wayne?",
            choice: ["Philanthropy", "Detective", "Spelunking", "Hacking the GCPD database"],
            answer: 0,
            photo: "assets/images/sm_brucewaynePhilanthropy.gif"
        },

        {
            question: "What super group is Batman a part of?",
            choice: ["The Avengers", "League of Shadows", "Suicide Squad", "Justice League"],
            answer: 3,
            photo: "assets/images/sm_jl.gif"
        },

        {
            question: "Why can't Batman ever kill the Joker?",
            choice: ["He's funny", "He loves him", "He wants the Joker to improve on his jokes", "He vowed to never kill"],
            answer: 3,
            photo: "assets/images/sm_joker.gif"
        }];

    //global variables================================================
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = questions.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];


    //START BUTTON===================================================
    //make start button hide after click
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < questions.length; i++) {
            holder.push(questions[i]);
        }
    })

    //TIMERS=========================================================
    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerDiv").html("<p>Time's up! Answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //Display questions===================================================
    function displayQuestion() {
        //random indexes
        index = Math.floor(Math.random() * questions.length);
        pick = questions[index];

        $("#questionDiv").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerDiv").append(userChoice);
        }

        //Enable clicking event for answers====================================
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerDiv").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerDiv").html("<p>Wrong! Answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }

    //Hiding pictures/gifs=======================================================
    function hidepicture() {
        $("#answerDiv").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        questions.splice(index, 1);

        var hidepic = setTimeout(function () {
            $("#answerDiv").empty();
            timer = 20;

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionDiv").empty();
                $("#questionDiv").html("<h3>Game Over!  Your results: </h3>");
                $("#answerDiv").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerDiv").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerDiv").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);
    }
    // resets game================================================
    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerDiv").empty();
        $("#questionDiv").empty();
        for (var i = 0; i < holder.length; i++) {
            questions.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

});