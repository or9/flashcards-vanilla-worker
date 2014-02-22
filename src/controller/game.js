"use strict";
importScripts("../model/GameType.js");
importScripts("../model/Game.js");
addEventListener("message", msg_handler, false);
addEventListener("error", err_handler, false);

var data = {
	fn: "",
	msg: ""
};
var ready = {
	data: false,
	model: false,
	main: false
};
var cache = false;
var cardGame = function() {};
var jsonData = {};
var type = getGameType();
var instance = 0;

ajax("characters.json", setJsonData);

function msg_handler(e) {
	//postMessage(data);
	data.fn = e.data.fn;
	
	if(!!e.data && !!e.data.fn) {
		if(e.data.fn === "game") {
			(function() {
				console.log("GAME WORKER CARDGAME received: " + e.data.msg);
				cardGame[e.data.fn](e.data);
			})();
		} else {
			(function() {
				console.log("GAME WORKER INTERFACE received: " + e.data.msg);
				self[e.data.fn](e.data);
			})();
		}
	}
}

function init(data) {
	console.log("DATA: " + data);
	destroy();
	cardGame = new CardGame(type);
	ready.model = true;
	if(!!ready.data && !!ready.model) {
		cardGame.init(jsonData);
	}
	start();
}

function mainReady(data) {
	console.log("CARDGAME interface mainReady()");
	ready.main = true;
	start();
}

function start(data) {
	console.log("-----------------------------------------> START <-------------------------------------");
	if(!!ready.data && !!ready.model && !!ready.main) {
		console.log("SATISFACTORY CONDITIONS FOR STARTING");
		// DO NOT call init() here. It will recursively Init > Ready > Start > Init > etc.
		cardGame.start();
	}
}

function getGameType(data) {
	if(!!data) {
		type = data.msg;
	} else {
		postmsg("getGameType", "game");
	}
}

function destroy(data) {
	cardGame = null;
}

function kill(data) {
	self.close();
}

function postmsg(fn, msg) {
	data.fn = fn;
	data.msg = msg;
	self.postMessage(data);
}

function createQuestion(data) {
	
}

function getQuestions(range) {
	
}

function setJsonData(json) {
	jsonData = JSON.parse(json);
	ready.data = true;
	init();
}

function err_handler(e) {
	data.fn = "error";
	data.msg = "Error @: ", e.lineno, "\n\t File: ", e.filename, "\n\t Message:", e.message;
	postMessage(data);
}

function ajax(src, callback) {
	var ax = new XMLHttpRequest();
	var random = !!cache? "": Math.random() * 1000;
	ax.addEventListener("readystatechange", ajax_handler, false);
	ax.open("GET", src + "?" + random, true);
	ax.send();
	
	function ajax_handler(e) {
		if(ax.readyState === 4) {
			console.log("AJAX call complete");
			if(ax.status === 200) {
				console.log("AJAX status: SUCCESS");
				callback(ax.responseText);
				data.status = true;
			} else {
				console.log("AJAX status: FAIL");
				data.status = false;
				callback(ax.responseText);
			}
		}
	}
}

function err_handler(e) {
	postMessage("Error @: ", e.lineno, "\n\t File: ", e.filename, "\n\t Message:", e.message);
}
