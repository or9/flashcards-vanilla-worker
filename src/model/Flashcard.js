/*
 * Flashcard is main
 * Card instantiated for each card by Flashcard instance
 * Main initializes, sets / gets values, runs
 */
function Flashcard(options) {
	// Named function
	if(!!window.Worker) {
		// import scripts, this.init(true)
		
	} else {
		// load scripts, this.init(false)
		
	}
}

Flashcard.prototype.language = function(str_lang) {
	// Set base language
	// GET language from HTML meta content-language?
	// 		No. Doesn't make sense. Page is in native language. Game is for foreign language
	this.language = str_lang;
};

Flashcard.prototype.characterSet = function(str_char) {
	
};

Flashcard.prototype.audio = function(bool) {
	
};

Flashcard.prototype.init = function(bool_useWorkers) {
	
};

Flashcard.prototype.Card = function() {
	// Card object to be instantiated
	
};

Flashcard.prototype.Options = {
	language: "",
	charset: "",
	audio: "",
	etc: ""
};

Flashcard.Card.prototype.setProperties = function() {
	for(var key in this.Options) {
		// Set all properties in one go...?
		
	}
};

Flashcard.Card.prototype.char = function(str_char) {
	
};

Flashcard.Card.prototype.audio = function(str_file) {
	
};

Flashcard.Card.prototype.mutations = function(str_forms) {
	
};

