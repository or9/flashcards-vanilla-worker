var console = console || {log: function() {alert("console unavailable")}};

(function($) {
	$.ajax({
		url: "./controller/characters.json",
		type: "GET",
		dataType: "json"
	}).done(function(data, textStatus, jqXHR) {
		// console.log("ajax done; data, textStatus, jqXHR: \n",
		// 	"\n\t", data, "\n\t", textStatus, "\n\t", jqXHR);

		createGame(data);

	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error("ajax failed; jqXHR, textStatus, errorThrown: \n",
			"\n\t", jqXHR, "\n\t", textStatus, "\n\t", errorThrown);

	}).always(function(dataOrXHR, textStatus, XHRorError) {
		// console.log("ajax always; dataOrXHR, textStatus, XHRorError: \n",
		// 	"\n\t", dataOrXHR, "\n\t", textStatus, "\n\t", XHRorError);

	});

	var workers = [];
	var workerAjax = {
		list1: ["../model/Schema.json","../controller/characters.json"]
	};
	var workerData = {
			fn: "importScript", // importScript, ajax, getLocation, timeout, interval, createCard, stop
			msg: ""
	};
	var worker_handler = new WorkerHandler();
	var workerID = 0;

	function createGame(data) {
		workerData.fn = "createCard";
		for(var key in data) {
			// console.log(workerID, data[key]);
			// console.log(key.length);
			workerData.msg = data[key];
			var worker = spawnWorker();
			worker.postMessage(workerData);
			workers.push(worker);
		}
	}
	
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

	function setupCardClickHandlers(cards, len) {
		var i = 0;
		for(i; i < len; i++) {
			cards[i].addEventListener("click", card_click_handler, false);
		}
	}

	function card_click_handler(e) {
		var rex = /card/g;
		var element = $(e.target).parents(".card")[0] || e.target;
		console.log(element);
	}

	function importLoop(list, dir) {
		var len = list.length;
		var i = 0;
		
		for(i; i < len; i++) {
			workerData.msg = dir + list[i];
			spawnWorker();
			worker.postMessage(workerData);
		}
	}
	
	function spawnWorker() {
		var worker = new Worker("./model/Worker.js" + "?" + workerID);
		workerID = parseInt(workerID) + 1;
		worker.addEventListener("message", msg_handler, false);
//		worker.terminate();
		return worker;
	}
	
	function msg_handler(e) {
		if(!!e.data && !!e.data.fn) {
			(function() {
				this[e.data.fn](e.data);
			}).apply(worker_handler);
		}
	}

	var obj = {};
	(function() {
		this.something = function() {

		};
	}).apply(obj);


})(jQuery);