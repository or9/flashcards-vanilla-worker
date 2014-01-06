"use strict";
importScripts("../model/Game.js");
addEventListener("message", msg_handler, false);
addEventListener("error", err_handler, false);

var data = {
	fn: "",
	msg: ""
};
var cache = false;
var cardGame = new CardGame("junkType", "option1", "option2", "junk", "junk2", 1, 2);
var jsonData = {};
// ajax("game.json", cardGame.init);

function msg_handler(e) {
	postMessage(data);
	data.fn = e.data.fn;
	
	if(!!e.data && !!e.data.fn) {
		if(e.data.fn === "game") {
			(function() {
				// console.log(cardGame);
				cardGame[e.data.fn](e.data);
			})();
		} else {
			(function() {
				self[e.data.fn](e.data);
			})();
		}
	}
}

function createQuestion(data) {
	
}

function getQuestions(range) {
	
}

function startGame(data) {
	console.log("startGame from game Worker");
	cardGame.init(data.msg);
	data.fn = "gameQuestions";
	data.msg = data.msg;
	postMessage(data);
}

function err_handler(e) {
	data.fn = "error";
	data.msg = "Error @: ", e.lineno, "\n\t File: ", e.filename, "\n\t Message:", e.message;
	postMessage(data);
}

function setupData(data) {
	
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
				data.status = true;
			} else {
				data.status = false;
				callback(ax.responseText);
			}
		}
	}
}

function err_handler(e) {
	postMessage("Error @: ", e.lineno, "\n\t File: ", e.filename, "\n\t Message:", e.message);
}