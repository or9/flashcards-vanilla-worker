var console = console || {log: function() {alert("console unavailable")}};

(function($) {
	$.ajax({
		url: "./controller/characters.json",
		type: "GET",
		dataType: "json"
	}).done(function(data, textStatus, jqXHR) {
		console.log("ajax done; data, textStatus, jqXHR: \n",
			"\n\t", data, "\n\t", textStatus, "\n\t", jqXHR);

		createGame(data);

	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log("ajax failed; jqXHR, textStatus, errorThrown: \n",
			"\n\t", jqXHR, "\n\t", textStatus, "\n\t", errorThrown);

	}).always(function(dataOrXHR, textStatus, XHRorError) {
		// console.log("ajax always; dataOrXHR, textStatus, XHRorError: \n",
		// 	"\n\t", dataOrXHR, "\n\t", textStatus, "\n\t", XHRorError);

	});

	var workers = [];
	var workerScripts = {
			list1: ["AbstractMsg.js", "Card.js", "Game.js", "Storage.js"],
			list2: ["storage.js", "card.js", "game.js"],
	};
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
		console.log("creating game from data. \n", data);
		workerData.fn = "createCard";
		for(var key in data) {
			// console.log(workerID, data[key]);
			workerData.msg = data[key];
			var worker = spawnWorker();
			worker.postMessage(workerData);
			workers.push(worker);
			// following stuff is what card workers should be doing per card
			// loop over data, extract, parse, etc; send back

			// var p = data[key].position;
			// $("#cardTable").append("<div class=\"card\" id=\"" + key + "\"></div>");
			// $(".card").eq(p - 1).append("<dl></dl>");
			// for(var subkey in data[key]) {
			// 	console.log(subkey);
			// 	$(".card").eq(p - 1).children("dl").append($("<dt />").html(subkey));
			// 	$(".card").eq(p - 1).children("dl").append($("<dd />").html(data[key][subkey]));	
			// }


		}
	}
	
	function WorkerHandler() {
		this.test = function(data) {
			console.log("test > data: ", data);
			console.log(data.msg);
		};

		this.getLocation = function(data) {
			console.log("getLocation handler received: ", data);
			
		};
		
		this.importScript = function(data) {
			console.log("import handler received: ", data);
			
		};
		
		this.ajax = function(data) {
			console.log("ajax handler received: ", data);
			
		};
		
		this.timeout = function(data) {
			console.log("timeout handler received: ", data);
			
		};
		
		this.interval = function(data) {
			console.log("interval handler received: ", data);
			
		};

		this.createCard = function(data) {
			// console.log("createCard handler received: ", data);
			console.log("createCard msg: ", data.msg);
			var ctable = document.getElementById("cardTable");
			ctable.innerHTML += data.msg;
		};
		this.stop = function(data) {
			console.log("stop handler received: ", data);
		};
	}
	
	// for(var prop in workerScripts) {
	// 	var dir = prop === workerScripts.list1? "../model/": "../controller/";
	// 	importLoop(workerScripts[prop], dir);
	// }
	
	// workerData.fn = "ajax";
	// importLoop(workerAjax.list1, "");

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
		console.log("main thread: ", e, e.data);
		if(!!e.data && !!e.data.fn) {
			(function() {
				this[e.data.fn](e.data);
			}).apply(worker_handler);
		}
	}

})(jQuery);