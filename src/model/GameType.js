// Basic
// Character to Transliteration

// Questions: Text Labels
// Answer: Single Card

function GameType(type) {
	var scope = ""; // [questions||cards]
	this.current = "";
	this.heading = "";
	this.question = "";
	this.allQuestions = false;
	this.useVowels = false;
	
	this.getScope = function() {
		return scope;
	}

	function resolveType(type, options) {
		var _type = !!type && typeof type === "string"? type.toString(): "default",
				_options = options || {},
				rex_adv = /ADVANCED+/gi,
				rex_sound = /SOUND+/gi,
				rex_translit = /TRANS\w+/i,
				rex_char = /CHAR\w+/i;

		if(_type.match(rex_adv)) {
			setAdvanced();
		} else {
			setBasic();
		}
		
		function sortOptions() {
			var advanced,
					basic;

			if(!!options.advanced) {
				//setAdvanced();
				advancedType = new AdvancedType();
				setLevel(advancedType);
			} else {
			//	setBasic();
				var basicType = new BasicType();
				setLevel(basicType);
			}
		}

		function setLevel(level) {
			setOptions();
			if(_type.match(rex_sound)) {
				this[level].sound();
			} else if(_type.match(rex_translit)) {
				this[level].translit();
			} else {
				this[level].character();
		}

		function setOptions() {
			var rex_q = /question/gi,
					rex_vowels = /vowel/gi;

			if(key.match(rex_q)) {
				if(option === true) {
					this.allQuestions = true;
				} else {
					this.allQuestions = false;
				}
			}
			
			if(key.match(rex_vowels)) {
				if(option === true) {
					this.useVowels = true;
				} else {
					this.useVowels = false;
				}
			}
		}

	} // /resolveType
	
} // /GameType
