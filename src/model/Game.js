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
		//console.log("setting expected to " + expectedAnswer + " " + typeof expectedAnswer);
		expected = expectedAnswer;
	};
}

/*CardGame.prototype.init = function(cardsDataObj) {
		// requires access to private functions….
}*/

function CardGame(type) {
	"use strict";
	
	var initExpected = 0;
	var cards = []; // Array of objects; why?
	var types = {};
	var questions = {
		unanswered: [],
		answered: [],
		numToShow: 5,
		text: function(type) {
			// stub...
			
		}
	};

//	if(!this.state.initialized) {
		//console.log("CARDGAME: state is NOT initialized. \t set GameType");
		types = new GameType(type, Array.prototype.slice.apply(arguments).slice(1));
		//console.log("finished creating types");
	//}

	for(var prop in types) {
		//console.log("\t CARDGAME: prop in types: " + prop + "\t val: " + types[prop]);
	}
	
	this.init = function(cardsDataObj) {
		/*
		 * id, character, name, transliteration, position, contextualForms, tags
		 */
		//console.log(cardsDataObj);
		//console.log("CARDGAME INIT: cards param from game: ", cards);
		
		this.state.initialized = true;
		postmsg("init", "game");
		
		for(var single in cardsDataObj) {
			//console.log("for single in cards: " + cardsDataObj[single]);
			cards.push(cardsDataObj[single]); // can't push to obj'
			
			populateQuestions(cardsDataObj[single]);
			createQuestionElement(cardsDataObj[single]);
		}

		//console.log("setting game type and setting heading for type: " + types.current + " \t " + types.heading);
		postmsg("setGameType", types.current);	
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
		//console.log("createQuestionElement type properties \t" + types.current + types.question + types.heading);
		var index = cardObj.position - 1;
		var label = "<label class=\"question " + types.current + "\" id=\"question_" + index + "\" for=\"question_rad_" + index + "\" >"; // questions.current
		var labelEnd = "</label>";
		var _question = types.question + "<strong class=\"answer\">" + cardObj.name + "</strong>"; // questions.text
		var radio = "<input class=\"question\" type=\"radio\" name=\"questions\" id=\"question_rad_" + index + "\" />";
		var concat = label + _question + labelEnd + radio;
		
		postmsg("layoutQuestion", concat);
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

		//console.log("Game Model new expected answer is: " + newExpected);
		
		// Tried while; it broke everything
		for(var i = 0; i < len; i++) {
			arr.push(randomQuestion());	
		}

		function randomQuestion() {
			var q = randomIntFromTotal();
			//console.log("check if random is also newExpected answer");
			if(q === newExpected) {
				//console.log("\tnewExpected IS IN FACT random gen. regen");
				randomQuestion();
			} else if(checkIfDuplicate(q)) {
				randomQuestion();
			} else {
				//console.log("\tnewExpected was NOT random gen., and not already present; return random");
				return q;
			}

			function checkIfDuplicate(n) {
				var len = arr.length;
				for(var i = 0; i < len; i++) {
					if(arr[i] === n) {
						randomQuestion();
					}
				}
			}

			//return q;
		}
		
		this.setExpected(newExpected);
		initExpected = newExpected;
		//console.log("newExpected is " + newExpected + " " + typeof newExpected);
		arr.push(newExpected);
		
		postmsg("setQuestionCard", newExpected);
		// first cards need to be ready before posting
		
		postmsg("hidePreviousQuestions", questions.answered);
		postmsg("setQuestions", shuffle(arr));
	}
	
	function randomIntFromSet() {
		// Used for getting a single random integer
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

	this.nextQuestion = function() {
		nextRandomQuestion.call(this);
	};

	this.previousQuestion = function() {
	
	};

	this.getQuestionAt = function(index) {

	};
	
	this.verify = function(answerIndex) {
		var index = questions.unanswered.indexOf(answerIndex);
		if(this.answer(answerIndex)) {
			questions.unanswered.splice(index, 1);
			questions.answered.push(index);
			nextRandomQuestion();
			return true;
		} else {
			return false;
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
		//console.log("---posting seQuestionCard message with tmp: " + tmp);
		postmsg("setQuestionCard", tmp);
		tmp = null;
	};

}

CardGame.prototype = new Game();	
