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
	"msg"		: 	"",
	"args"		:	""
};
var readiness = {
	// Check ready state based on dependency table
	cards: {state: false, depends: ["game"], ready:function(bool) {cardsReady(bool);}},
	game: {state: false, depends: ["cards"], ready: function(bool) {gameReady(bool);}},
	layout: {state: false, depends: ["game", "cards"], ready:function(bool) {layoutReady(bool);}},
	storage: {state: false, depends: [], ready:function(bool) {storageReady(bool);}},
	change: function(resource, state) {
		this[resource].state = state || true;
	},
	update: function() {
						this.iteration += 1;
					},
	iteration: 0 
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
var main = new Worker("./model/AbstractWorker.js"); // Interface for messages to be sent to handler
var mainHandler = {}, // handler for receiving messages, based on WorkerHandler model
	cardHandler = {},
	gameHandler = {};

main.addEventListener("message", msg_handler_main, false);
game.addEventListener("message", msg_handler_game, false);
card.addEventListener("message", msg_handler_card, false);
// var storage = new Worker("./controller/storage.js");

// game: Interface
// card: Interface
// main: Prototype

// Instantiate game via worker
// Accepts options as defined by UI form elements

//console.log("MAIN about to postmsg to card and game. what are they? \n", card, "\n", game);
postmsg.call(card, "init", language);
postmsg.call(game, "init", gameOptions.type() + ", " +  gameOptions.vowels());
		
// Set prototype first based on Parent class,
// Otherwise prototype properties will be overridden by parent prototype properties
// When setting Decendent.prototype = new Parent()
CardHandler.prototype = new WorkerHandler();
GameHandler.prototype = new WorkerHandler();
MainHandler.prototype = new WorkerHandler();

// concat main.abstract.workerHandler.js
// concat main.card.workerHandler.js
// concat main.game.workerHandler.js
// concat main.workerHandler.helper.js
	
	
	
