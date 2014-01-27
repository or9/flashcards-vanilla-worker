com.sudo.cards = com.sudo.cards || {};
// according to design pattern, this should be a worker…

(function() {
	var main = com.sudo.getMainInterface();
	
	(function($) {
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
		com.sudo.getMainInterface().postMessage(initCards);
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
				//data.fn = "toggleReadyState";
				//data.fn = "setReadyState";
				//data.msg = "cards";
				//main.postMessage(data);
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

// var timer = 0;
// var interval = 500;
// timer = setTimeout(log, interval);
// function log() {
// 	console.log(com.sudo.cards.getCard());
// 	console.log(com.sudo.cards.getCard(1));
// }
