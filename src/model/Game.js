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
	
	if(!!window.Worker) {
		// import scripts, this.init(true)
		this.workers = true;
		var worker = new Worker("model/Worker.js");
		window.addEventListener("message", msgHandler, false);
	} else {
		// load scripts, this.init(false)
		this.workers = false;
	}
	
	for(var i = 0; i < arguments.length; i++) {
		for(var key in options) {
			this.key = options[key];
		}
	}
	
	// Get data
	function init(useWorkers) {
		state.initialized = true;
		if(useWorkers) {
			
		} else {
			
		}
	}
	
	// Instantiate cards @ length based on returned data
	
	// Set up game's event handlers
	this.begin = function(isInitial) {
		state.ran = true;
		
	};
	
	this.answer = function(isTrue) {
		
	};
	
	this.end = function(isWin) {
		state.ended = true;
		
	};
	
}