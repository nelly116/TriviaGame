$(document).ready(function () {
    // console.log( "ready!" );

    // track which question we are on
    var questionCounter = 0;
    // initial time of 15 seconds for each question
    var time = 15;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
        {
            question: "Who Was the first Hip Hop female artist to go platinum?",
            choices: ["Da brat", "Queen Latifa", "Janet Jackson", "Missy Elliott"],
            correctAnswer: "Da Brat",
        
        },
        {
            question: "Who is the King of Pop?",
            choices: ["Mario", "Chris Brown", "Micheal Jordan", "Michael Jackson"],
            correctAnswer: "Michael Jackson",
            
        },
        {
            question: " Who is the Queen Of Soul?",
            choices: ["Mary J", "Aretha Franklin", "lil Kim", "Patsy CLine"],
            correctAnswer: "Aretha Franklin",
            
        },
        {
            question: "What was James Browns first hit Single?",
            choices: ["Purple Rain", "Bille jean", "Try Me", "Planet Rock"],
            correctAnswer: "Try Me",
            
        },
        {
            question: "Whitney Houston passed away in what year?",
            choices: ["1999", "2012", "2015", "2017"],
            correctAnswer: "2012",
            
        },
        {
            question: "Tina Turner is known as?",
            choices: [" The Baker", "The Queen Of Soul", "The Queen Of Rock", "The Gospel"],
            correctAnswer: "The Queen Of Soul",
            
        },
        {
            question: "Marvin Gaye first hit single was?",
            choices: ["Sexual Healing", "Baby Don't Cry", "Rock You", "Inner City Blues"],
            correctAnswer: "Sexual Healing",
            
        },
        {
            question: "What was the name of BB Kings Guitar?",
            choices: ["Amy", "Lucille", "Beth", "Samantha"],
            correctAnswer: "Lucille",
            
        },
        {
            question: "House Music was originated In what city?",
            choices: ["london", "Chicago", "Detroit", "Kansas City"],
            correctAnswer: "Chicago",
            
        },
        {
            question: "Purple Rain Was Written By?",
            choices: ["Michael Jackson", "Marvin Gaye", "Prince", "Little Richard"],
            correctAnswer: "Prince",
            
        },
        {
            question: "Hip Hop was originated in What City?",
            choices: ["Baltimore", "Atlanta", "New Orleans", "New York"],
            correctAnswer: "New York",
            
        },
        {
            question: "Patti Labelle Went Solo in what year?",
            choices: ["1976", "1987", "1988", "2012"],
            correctAnswer: "1976",
            
        },
        { 
        
        
            question: "Motown was founded by?",
            choices: ["Donny Hathaway", "Berry Gordy", "James Brown", "Natlie COle"],
            correctAnswer: "Berry Gordy",
        
        },
        {
            question: "Diana Ross was in what group?",
            choices: ["The Rockets", "The Four Tops", "The Temptations", "The Supremes"],
            correctAnswer: "The Supremes",
            
        },
        {
            question: "What Artist Sang Walking After Midnight?",
            choices: ["Patsy Cline", "Dorinda Clark", "Janet Jackson", "James Bond"],
            correctAnswer: "Patsy Cline",
            
        }];


    // create question contents according to question count
    function questionContent() {
        // a for loop 
        $("#gameScreen").append("<p><strong>" +
            questions[questionCounter].question +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[0] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[1] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[2] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[3] +
            "</strong></p>");
    }

    // user guessed correctly
    function userWin() {
        $("#gameScreen").html("<p>whoop whoop!</p>");
        correctGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" +
            correctAnswer +
            "</span></p>" +
            questions[questionCounter].image);
        setTimeout(nextQuestion, 4000);
        questionCounter++;
    }

    // user guessed incorrectly
    function userLoss() {
        $("#gameScreen").html("<p>you are dead wrong!</p>");
        incorrectGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" +
            correctAnswer +
            "</span></p>" +
            questions[questionCounter].image);
        setTimeout(nextQuestion, 4000);
        questionCounter++;
    }

    // user ran out of time
    function userTimeout() {
        if (time === 0) {
            $("#gameScreen").html("<p>see ya on the next record around!</p>");
            incorrectGuesses++;
            var correctAnswer = questions[questionCounter].correctAnswer;
            $("#gameScreen").append("<p>The answer was <span class='answer'>" +
                correctAnswer +
                "</span></p>" +
                questions[questionCounter].image);
            setTimeout(nextQuestion, 4000);
            questionCounter++;
        }
    }

    // screen that shows final score and nice message :)
    function resultsScreen() {
        if (correctGuesses === questions.length) {
            var endMessage = "Groovy";
            var bottomText = "#nerdalert!";
        }
        else if (correctGuesses > incorrectGuesses) {
            var endMessage = "hmmmm, try again!...";
            var bottomText = "come on";
        }
        else {
            var endMessage = "boooooo!";
            var bottomText = "#scrub";
        }
        $("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" +
            correctGuesses + "</strong> right.</p>" +
            "<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
        $("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
        $("#bottomText").html(bottomText);
        gameReset();
        $("#start").click(nextQuestion);
    }

    // game clock currently set to 15 seconds
    function timer() {
        clock = setInterval(countDown, 1000);
        function countDown() {
            if (time < 1) {
                clearInterval(clock);
                userTimeout();
            }
            if (time > 0) {
                time--;
            }
            $("#timer").html("<strong>" + time + "</strong>");
        }
    }

    // moves question counter forward to show next question
    function nextQuestion() {
        if (questionCounter < questions.length) {
            time = 15;
            $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
            questionContent();
            timer();
            userTimeout();
        }
        else {
            resultsScreen();
        }
        // console.log(questionCounter);
        // console.log(questions[questionCounter].correctAnswer);
    }

    // reset score and counter parameters on restart
    function gameReset() {
        questionCounter = 0;
        correctGuesses = 0;
        incorrectGuesses = 0;
    }

    function startGame() {
        $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
        $("#start").hide();
        // $("#gameScreen").append("<div id='question'>");
        // var nextQuestion = questionContent(questionCounter);
        // $("#gameScreen").append(nextQuestion);

        // $("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
        // questionCounter++;
        questionContent();
        timer();
        userTimeout();
    }

    // this starts the game
    $("#start-btn").click(nextQuestion);

    // click function to trigger right or wrong screen
    $("#gameScreen").on("click", ".choices", (function () {
        // alert("clicked!");
        var userGuess = $(this).text();
        if (userGuess === questions[questionCounter].correctAnswer) {
            clearInterval(clock);
            userWin();
        }
        else {
            clearInterval(clock);
            userLoss();
        }
    }));
});