/*
 * Flashcard is main
 * Card instantiated for each card by Flashcard instance
 * Main initializes, sets / gets values, runs
 */

/* Game properties 
 * 		set language
 * 		create web workers
 * 		instantiate cards
 */
testA(1);

function Game(options) {
	// Named function
	"use strict";
	var state = {
			initialized:false, 
			ran:false, 
			ended:false
		};
	
	// Instantiate cards @ length based on returned data
	
	// Set up game's event handlers
	this.begin = function(isInitial) {
		state.ran = true;
		
	};
	
	this.answer = function(isTrue) {
		checkAnswer(isTrue);
	};
	
	this.end = function(isWin) {
		state.ended = true;
		
	};

	function checkAnswer(isTrueFalse) {
		
	}
	
}