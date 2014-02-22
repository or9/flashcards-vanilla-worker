function Game() {
	"use strict";
	var expected = ""; // write only
	
	this.answer = function(answer) {
		return answer === expected? true: false;
	};
	
	this.state = {
		ready: false,
		started: false,
		ended: false,
		initialized: false
	};

	this.setExpected = function(expectedAnswer) {
		console.log("setting expected to " + expectedAnswer + " " + typeof expectedAnswer);
		expected = expectedAnswer;
	};
}

function CardGame(type) {
	"use strict";
	
	var initExpected = 0;
	var cards = []; // Array of objects; why?
	var types = {
		// Keep object for reference globally within CardGame
		basic: {
			char2Trans: function() {
				// Provided char, user must match to transliteration (and name?)
				console.log("setting game type to basic matchChar2Transliteration");
				types.current = "basic.char2Trans";
				types.heading = "Select the Character Card&#8217;s Name";
				types.question = "The character&#8217;s name is&hellip; ";
			},
			trans2Char: function() {
				// Provided transliteration, user must match to char
				console.log("setting game type to basic matchTransliteration2Char");
				types.current = "basic.trans2Char";				
				types.heading = "Select the Named Card&#8217;s Character";
				types.question = "This character is&hellip; ";
			},
			sound2Char: function() {
				// Provided sound, user must match to char
				console.log("setting game type to basic matchChar2Sound");
				types.current = "basic.sound2Char";
				types.heading = "What Character Makes This Sound?";
				types.question = "That sound is&hellip; ";			
			}
		},
		advanced: {
			charform2Initial: function() {
				// Provided char form (random, !initial), user must match to initial form (and name?)
				console.log("setting game type to advanced matchCharForm2InitialForm");
				types.current = "advanced.charform2Initial";
				types.heading = "Select the Card&#8217;s Initial Form";
				types.question = "The initial form of the character is&hellip; ";
			},
			trans2Charform: function() {
				// Provided char transliteration, user must match to form(random, !initial)
				console.log("setting game type to advanced matchTransliteration2Form");
				types.current = "advanced.trans2Charform";
				types.heading = "Select an Associated Form of the Named Card";
				types.question = "One possible form is&hellip; ";		
			},
			sound2Charform: function() {
				//Provided sound, user must match to form(random, !initial)
				console.log("setting game type to advanced matchSound2Form");
				types.current = "advanced.sound2Charform";			
				types.heading = "Select an Associated Form of the Spoken Card";
				types.question = "That sound was&hellip; ";
			}
		},
		useVowels: false,
		allQuestions: false,
		current: "",
		heading: "",
		question: ""
	};
	
	var questions = {
		unanswered: [],
		answered: [],
		numToShow: 5,
		text: function(type) {
			// stub...
			
		}
	};
	
	console.log(type, Array.prototype.slice.apply(arguments).slice(1));

	var types = new GameType(type, Array.prototype.slice.apply(arguments).slice(1));
	console.log("types object initialized and set to…: ", types);

//	setType(type, Array.prototype.slice.apply(arguments).slice(1));

	this.init = function(cardsDataObj) {
		/*
		 * id, character, name, transliteration, position, contextualForms, tags
		 */
		console.log(cardsDataObj);
		console.log("CARDGAME INIT: cards param from game: ", cards);
		
		this.state.initialized = true;
		postmsg("init", "game");
		
		for(var single in cardsDataObj) {
			//console.log("for single in cards: " + cardsDataObj[single]);
			cards.push(cardsDataObj[single]); // can't push to obj'
			
			populateQuestions(cardsDataObj[single]);
			createQuestionElement(cardsDataObj[single]);
		}
		
		postmsg("setGameHeadingForType", types.heading);
		
		this.state.ready = true;
		//postmsg("ready", "game");
		postmsg("setReadyState", "game");
	};
	
	this.start = function(data) {
		this.state.started = true;
		nextRandomQuestion.call(this);
	};
	
	function populateQuestions(cardObj) {
		questions.unanswered.push(cardObj.position - 1);
		questions.answered = [];
	}
	
	function createQuestionElement(cardObj) {
		// Create HTML for answer label and input elements, send to main
		var label = "<label class=\"question " + types.current + "\" id=\"question_" + cardObj.position + "\" for=\"question_rad_" + cardObj.position + "\" >"; // questions.current
		var labelEnd = "</label>";
		var _question = types.question + "<strong class=\"answer\">" + cardObj.name + "</strong>"; // questions.text
		var radio = "<input class=\"question\" type=\"radio\" name=\"questions\" id=\"question_rad_" + cardObj.position + "\" />";
		
		postmsg("layoutQuestion", label + _question + labelEnd + radio);
	}
	
	function postmsg(fn, msg) {
		data.fn = fn;
		data.msg = msg;
		postMessage(data);
	}
	
	function nextRandomQuestion() {
		// select random answers up to questions.numToShow - 1 + real answer, shuffle
		var i = 0,
			len = questions.numToShow - 1,
			arr = [],
			newExpected = randomIntFromSet();
			
		for(i; i < len; i++) {
			arr.push(randomQuestion());
		}
		
		function randomQuestion() {
			var q = randomIntFromTotal();
			if(q === newExpected) {
				randomQuestion();
			} else {
				return q;
			}
		}
		
		this.setExpected(newExpected);
		initExpected = newExpected;
		console.log("newExpected is " + newExpected + " " + typeof newExpected);
		arr.push(newExpected);
		
		postmsg("setQuestionCard", newExpected);
		// first cards need to be ready before posting
		
		postmsg("hidePreviousQuestions", questions.answered);
		postmsg("setQuestions", shuffle(arr));
	}
	
	function setType(type, options) {
		// type: 0, CHAR; 1, TRANS; 2, ADVANCED CHAR; 3, ADVANCED TRANS; 4, "SOUND"; 5 "ADVANCED SOUND"
		// options: {useVowels: true|false, advanced: true|false}
		
		console.log("SETTYPE: " + type);
		console.log("SETTYPE options: " + options);
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
	
	function randomIntFromSet() {
		// Used for getting a single random integer
		//var _max = max || limit.max;
		//return Math.floor(Math.random() * (_max - limit.min + 1) + limit.min);
		var rand = Math.floor(Math.random() * questions.unanswered.length);
		return questions.unanswered[rand];
	}
	
	function randomIntFromTotal() {
		// used for getting a set of random selections
		var mini = 1,
			maxi = questions.unanswered.length + questions.answered.length;
		return Math.floor(Math.random() * (maxi - mini + 1) + mini);
	}
	
	function shuffle(array) {
		var counter = array.length, temp, index;
	
		// While there are elements in the array
		while (counter--) {
			// Pick a random index
			index = (Math.random() * counter) | 0;
		
			// A	nd swap the last element with it
			temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}
		return array;
	}
	
	this.verify = function(answerIndex) {
		var index = questions.unanswered.indexOf(answerIndex);
		if(this.answer(answerIndex)) {
			questions.unanswered.splice(index, 1);
			questions.answered.push(index);
			nextRandomQuestion();
		} else {
			postmsg("game", ["Incorrect", answerIndex]);
		}
	};

	this.getCards = function(index) {
		return !!index? cards[index]: cards;
	};

	this.getQuestions = function(index) {
		return !!index? questions.all[index]: questions.all;
	};
	
	this.setQuestions = function(data) {
		// console.log("cards: " + cards);
		
	};
	
	this.resetGame = function(data) {
		
	};

	this.setCards = function(cardsArray) {
		cards = typeOf(cardsArray) === "array"? cardsArray: cards.push(cardsArray);
	};
	
	this.getInitExpected = function() {
		var tmp = initExpected;
		initExpected = null;
		console.log("---posting seQuestionCard message with tmp: " + tmp);
		postmsg("setQuestionCard", tmp);
		tmp = null;
	};

}

CardGame.prototype = new Game();	
