var com = com || {}; com.sudo = com.sudo || {};
// We're not using jQuery here… is it required?
// I like to use !! to coerce a boolean return

(function() {
	"use strict";
	// load card
	// card loads Card Models
	// load game
	// game loads Game Model
	
	var data = {
		"fn": "startGame",
		"msg": ""
	};
	var readyState = {
		cards: false,
		game: false,
		layout: false
	};
	var game = function() {};
	var gameInterface = new Worker("./controller/game.js");
	var mainHandler = function() {}; // handler for receiving messages, based on WorkerHandler model
	var main = new Worker("./model/AbstractWorker.js"); // Interface for messages to be sent to handler
	main.addEventListener("message", msg_handler, false);
	gameInterface.addEventListener("message", msg_handler, false);
	// this.storage = new Worker("./controller/storage.js");
	// var storage = new Worker("./controller/storage.js");
	
	// game: interface
	// cards: object, com.sudo.cards
	// main: interface
	
	var scripts = {
		worker: {
			url: "./model/WorkerHandler.js",
			callback: function(e) {
				mainHandler = new MainHandler();
				function MainHandler() {
					// console.log("MainHandler");
					this.toggleReadyState = function(data) {
						toggleReadyState(data.msg);
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
						console.log("GAME IS READY");
					};
					
					this.gameQuestions = function(data) {
						// Receive all cards
						//console.log("main received gameQuestions: ", data);
					};
					
					this.layoutQuestion = function(data) {
						//console.log("layout question");
						// stop this from calling during init...
						document.getElementById("choiceColumn").innerHTML += data.msg;
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
						var i = 0,
							len = data.msg.length,
							elements = [],
							name = "display-true";
							
						for(i; i < len; i++) {
							elements[0] = document.getElementById("question_" + data.msg[i]);
							elements[1] = elements[0].nextSibling;						
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
		game: {
			url: "./model/Game.js",
			callback: function(e) {
				console.log("Game model scriptLoad callback");
                // to ensure game is loaded before cards, load cards on completion
                addScript.call(scripts.card);
				game = new CardGame("junkType", "option1", "option2", "junk", "junk2", 1, 2);
				// game.controller = new Worker("./controller/game.js");
				
				
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
	addScript.call(scripts.card);
	addScript.call(scripts.layout);
	// addScript.call(scripts.game);
	addScript.call(scripts.storage);
	// addScript.call(scripts.storage.controller);

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
	
	function toggleReadyState(resource) {
		readyState[resource] = !!readyState[resource]? false: true;
		console.log("toggleReadyState: ", resource, readyState[resource]);
		if(resource === "cards") {
			mainHandler.setQuestionCard(gameInterface.postMessage({"fn": "game", "msg": "getInitExpected"}));
		}
	}
	
	this.getGameInterface = function() {
		return gameInterface;
	};
	
	this.getMainInterface = function() {
		return main;
	};
	
	this.getReadyState = function(resource) {
		return readyState[resource];
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
