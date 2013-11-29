/*
 * Flashcard is main
 * Card instantiated for each card by Flashcard instance
 * Main initializes, sets / gets values, runs
 */

/* Game properties 
 * 		set language
 * 		create web workers
 * 		instantiate cards
 */

"use strict";
// importScripts("game.json");
ajax("../model/Game.js", gameLoaded);
ajax("game.json", dataLoaded);

var cache = false;
var game = {
	fn: "",
	id: location["search"].slice(1),
	state: {
		initialized: false,
		ran: false,
		ended: false
	}	
};
// var feed = importScripts("../controller/game.json");
var isInit = false;

addEventListener("message", msg_handler, false);
addEventListener("error", err_handler, false);

function msg_handler(e) {
	// game.fn = "test";
	// game.msg = e.data.msg;
	postMessage(game);
	game.fn = e.data.fn;
	
	if(!!e.data && !!e.data.fn) {
		(function() {
			this[e.data.fn](e.data);
		})();	
	}
}

function err_handler(e) {
	postMessage("Error @: ", e.lineno, "\n\t File: ", e.filename, "\n\t Message:", e.message);
}

function gameLoaded(response) {
	console.log(response);
}

function dataLoaded(response) {
	console.log(response);
}

function begin(isInit) {
	if(!isInit) {
		isInit = true;
	}
}

function answer(data) {

}

function end(data) {

}

function checkAnswer(answer) {

}

function ajax(src, callback) {
	var ax = new XMLHttpRequest();
	var random = !!cache? "": Math.random();
	ax.addEventListener("readyStateChange", ajax_handler, false);
	ax.open("GET", src + "?" + random, true);
	ax.send();
	
	function ajax_handler(e) {
		if(ax.readyState === 4) {
			if(ax.status === 200) {
				callback(ax.responseText);
				game.status = true;
			} else {
				game.status = false;
				callback(ax.responseText);
			}
		}
	}
}