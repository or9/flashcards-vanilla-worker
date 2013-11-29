function Game() {
	"use strict";

	var expected = "";

	this.answer = function(answer) {
		if(answer === expected)
			correct(answer);
		else
			incorrect(answer);
	};

	this.state = {
		started: false,
		ended: false,
		initialized: false
	};

	function correct(answer) {
		console.log("private function: correct(" + answer + ") : ");
	}

	function incorrect(answer) {
		console.log("private function: incorrect(" + answer + ") : ");
	}

	this.setExpected = function(expectedAnswerString) {
		expected = expectedAnswerString;
	};

	this.getExpected = function() {
		return expected;
	};
}

function CardGame(type) {
	var cards = [];
	var questions = [];
	var gameType = type || defaultType;

	function defaultType() {

	}

	this.setCards = function(cardsArray) {
		cards = cardsArray;
	};

	this.getCard = function(index) {
		return !!index? cards[index]: cards;
	};

	this.getQuestion = function(index) {
		return !!index? questions[index]: questions;
	};
}

CardGame.prototype = new Game();

var testGame = new CardGame();
console.log(testGame);
console.log("testGame expected answer: ", testGame.getExpected);
testGame.setExpected("string1");
console.log("testGame expected answer: ", testGame.getExpected);
console.log("send wrong answer via testGame: ", testGame.answer("string2"));
console.log("send correct answer via testGame: ", testGame.answer("string1"));
console.log(document);