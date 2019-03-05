var startScreen;
var gameHTML;
var counter = 15;
var questionArray = ["Who is the voice for Leona?", "What current patch is League on?", "What is the number of original champions?", 
"Where is Riot Games headquarters?","What is the new rank that has been added?"];

var answerArray = [["Wendee Lee", "Krizia Bajos", "Kelly Burge", "Rashida Clendening"], ["9.0", "9.1", "9.4", "9.3"], 
["30", "45", "48", "40"], ["San Diego", "Los Angeles", "San Marcos", "San Jose"], ["Trash", "Iron", "Bronze", "Diamond"]];

var imageArray = ["<img class='center-block img-right' src='img/lee.png'>", "<img class='center-block img-right' src='img/9.4.jpg'>",

"<img class='center-block img-right' src='img/40.png'>", "<img class='center-block img-right' src='img/Los Ang.jpg'>", 

"<img class='center-block img-right' src='img/iron.jpg'>"];
var correctAnswers = ["A. Wendee Lee", "C. 9.4", "D. 40", "B. Los Angeles", "D. Beijing", "B. Iron"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

$(document).ready(function () {
	function initialScreen() {
		$(".mainArea").html(startScreen);
	}
	initialScreen();

	$("body").on("click", ".start-button", function (event) {
		event.preventDefault();
		generateHTML();
		timerWrapper();

	}); 

	$("body").on("click", ".answer", function (event) {
		selectedAnswer = $(this).text();
		if (selectedAnswer === correctAnswers[questionCounter]) {
			clearInterval(theClock);
			generateWin();
		}
		else {
			clearInterval(theClock);
			generateLoss();
		}
	});

	$("body").on("click", ".reset-button", function (event) {
		resetGame();
	});

});

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + 
	"<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>"
	 + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + 
	"<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" +
	 questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " +
	 answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
		questionCounter++;
		generateHTML();
		counter = 15;
		timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(fifSeconds, 1000);
	function fifSeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
	+ counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" +
	 "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + 
	 incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + 
	 "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 15;
	generateHTML();
	timerWrapper();
}

