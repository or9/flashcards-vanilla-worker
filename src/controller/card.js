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
console.log("====================CARD WORKER CALLING ABWORKER.XHR.CALL===========================");
//abworker.xhr.call(abworker, "../controller/characters.json", create);
abworker.xhr("../controller/characters.json", create);

function msg_handler(e) {
	abworker.postmsg("receipt", e.data.fn, e.data.msg, e.data.args);
	console.log("e.data.fn: " + e.data.fn + self[e.data.fn]);
	self[e.data.fn](e.data);
}

function init(data) {
	console.log("CARD WORKER init called with " + data.msg);
	console.log(this, data);
	//json = abworker.xhr.call(abworker, "../controller/characters.json", create);
}

function create(xhr) {
	var jsonData = JSON.parse(xhr.responseText);
	//var initCards = {"fn":"init","msg":"cards"};
	postmsg("init", "cards");
	var i = 0;
	var len = cards.length;
	var card = new Card();

	ready.data = true;
	//console.log("CARDWORKER: cards: create: jsonData: ", xhr.responseText);	

	for(var key in jsonData) {
		console.log("running for each card " + key);
		card[key] = jsonData[key];
		cards.push(card);
		card.init();
		len += 1;
	}
	ready.model = true;
	
	for(i; i < len; i++) {
		console.log("i:len" + i + ":" + len);
		console.log("cards[i]: " + cards[i] + " " + cards[i].position + " " + cards[i].character + " " + cards[i].contextualForms +
				"cards.length - 1" + cards[len - 1]);
		createCard(cards[i], i);
	}
	


	postmsg("setupClickHandlers", "", "");
	postmsg("setReadyState", "cards");
	//return xhr.responseText;
	json = jsonData; 
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

function createCard(card, we) {
	//  var msg = jsonData["msg"];
	//for(var key in card) {
	//	console.log(key);
	var	position = card.position,
		character = card.character,
		name = card.name,
		forms = contextualForms(card.contextualForms),
		cardTags = tags(card["tags"]),
		sound = card.sound || false;

	console.log("properties of card: \n\t" + position + "\n\t" + character + "\n\t" + name + "\n\t" + forms + "\n\t" + cardTags +
			"\n\t" + sound + "\n\t" + card + "\n\t" + we);

	var card = "\n" + "<div class=\"card\" id=\"card_" + we + "\" data-position=\"" + position + "\" data-sound=\"" + "soundFile.mp4" + "\" \    >" + 
		"<h2>" + character + "</h2>" +
	"<h2>" + name + "</h2>" +
		htmlForms(card["contextualForms"]) +
		htmlTags(card["tags"]) +
		"</div>" + "\n";

	console.log("card created: " + card);
	// set / post each card back to main thread
	postmsg("createCard", card, "");
	//postmsg("init", card, ""); // new… no shortcuts, I guess
	//}

	function contextualForms(obj) {
		var _forms = "";
		for(var key in obj) {
			_forms += obj[key] + "\n";
		}
		return _forms;
	}

	function htmlForms(obj) {
		// use &#x....; to use unicode in HTML markup
		var _forms = "<ul class=\"forms\">";
		for(var key in obj) {
			if(obj[key] !== "") {
				_forms += "<li>" + "&#x" + obj[key] + ";</li>";
			}
		}
		return _forms + "</ul>";
	}

	function tags(arr) {
		var i = 0;
		var len = arr.length;
		var _tags = "";
		for(i; i < len; i++) {
			_tags += arr[i] + " ";
		}
		return _tags;
	}
	function htmlTags(arr) {
		var i = 0;
		var len = arr.length;
		var _tags = "<ul class=\"tags\">";
		for(i; i < len; i++) {
			_tags += "<li>" + arr[i] + "</li>";
		}
		return _tags + "</ul>";
	}


}

/*
function request(url) {
	var xhr = new XMLHttpRequest();
	var random = !!data.cache? "": "?" +  Math.random() * 100;
	xhr.open("GET", url + random, true);
	xhr.responseType = "text/json";
	xhr.send();
	xhr.onReadyStateChange = function(e) {
		if(xhr.readyState === 4) {
			return xhr.response;
		} else {
			throw error("Failed to load data");
		}
	};
}*/

//com.sudo.cards = com.sudo.cards || {};
// according to design pattern, this should be a worker…

/*
 * (function() {
	//var main = com.sudo.getMainInterface();
	
	function($) {
		$.ajax({
			url: "./controller/characters.json",
			type: "GET",
			dataType: "json"
		}).done(function(data, textStatus, jqXHR) {
			//  Create cards
			create(data);
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.error("ajax failed; jqXHR, textStatus, errorThrown: \n",
				"\n\t", jqXHR, "\n\t", textStatus, "\n\t", errorThrown);
		}).always(function(dataOrXHR, textStatus, XHRorError) {
			//  Always do something…

		});
	})(jQuery);

	var cards = []; // array of workers
	var data = {
		fn: "importScript",
		msg: ""
	};
	var cardHandler = new CardHandler();
	var cardID = 0;

	function create(jsonData) {
		var initCards = {"fn":"init","msg":"cards"};
		//com.sudo.getMainInterface().postMessage(initCards);
		console.log("cards: create: jsonData: ", jsonData);	
		// break up data and create each card from it
		data.fn = "createCard";

		for(var key in jsonData) {
			data.msg = jsonData[key];
			var worker = spawnWorker();
			worker.postMessage(data); // send data to card for parsing
			cards.push(worker);
		}
	}

	function msg_handler(event) {
		if(!!event.data && !!event.data.fn) {
			(function() {
				this[event.data.fn](event.data);
			}).apply(cardHandler);
		}
	}

	function setupClickHandlers(cards, len) {
		var i = 0;
		for(i; i < len; i++) {
			cards[i].addEventListener("click", click_handler, false);
		}
	}

	function click_handler(event) {
		var rex = /card/g;
		var element = jQuery(event.target).parents(".card")[0] || event.target;
		console.log(element);
	}

	function spawnWorker() {
		var card = new Worker("./model/Card.js" + "?" + cardID);
		cardID = parseInt(cardID) + 1;
		card.addEventListener("message", msg_handler, false);
		return card;
	}


	function CardHandler() {
		this.prototype = new WorkerHandler(); // can we do this?

		this.createCard = function(data) {
			// console.log("createCard handler received: ", data.id);
			var ctable = document.getElementById("cardTable");
			ctable.innerHTML += data.msg;
			var newcards = document.getElementsByClassName("card");
			var len = newcards.length;
			if(len === cards.length) {
				postmsg.call(main, "toggleReadyState", "cards");	
				setupClickHandlers(newcards, len);
			}
		};
	};

	this.getCard = function(index) {
		// return all card workers or @ index
		return !!index? cards[index]: cards;
	};

	function postmsg(fn, msg) {
		data.fn = fn; data.msg = msg;
		this.postMessage(data);
	}
	
}).apply(com.sudo.cards);
*/

