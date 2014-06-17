// handler for receiving messages, based on WorkerHandler model

GameHandler.prototype.getGameType = function(data) {
	console.log("MAIN GameHandler getGameType called with data: ", data, data.fn, data.msg);
	getGameType(game);
};

GameHandler.prototype.init = function(data) {
	console.log("MAIN GameHandler init called with data: ", data, data.msg);
	
};

GameHandler.prototype.gameQuestions = function(data) {
	// Receive all cards
	// console.log("MAIN gameQuestions called: ", data);
};

GameHandler.prototype.layoutQuestion = function(data) {
	console.log("MAIN GameHandler layout question data: ", data);
	console.log(data.msg);
	// stop from calling during init…
	//var heading = document.getElementById("choiceColumn").
	document.getElementById("choiceColumn").innerHTML += data.msg;
};

GameHandler.prototype.setGameType = function(data) {
	console.log("MAIN GameHandler setGameType to… \t", data.msg);
};

GameHandler.prototype.setGameHeadingForType = function(data) {
	console.log("MAIN GameHandler setGameHeadingForType");
	document.getElementById("gameTypeHeading").innerHTML += data.msg;
};

GameHandler.prototype.setQuestionCard = function(data) {
	console.log("MAIN GameHandle resetQuestionCard to:…", data.msg);
	var card = document.getElementById("card_" + data.msg),
			name = "current";
	console.log("MAIN setQuestionCard is: ", card);
	adjustClass([card], name, true);

	// setup question card area
	
};

// Accepts: Array
GameHandler.prototype.setQuestions = function(data) {
	console.log("MAIN GameHandle resetQuestions to: ", data.msg);
	var i = 0,
			len = data.msg.length,
			elements = [],
			name = "display-true";

	for(i; i < len; i++) {
		console.log(i, data.msg, data.msg[i]);
		console.log("MAIN: iterate on setQuestions #question_" + data.msg[i], document.getElementById("question_" + data.msg[i]));
		elements[0] = document.getElementById("question_" + data.msg[i]);
		elements[1] = elements[0].nextSibling;
		adjustClass(elements, name, true);
	}
};

GameHandler.prototype.hidePreviousQuestions = function(data) {
	if(data.msg.length > 0) {
		var i = 0,
			len = data.msg.length,
					elements = [],
					name = "display-false";
		for(i; i < len; i++) {
			elements[0] = document.getElementById("question_" + data.msg[i]);
			elements[1] = elements[0].nextSibling;
			adjustClass(elements, name, false);
			unsetQuestionCard(data.msg);
		}
	}
};

GameHandler.prototype.correct = function(data) {

};

GameHandler.prototype.incorrect = function(data) {

};

