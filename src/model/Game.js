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
	"use strict";
	
	var cards = [];
	var types = {
		// Keep object for reference globally within CardGame
		basic: {
			char2Trans: function() {
				// Provided char, user must match to transliteration (and name?)
				console.log("setting game type to basic matchChar2Transliteration");
				
			},
			trans2Char: function() {
				// Provided transliteration, user must match to char
				console.log("setting game type to basic matchTransliteration2Char");
				
			},
			sound2Char: function() {
				// Provided sound, user must match to char
				console.log("setting game type to basic matchChar2Sound");
				
			}
		},
		advanced: {
			charform2Initial: function() {
				// Provided char form (random, !initial), user must match to initial form (and name?)
				console.log("setting game type to advanced matchCharForm2InitialForm");
			},
			trans2Charform: function() {
				// Provided char transliteration, user must match to form(random, !initial)
				console.log("setting game type to advanced matchTransliteration2Form");
				
			},
			sound2Charform: function() {
				//Provided sound, user must match to form(random, !initial)
				console.log("setting game type to advanced matchSound2Form");
				
			}
		},
		useVowels: false,
		allQuestions: false
	};
	
	var questions = {
		total: 0,
		current: 0,
		answered: [],
		expect: 0
	};
	var expected = "cg priv";
	var limit = {max: 0, min: 0};
	setType(type, Array.prototype.slice.apply(arguments).slice(1));

	this.state.ready = true;

	this.init = function(cards) {
		console.log("CardGame.init");
		questions = {
			current: {},
			answered: {
				"question": 0,
				"isCorrect": false
			},
			all: []
		};
		this.state.initialized = true;
	};
	
	function answer() {
		
	}
	
	function nextRandomQuestion() {
		for(var answered in questions) {
			
		}
		
	}
	
	function setType(type, options) {
		// type: 0, CHAR; 1, TRANS; 2, ADVANCED CHAR; 3, ADVANCED TRANS; 4, "SOUND"; 5 "ADVANCED SOUND"
		// options: {useVowels: true|false, advanced: true|false}
		
		console.log(type);
		console.log(options);
		// if type is present and a string, change to uppercase, otherwise use number
		var _type = !!type && typeof type === "string"? type.toString(): "default",
			_options = options || {},
			rex_adv = /ADVANCED+/gi,
			rex_sound = /SOUND+/gi,
			rex_translit = /TRANS\w+/i,
			rex_char = /CHAR\w+/i;
			
			console.log(_type + " " + typeof _type);
			
		if(_type.match(rex_adv)) {
			setAdvanced();
		} else {
			setBasic();
		}
		
		function sortOptions() {
			// if not not (so, if true)
			if(!!options.advanced) {
				setAdvanced();
			} else {
				setBasic();
			}
		}
		
		function setBasic() {
			console.log("game, setBasic");
			setOptions();
			if(_type.match(rex_sound)) {
				types.basic.sound2Char();				
			} else if(_type.match(rex_translit)) {
				types.basic.trans2Char();				
			} else {
				types.basic.char2Trans();				
			}
		}
		
		function setAdvanced() {
			console.log("game, setAdvanced");
			setOptions();
			if(_type.match(rex_sound)) {
				types.advanced.sound2Charform();
			} else if(_type.match(rex_translit)) {
				types.advanced.trans2Charform();
			} else {
				types.advanced.charform2Initial();
			}
		}
		
		function setOptions() {
			console.log("game, setting options");
			for(var key in options) {
				checkOption(key, options[key]);
			}
			
			function checkOption(key, option) {
				console.log("game, checking options");
				var rex_q = /question/gi,
					rex_vowels = /vowel/gi;
				
				if(key.match(rex_q)) {
					if(option === true) {
						types.allQuestions = true;
					} else {
						types.allQuestions = false;
					}
					
				}
				
				if(key.match(rex_vowels)) {
					if(option === true) {
						types.useVowels = true;
					} else {
						types.useVowels = false;
					}
				}
			}
		}
	} // /setType
	
	function getRandomInt(max) {
		var _max = max || limit.max;
		return Math.floor(Math.random() * (_max - limit.min + 1) + limit.min);
	}

	this.getCards = function(index) {
		return !!index? cards[index]: cards;
	};

	this.getQuestions = function(index) {
		return !!index? questions[index]: questions;
	};
	
	this.setQuestions = function(cards) {
		questions = cards;
	};

	this.setCards = function(cardsArray) {
		cards = typeOf(cardsArray) === "array"? cardsArray: cards.push(cardsArray);
	};

}

CardGame.prototype = new Game();	