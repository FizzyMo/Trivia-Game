$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-info btn-lg btn-block start-button' href='#' role='button'>Test your knowledge</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	generateHTML();

	timerWrapper();

});

$("body").on("click", ".answer", function(event){
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); 
});  

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + 
	"<img class='center-block img-wrong' src='assets/img/wrong.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000); 
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" +
	 "<img class='center-block img-wrong' src='assets/img/wrong.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" +
	 questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + 
	 "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+
	 "</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
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
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
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
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>All done, here's how you did!" + "</p>" +
	 "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" +
	  "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + 
	  unansweredTally + "</p>" + 
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

var startScreen;
var gameHTML;
var counter = 15;
var questionArray = ["How many POP! Game figures are currently out?", "What current patch is League on?", 

"What rank tier was added this season?", "Who recevied the gold skin", "Where is Riot Game located?"];

var answerArray = [["2", "5", "10", "7"], ["9.3","9.8","9.9","9.6"], ["Diamond", "Copper", "Iron", "Advanced"],

 ["Sivir","Master Yi","Orianna","Morgana"], ["Los Angeles", "San Diego", "San Marcos", "Los Vegas"]];

var imageArray = ["<img class='center-block img-right' src='assets/img/pop.jpg'>", "<img class='center-block img-right' src='assets/img/patch.jpg'>",

 "<img class='center-block img-right' src='assets/img/lineup.jpg'>", "<img class='center-block img-right' src='assets/img/ori.jpg'>",

  "<img class='center-block img-right' src='assets/img/losa.jpg'>"];

var correctAnswers = ["D. 7", "D. 9.6", "C. Iron", "C. Orianna", "A. Los Angeles"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;