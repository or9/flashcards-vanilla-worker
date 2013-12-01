function Game() {
	"use strict";
	var expected = ""; // readonly

	this.answer = function(answer) {
		return answer === expected? true: false;
	};

	this.state = {
		ready: false,
		started: false,
		ended: false,
		initialized: false
	};

	function correct(answer) {
		console.log("private function: correct(" + answer + ") : ");
		return true;
	}

	function incorrect(answer) {
		console.log("private function: incorrect(" + answer + ") : ");
		return true;
	}

	this.setExpected = function(expectedAnswerString) {
		expected = expectedAnswerString;
	};
}

function CardGame(type) {
	var cards = [];
	var questions = {};
	var gameType = type || defaultType;
	var expected = "cg priv";

	function defaultType() {

	}

	this.init = function(jsonData) {
		console.log("CardGame.init");
		questions = jsonData;
		
		for(var key in questions) {

		}
	};

	this.setCards = function(cardsArray) {
		cards = typeOf(cardsArray) === "array"? cardsArray: cards.push(cardsArray);
	};

	this.getCards = function(index) {
		return !!index? cards[index]: cards;
	};

	this.getQuestions = function(index) {
		return !!index? questions[index]: questions;
	};

	this.setQuestions = function(cards) {

	};
}

CardGame.prototype = new Game();	