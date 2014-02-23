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
	
	var language = "Arabic";
	var data = {
		//"fn": "initGame",
		"fn"		:	"init",
		"msg"		: "",
		"args"	:	""
	};
	var readiness = {
		cards: {state: false, depends: ["game"], ready:function(bool) {cardsReady(bool);}},
		game: {state: false, depends: ["cards"], ready: function(bool) {gameReady(bool);}},
		layout: {state: false, depends: ["game", "cards"], ready:function(bool) {layoutReady(bool);}},
		storage: {state: false, depends: [], ready:function(bool) {storageReady(bool);}},
		change: function(resource, state) {
			this[resource].state = state || true;
		}
	};
	var gameOptions = {
		diff: 		function() {return this.eName("ctrlDifficulty").value;},
		type: 		function() {return this.eID("ctrlType" + this.diff()).value;},
		vowels:		function() {return this.eName("ctrlVowels").checked? "useVowels": "";},
		eID: 			function(idstr) {return document.getElementById(idstr);},
		eName:		function(nstr) {return document.getElementById("gcontrols")[nstr];}
	};
	var card = new Worker("./controller/card.js");
	var game = new Worker("./controller/game.js");
	var mainHandler = function() {}; // handler for receiving messages, based on WorkerHandler model
	var main = new Worker("./model/AbstractWorker.js"); // Interface for messages to be sent to handler
	main.addEventListener("message", msg_handler, false);
	game.addEventListener("message", msg_handler, false);
	// var storage = new Worker("./controller/storage.js");
	// game: interface
	// cards: object, com.sudo.cards
	// main: interface
	
	// Instantiate game via worker
	// Accepts options as defined by UI form elements
	postmsg.call(card, "init", language);
	postmsg.call(game, "init", gameOptions.type() + ", " +  gameOptions.vowels());
	//console.log("post type() and vowels()", gameOptions.type() + ", " + gameOptions.vowels());
	var scripts = {
		worker: {
			url: "./model/WorkerHandler.js",
			callback: function(e) {
				mainHandler = new MainHandler();
				function MainHandler() {
					// console.log("MainHandler");
					this.test = function(data) {
						console.log("TEST: ", data.msg);
					};

					this.setReadyState = function(data) {
						console.log("setReadyState called");
						setReadyState(data.msg);
					};
					
					this.toggleReadyState = function(data) {
						toggleReadyState(data.msg);
					};

					this.getGameType = function(data) {
						console.log("MAIN: calling getGameType with data: ", data);
						getGameType(game);
					};

					this.init = function(data) {
						console.log("this.init: ", data, data.msg, /cards/gi.test(data.msg));
						var col = /cards/gi.test(data.msg)? document.getElementById("cardTable"): document.getElementById("choiceColumn");
						var legend = col.getElementsByTagName("legend")[0];
						var heading = document.getElementById("gameTypeHeading");
						moveElement(legend);
						moveElement(heading);
						// col.innerHTML = ""; // don't do this - it will rm newly added cards
						col.insertBefore(heading, col.childNodes[0]);
						col.insertBefore(legend, heading);
					};
					
					this.ready = function(data) {
						console.log("GAME says READY: ", data.msg);
					};
					
					this.gameQuestions = function(data) {
						// Receive all cards
						//console.log("main received gameQuestions: ", data);
					};
					
					this.layoutQuestion = function(data) {
						console.log("layout question");
						// stop this from calling during init...
						document.getElementById("choiceColumn").innerHTML += data.msg;
					};

					this.setGameType = function(data) {
						console.log("MAIN setGameType to… \t", data.msg);
					};
					
					this.setGameHeadingForType = function(data) {
						console.log("setGameHeadingForType");
						document.getElementById("gameTypeHeading").innerHTML += data.msg;
					};
					
					function moveElement(element, target) {
						console.log("element: ", element, target);
						element.className = /disp_none/g.test(element.className)? element.className: element.className += "disp_none";
						var _target = target || document.getElementsByTagName("body")[0];
						_target.appendChild(element);
						element.className.replace("\\s{0,}disp_none\\s{0,}","");
					}
					
					this.setQuestionCard = function(data) {
						console.log("setting question card to card_", data.msg);
						console.log(document.getElementById("card_1"));
						var card = document.getElementById("card_" + data.msg),
							name = "current";
						console.log("log setQuestionCard: ", card);
							
						adjustClass([card], name, true);
					};
					
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
					
					this.setQuestions = function(data) {
						console.log("main.setQuestions data: ", data.msg);
						var i = 0,
							len = data.msg.length,
							elements = [],
							name = "display-true";
						
						for(i; i < len; i++) {
							console.log(i, data.msg, data.msg[i]);
							console.log("MAIN: iterate on setQuestions #question_" + data.msg[i], document.getElementById("question_" + data.msg[i]));
							// Why 0 and 1?
							elements[0] = document.getElementById("question_" + data.msg[i]);
							// what's this doing?
							elements[1] = elements[0].nextSibling;
							console.log("elements: [0, 1], nextSibling: ", elements);
							adjustClass(elements, name, true);
						}
						
					};
					
					this.hidePreviousQuestions = function(data) {
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
					
				}

				MainHandler.prototype = new WorkerHandler();
			}
		},
		card: {
			url: "./controller/card.js",
			callback: function(e) {
				console.log("card scriptLoad callback called");
				 
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
	addScript.call(scripts.layout);

	function msg_handler(e) {
		if(!!e.data && !!e.data.fn) {
			(function() {
				this[e.data.fn](e.data);
			}).apply(mainHandler);
		}
	}

	function addScript() {
		var head = document.getElementsByTagName("head")[0],
			script = document.createElement("script");
			
		script.addEventListener("load", this.callback, false);			
		script.src = this.url;
		head.appendChild(script);

	}

	function postmsg(fn, msg, args) {
		data.fn = fn;
		data.msg = msg;
		data.args = args;
		console.log(this, "posting message", data);
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
		postmsg.call(iface, "getGameType", gameOptions.type() + ", " +  gameOptions.vowels());
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
}).apply(com.sudo);
