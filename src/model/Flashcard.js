function Flashcard(options) {
	// Named function
	
}

Flashcard.prototype.language = function(str_lang) {
	// Set base language
	this.language = str_lang;
};

Flashcard.prototype.characterSet = function(str_char) {
	
};

Flashcard.prototype.audio = function(bool) {
	
};

Flashcard.prototype.Card = function() {
	// Card object to be instantiated
	
};

Flashcard.prototype.Options = {
	language: "",
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

