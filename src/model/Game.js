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
	var questions = {
		total: 0,
		current: 0,
		answered: []
	};
	var types = {
		basic: {
			matchCharacter: function() {
				
			},
			matchTransliteration: function() {
				
			}
		},
		advanced: {
			matchCharacterForm: function() {
				
			},
			matchFormTransliteration: function() {
				
			}
		}
	};
	var gameType = type || types.basic.matchCharacter();
	var expected = "cg priv";
	var min = 0;
	
	function defaultType() {
		
	}

	this.init = function(jsonData) {
		console.log("CardGame.init");
		questions = {
			current: {},
			answered: {
				"question": 0,
				"isCorrect": false
			},
			all: []
		};
	};
	
	function answer() {
		
	}
	
	function nextRandomQuestion() {
		for(var answered in questions) {
			
		}
		
	}
	
	function getRandomInt(max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	this.getCards = function(index) {
		return !!index? cards[index]: cards;
	};

	this.getQuestions = function(index) {
		return !!index? questions[index]: questions;
	};
	
	this.setQuestions = function(cards) {
		questions[all] = cards;
	};

	this.setCards = function(cardsArray) {
		cards = typeOf(cardsArray) === "array"? cardsArray: cards.push(cardsArray);
	};

}

CardGame.prototype = new Game();	