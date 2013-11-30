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
addEventListener("message", msg_handler, false);
addEventListener("error", err_handler, false);

importScripts("../model/Game.js");

var data = {
	fn: "",
	msg: ""
};
var game = new CardGame();

ajax("game.json", game.init);

function msg_handler(e) {
	postMessage(game);
	game.fn = e.data.fn;
	
	if(!!e.data && !!e.data.fn) {
		(function() {
			game[e.data.fn](e.data);
		})();	
	}
}

function err_handler(e) {
	postMessage("Error @: ", e.lineno, "\n\t File: ", e.filename, "\n\t Message:", e.message);
}

function ajax(src, callback) {
	var ax = new XMLHttpRequest();
	var random = !!cache? "": Math.random();
	ax.addEventListener("readystatechange", ajax_handler, false);
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