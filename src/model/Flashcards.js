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
function Flashcards(options) {
	// Named function
	"use strict";
	if(!!window.Worker) {
		// import scripts, this.init(true)
		this.workers = true;
	} else {
		// load scripts, this.init(false)
		this.workers = false;
	}
	
	// Get data
	
	// Instantiate cards @ length based on returned data
	
	// Set up game's event handlers
	
}

Flashcards.prototype = {
		language: "",
		workers: true,
		cards: 0
};

Flashcards.prototype.language = function(str_lang) {
	// Set base language
	// GET language from HTML meta content-language?
	// 		No. Doesn't make sense. Page is in native language. Game is for foreign language
	this.language = str_lang;
};

Flashcards.prototype.characterSet = function(str_char) {
	
};

Flashcards.prototype.audio = function(bool) {
	
};

Flashcards.prototype.init = function(bool_useWorkers) {
	
};

Flashcard.prototype.Options = {
	language: "",
	charset: "",
	audio: "",
	etc: ""
};