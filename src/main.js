var console = console || {log: function() {alert("console unavailable")}};

(function($) {
	$.getScript("./model/WorkerHandler.js");
	$.getScript("./controller/card.js"); 
	$.getScript("./controller/game.js");
	$.getScript("./controller/storage.js");
	
	function WorkerHandler() {
		this.test = function(data) {
			console.log("test > data: ", data);
			console.log(data.msg);

		};

		this.getLocation = function(data) {
			console.log("getLocation handler received: ", data.msg);
			
		};
		
		this.importScript = function(data) {
			console.log("import handler received: ", data.msg);
			
		};
		
		this.ajax = function(data) {
			console.log("ajax handler received: ", data.msg);
			
		};
		
		this.timeout = function(data) {
			console.log("timeout handler received: ", data);
			
		};
		
		this.interval = function(data) {
			console.log("interval handler received: ", data);
			
		};

		this.createCard = function(data) {
			// console.log("createCard handler received: ", data.id);
			var ctable = document.getElementById("cardTable");
			ctable.innerHTML += data.msg;
			var cards = document.getElementsByClassName("card");
			var len = cards.length;
			if(len === workers.length) {
				setupCardClickHandlers(cards, len);
			}
			// card.addEventListener("click", card_click_handler, false);
		};

		this.stop = function(data) {
			console.log("stop handler received: ", data);
		};
	}
	
	function msg_handler(e) {
		if(!!e.data && !!e.data.fn) {
			(function() {
				this[e.data.fn](e.data);
			}).apply(main_handler);
		}
	}
})(jQuery);