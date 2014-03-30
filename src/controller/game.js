"use strict";
console.group("Controller - game");
importScripts("../model/AbstractWorker.js");
var abworker = new AbstractWorker();
importScripts(
		"../model/GameType.js", 
		"../model/Game.js");
addEventListener("message", msg_handler, false);
//addEventListener("error", err_handler, false);

var data = {
	fn: "",
	msg: "",
	args: {}
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

abworker.xhr.call(abworker, "../controller/characters.json", setJsonData);

function msg_handler(e) {
	//data.fn = e.data.fn;
	abworker.postmsg("receipt", e.data.fn, e.data.msg);
	console.log("GAME WORKER CONTROLLER msg_handler called");
	//if(!!e.data && !!e.data.fn) {
		if(e.data.fn === "game") {
			//console.log("GAME WORKER CARDGAME received: " + e.data.fn + " " + e.data.msg);
			//e.data.fn.call(cardGame, e.data);
			console.log("game worker calling: " + cardGame[e.data.fn]);
			cardGame[e.data.fn](e.data);
		} else {
			//console.log("GAME WORKER INTERFACE received: " + e.data.fn + " " + e.data.msg);
			//e.data.fn.call(this, e.data);
			console.log("game worker calling: " + self[e.data.fn]);
			self[e.data.fn](e.data);
		}
	//}
}

function init(data) {
	console.log("DATA: " + data);
	destroy();
	cardGame = new CardGame(type);
	ready.model = true;
	console.log("\tCARDGAME: init called. MODEL.READY is true");
	if(ready.data && ready.model) {
		console.log("\tCARDGAME: DATA.READY && MODEL.READY");
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
	console.log("on game start, who's ready? data? " + ready.data + " model? " + ready.model + " main? " + ready.main);
	console.log("-----------------------------------------> START <-------------------------------------");
	if(!!ready.data && !!ready.model && !!ready.main) {
		console.log("SATISFACTORY CONDITIONS FOR STARTING");
		// DO NOT call init() here. It will recursively Init > Ready > Start > Init > etc.
		cardGame.start();
	}
}

function getGameType(data) {
	if(!!data) {
		// Set
		console.log("\tdata is available. setting type to data.msg: " + data.msg); 
		type = data.msg;
	} else {
		// Get
		console.log("\tdata not available. posting message to getGameType from game");
		abworker.postmsg("getGameType", "game");
	}
}

function destroy(data) {
	cardGame = null;
}

function kill(data) {
	self.close();
}
/*
function postmsg(fn, msg, args) {
	data.fn = fn;
	data.msg = msg;
	data.args = args;
	self.postMessage(data);
}*/
function postmsg(fn, msg, args) {
	abworker.postmsg(fn, msg, args);
}

function createQuestion(data) {
	
}

function getQuestions(range) {
	
}

function setJsonData(xhr) {
	jsonData = JSON.parse(xhr.responseText);
	ready.data = true;
	init();
}

console.groupEnd();
/*
function ajax(src, callback) {
	var ax = new XMLHttpRequest();
	var random = !!cache? "": "?" + Math.random() * 1000;
	ax.addEventListener("readystatechange", ajax_handler, false);
	ax.open("GET", src + random, true);
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
}*/
