"use strict";
importScripts("../model/AbstractWorker.js");
var abworker = new AbstractWorker();
importScripts("../model/Card.js");
addEventListener("message", msg_handler, false);
addEventListener("error", abworker.err_handler, false);

var data = {
	fn: "",
	msg: "",
	args: {},
	cache: false
};
var ready = {
	data: false,
	model: false,
	main: false
};
var cache = false;
var cards = [];
var json = {};
//console.log("====================CARD WORKER CALLING ABWORKER.XHR.CALL===========================");
//abworker.xhr.call(abworker, "../controller/characters.json", create);
abworker.xhr("../controller/characters.json", create);

function msg_handler(e) {
	abworker.postmsg("receipt", e.data.fn, e.data.msg, e.data.args);
	//console.log("e.data.fn: " + e.data.fn + self[e.data.fn]);
	self[e.data.fn](e.data);
}

function init(data) {
	//console.log("CARD WORKER init called with " + data.msg);
	//console.log(this, data);
	//json = abworker.xhr.call(abworker, "../controller/characters.json", create);
	//abworker.xhr("../controller/characters.json", create);
}

function create(xhr) {
	json = JSON.parse(xhr.responseText);
//	console.log("jsonData: " + json);
	postmsg("init", "cards");
	var i = 0;
	var len = cards.length;
	var card = {}; 

	ready.data = true;

	for(var key in json) {
//		console.log("running for each card " + key);
		card = new Card(json[key]);
		cards.push(card);

	}


	ready.model = true;
	postmsg("setupClickHandlers", "", "");
	postmsg("setReadyState", "cards");
	//return xhr.responseText;
}

function mainReady(data) {
	ready.main = data.args;
}

function postmsg(fn, msg, args) {
	abworker.postmsg(fn, msg, args);
} 

function getCards(data) {
	abworker.postmsg(data.fn, cards);
}

function getJSON(data) {
	postmsg(data.fn, json);
}
