var com.sudo.cards = com.sudo.cards || {};

(function() {
	(function($) {
		$.ajax({
			url: "./controller/characters.json",
			type: "GET",
			dataType: "json"
		}).done(function(data, textStatus, jqXHR) {
			//  Create cards
			console.log("fn > fn $.ajax, this: ", this);
			create(data);
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.error("ajax failed; jqXHR, textStatus, errorThrown: \n",
				"\n\t", jqXHR, "\n\t", textStatus, "\n\t", errorThrown);
		}).always(function(dataOrXHR, textStatus, XHRorError) {
			//  Always do something…

		});
	})(jQuery);

	this.CardHandler = function() {
		// this.prototype = new WorkerHandler(); // can we do this?

		this.createCard = function() {
			// console.log("createCard handler received: ", data.id);
			var ctable = document.getElementById("cardTable");
			ctable.innerHTML += data.msg;
			var cards = document.getElementsByClassName("card");
			var len = cards.length;
			if(len === cardWorkers.length) {
				setupCardClickHandlers(cards, len);
			}
		};
	};

	this.CardHandler.prototype = new WorkerHandler();

	this.workers = [];
	this.data = {
		fn: "importScript",
		msg: ""
	};
	this.handler = new CardHandler();
	this.cardID = 0;

	function create(data) {
		this.data.fn = "createCard";

		for(var key in data) {
			this.data.msg = data[key];
			var worker = spawnWorker();
			worker.postMessage(this.data);
			this.workers.push(worker);
		}
	}

	function msg_handler(event) {
		if(!!event.data && !!event.data.fn) {
			(function() {
				this[event.data.fn](event.data);
			}).apply(this.handler);
		}
	}

	function setupClickHandlers(cards, len) {
		var i = 0;
		for(i; i < len; i++) {
			this.cards[i].addEventListener("click", click_handler, false);
		}
	}

	function click_handler(event) {
		var rex = /card/g;
		var element = jQuery(e.target).parents(".card")[0] || e.target;
		console.log(element);
	}

	function spawnWorker() {
		var card = new Worker("./model/Card.js" + "?" + this.cardID);
		this.cardID = parseInt(this.cardID) + 1;
		card.addEventListener("message", msg_handler, false);
		return card;
	}

}).apply(com.sudo.cards);