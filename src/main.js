var com = com || {}; com.sudo = com.sudo || {};
// We're not using jQuery here… is it required?

(function() {
	"use strict";
	// load card
	// card loads Card Models
	// load game
	// game loads Game Model
	// card states altered by game state (get or post?)
	//
	
	console.group("main");
	var language = "Arabic";
	var data = {
		"fn"		:	"init",
		"msg"		: "",
		"args"	:	""
	};
	var readiness = {
		// Check ready state based on dependency table
		cards: {state: false, depends: ["game"], ready:function(bool) {cardsReady(bool);}},
		game: {state: false, depends: ["cards"], ready: function(bool) {gameReady(bool);}},
		layout: {state: false, depends: ["game", "cards"], ready:function(bool) {layoutReady(bool);}},
		storage: {state: false, depends: [], ready:function(bool) {storageReady(bool);}},
		change: function(resource, state) {
			this[resource].state = state || true;
		}
	};
	var gameOptions = {
		// Options as defined by DOM
		diff: 		function() {return this.eName("ctrlDifficulty").value;},
		type: 		function() {return this.eID("ctrlType" + this.diff()).value;},
		vowels:		function() {return this.eName("ctrlVowels").checked? "useVowels": "";},
		eID: 			function(idstr) {return document.getElementById(idstr);},
		eName:		function(nstr) {return document.getElementById("gcontrols")[nstr];}
	};
	var card = new Worker("./controller/card.js"); // Interface for cards
	var game = new Worker("./controller/game.js"); // Interface for messages to be sent to handler
	//var card = new Worker("./model/AbstractWorker.js?card.js"); // Interface for cards 
	//var game = new Worker("./model/AbstractWorker.js?game.js"); // Interface for game
	var main = new Worker("./model/AbstractWorker.js"); // Interface for messages to be sent to handler
	var mainHandler = {}, // handler for receiving messages, based on WorkerHandler model
			cardHandler = {},
			gameHandler = {};

	main.addEventListener("message", msg_handler_main, false);
	game.addEventListener("message", msg_handler_game, false);
	card.addEventListener("message", msg_handler_card, false);
	// var storage = new Worker("./controller/storage.js");
	// game: interface
	// cards: object, com.sudo.cards
	// main: interface
	
	// Instantiate game via worker
	// Accepts options as defined by UI form elements
	//console.log("MAIN about to postmsg to card and game. what are they? \n", card, "\n", game);
	postmsg.call(card, "init", language);
	postmsg.call(game, "init", gameOptions.type() + ", " +  gameOptions.vowels());
	
	var scripts = {
		worker: {
			// After loading script, call callback with data
			url: "./model/WorkerHandler.js",
			callback: function(e) {
			
				// Set prototype first based on Parent class,
				// Otherwise prototype properties will be overridden by parent prototype properties
				// When setting Decendent.prototype = new Parent()
				CardHandler.prototype = new WorkerHandler();
				GameHandler.prototype = new WorkerHandler();
				MainHandler.prototype = new WorkerHandler();
				
				WorkerHandler.prototype.getGameType = function(data) {
					console.log("MAIN Generic getGameType called with data: ", data.fn, data.msg);
					getGameType(data.msg);
				};

				WorkerHandler.prototype.setReadyState = function(data) {
					console.log("MAIN Generic setReadyState called");
					//setReadyState(data.msg);
				};

				WorkerHandler.prototype.toggleReadyState = function(data) {
					//toggleReadyState(data.msg);
				};

				GameHandler.prototype.getGameType = function(data) {
					console.log("MAIN GameHandler getGameType called with data: ", data, data.fn, data.msg);
					getGameType(game);
				};

				CardHandler.prototype.init = function(data) {
				//WorkerHandler.prototype.init = function(data) {
					console.log("MAIN CardHandler init called with data: ", data, data.msg, /cards/gi.test(data.msg));
					// Set column to either #cardTable or #choiceColumn depending on whether data.msg tests true for "cards"
					// Legend is the column's legend element
					// heading is the doocument's main header
					console.log("log elements: ", document.getElementById("cardTable"), document.getElementById("choiceColumn"), document.getElementById("gameTypeHeading"));
					//var col = /cards/gi.test(data.msg)? document.getELementById("cardTable"): document.getElementById("choiceColumn");
					var col = document.getElementById("cardTable");
					var legend = col.getElementsByTagName("legend")[0];
					var heading = document.getElementById("gameTypeHeading");
					// Move legend and heading out of column into body
					// Reinsert heading before all child nodes of column;
					// followed by reinserting legend before heading
					moveElement(legend);
					moveElement(heading);
					col.insertBefore(heading, col.childNodes[0]);
					col.insertBefore(legend, heading);
				};

				CardHandler.prototype.createCard = function(data) {
					console.log("createCard called… : ", data.msg);
					var table = document.getElementById("cardTable");
					var card = data.msg;
					table.innerHTML += card;
						
				};

				CardHandler.prototype.setupClickHandlers = function(data) {
					var cards = document.querySelectorAll(".card"),
							len = cards.length,
							i = 0;
					/*for(i; i < len; i++) {
						console.log("setting click handler for: ", cards[i]);
						cards[i].addEventListener("click", clickHandlerCard, false);
					}*/
				};

				GameHandler.prototype.init = function(data) {
					console.log("MAIN GameHandler init called with data: ", data, data.msg);
					
				};

				/*CardHandler.prototype.setupClickHandlers = function(data) {
					console.log("MAIN CardHandler setupClickHandlers called");
				};*/

				WorkerHandler.prototype.ready = function(data) {
					console.log("MAIN Generic ready called: ", data.msg);
				};

				GameHandler.prototype.gameQuestions = function(data) {
					// Receive all cards
					// console.log("MAIN gameQuestions called: ", data);
				};

				GameHandler.prototype.layoutQuestion = function(data) {
					console.log("MAIN GameHandler layout question"); 
					// stop from calling during init… 
					document.getElementById("choiceColumn").innerHTML += data.msg;
				};

				GameHandler.prototype.setGameType = function(data) {
					console.log("MAIN GameHandler setGameType to… \t", data.msg);
				};

				GameHandler.prototype.setGameHeadingForType = function(data) {
					console.log("MAIN GameHandler setGameHeadingForType");
					document.getElementById("gameTypeHeading").innerHTML += data.msg;
				};

				GameHandler.prototype.setQuestionCard = function(data) {
					console.log("MAIN GameHandle resetQuestionCard to:…", data.msg);
					var card = document.getElementById("card_" + data.msg),
							name = "current";
					console.log("MAIN setQuestionCard is: ", card);
					adjustClass([card], name, true);
				};

				GameHandler.prototype.setQuestions = function(data) {
					console.log("MAIN GameHandle rsetQuestions to: ", data.msg);
					var i = 0,
							len = data.msg.length,
							elements = [],
							name = "display-true";

					for(i; i < len; i++) {
						console.log(i, data.msg, data.msg[i]);
						console.log("MAIN: iterate on setQuestions #question_" + data.msg[i], document.getElementById("question_" + data.msg[i]));
						elements[0] = document.getElementById("question_" + data.msg[i]);
						elements[1] = elements[0].nextSibling;
						adjustClass(elements, name, true);
					}
				};

				GameHandler.prototype.hidePreviousQuestions = function(data) {
					if(data.msg.length > 0) {
						var i = 0,
							len = data.msg.length,
									elements = [],
									name = "display-true";
						for(i; i < len; i++) {
							elements[0] = document.getElementById("question_" + data.msg[i]);
							elements[1] = elements[0].nextSibling;
							adjustClass(elements, name, false);
							unsetQuestionCard(data.msg);
						}
					}
				};
				
				function clickHandlerCard(e) {
					console.log(e.target.id);
				}

				function moveElement(element, target) {
					console.log("MAIN moveElement: ", element, target);
					// If the element is hidden, leave it hidden; otherwise, hide it
					element.className = /disp_none/g.test(element.className)? element.className: element.className += "disp_none";
					var _target = target || document.getElementsByTagName("body")[0];
					// Move the element to resolved target (element | body)
					_target.appendChild(element);
					// Unhide the moved element
					element.className.replace("\\s{0,}disp_none\\s{0,}","");
				}
					
				function unsetQuestionCard(array) {
					console.log("unsetting question cards");
					var name = "current",
						elements = [],
						len = array.length,
						i = 0;
					for(i; i < len; i++) {
						console.log(array[i]);
						elements.push(document.getElementById("card_" + array[i]));
					}
					adjustClass(elements, name, false);
				}
					
				function adjustClass(elements, name, forShow) {
					var rex = new RegExp("\s{0,}"+name,"g"),
						len = elements.length,
						i = 0;
					
					for(i; i < len; i++) {
						if(!!forShow) // if for show
							elements[i].className += " " + name;
						else
							elements[i].className.replace(name,"");
					}
						
				}

				gameHandler = new GameHandler();
				mainHandler = new MainHandler();
				cardHandler = new CardHandler();
			}
		},
		layout: {
			url: "./model/Layout.js",
			callback: function(e) {
				console.log("Layout model loaded");
			}
		},
		storage: {
			url: "./model/Storage.js",
			controller: {
				url: "./controller/storage.js",
				callback: function(e) {
					console.log("Storage.controller scriptLoad callback called");
					
				}
			},
			callback: function(e) {
				console.log("storage scriptLoad callback called");
				// addScript.call(scripts.storage.controller);
			}
		}
	};

	addScript.call(scripts.worker);
	//addScript.call(scripts.card);
	//addScript.call(scripts.layout);

	function msg_handler_main(e) {
		console.log("%cMAIN msg_handler_MAIN called", "color: orange;", e);
		msg_handler.call(mainHandler, e.data);
	}

	function msg_handler_game(e) {
		console.log("%cMAIN msg_handler_GAME called", "color: cyan;", e);
		msg_handler.call(gameHandler, e.data);
	}

	function msg_handler_card(e) {
		console.log("%cMAIN msg_handler_CARD called", "color: magenta;", e);
		msg_handler.call(cardHandler, e.data);
	}

	function msg_handler(dataFromWorker) {
		//console.log("%cmsg_handler: ", "color: blue;",  dataFromWorker, this, "\n\tfn: ", dataFromWorker.fn);
		console.log("%ccalling: ", "color: blue;", this, this[dataFromWorker.fn]);
		this[dataFromWorker.fn](dataFromWorker);
	}

	function addScript() {
		var head = document.getElementsByTagName("head")[0],
				script = document.createElement("script");
			
		script.addEventListener("load", this.callback, false);			
		script.src = this.url;
		head.appendChild(script);

	}

	function postmsg(fn, msg, args) {
		console.log("MAIN postmsg called for this, fn, msg, args…\n\t", this, fn, msg, args);
		data.fn = fn;
		data.msg = msg;
		data.args = args;
		this.postMessage(data);
	}

	function gameReady(bool) {
		console.log("CALL gameReady. Init.");
		if(checkReadyDependencies("game")) {
			console.log("game AND dependencies are ready");
			readyGame();
		}
	}
	
	function cardsReady(bool) {
		console.log("CALL cardsReady. Init.");
		if(checkReadyDependencies("cards")) {
			console.log("cards AND dependencies are ready");
			readyGame();
		}
	}
	
	function layoutReady(bool) {
		console.log("CALL layoutReady. Init.");
		if(checkReadyDependencies("layout")) {
			
		}
	}

	function storageReady(bool) {
		console.log("CALL storageReady. Init.");
		if(checkReadyDependencies("storage")) {

		}
	}

	function readyGame() {
		console.log("set readyGame()");
		postmsg.call(card, "mainReady", "true");
		postmsg.call(game, "mainReady", "true");
	}

	function checkReadyDependencies(resource) {
		var i = 0,
				len = readiness[resource].depends.length,
				ready = true;
		
		// If dependencies, check ready state
		for(i; i < len; i++) {
			console.log("running for each dependency");
			if(readiness[readiness[resource].depends[i]].state === false) {
				// Check if dependencies are ready by property determined by associative array
				ready = false;
				break;
			}
		}
		// If no dependencies, just return true
		return ready;
	}
			
	function toggleReadyState(resource, bool) {
		console.log("toggleReadyState from: ", readiness[resource].state);
		readiness[resource].state = bool || !readiness[resource].state? true: false;
		readiness[resource].ready(readiness[resource].state);
		console.log("toggleReadyState to: ", resource, readiness[resource].state);
	}

	function setReadyState(resource) {
		console.log("setReadyState from: ", readiness[resource].state);
		readiness[resource].state = true;
		readiness[resource].ready(readiness[resource].state);
		console.log("setReadyState to: ", resource, readiness[resource].state);
	}

	function getGameType(iface) {
		console.log("%cMAIN getGameType called: ", "background: silver;", iface, gameOptions.type(), gameOptions.vowels());
		postmsg.call(iface, "getGameType", gameOptions.type() + ", " +  gameOptions.vowels());
	}

	function getInterface(name) {
		return this[name]; //error. not a function
	}
	
	this.getGameInterface = function() {
		return game;
	};
	
	this.getMainInterface = function() {
		return main;
	};
	
	this.getReadyState = function(resource) {
		return readiness[resource].state;
	};
	
	function MainHandler() {}
	function CardHandler() {}
	function GameHandler() {}
	
	/* CONTROL ELEMENTS
	/
	/	ctrlReset
	/	ctrlSkip
	/	ctrlPrev
	/	ctrlDiffBasic
	/	ctrlDiffAdvanced
	/	difficultyTypeText
	/	ctrlTypeBasic
	/	ctrlTypeAdvanced
	*/
	
	/* ANSWER ELEMENTS
	/	question_rad_(#POSITION)
	/	
	*/



	document.getElementById("copyrightYear").innerHTML = new Date().getFullYear();
	console.groupEnd();
}).apply(com.sudo);
