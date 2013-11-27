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

	var workerScripts = {
			list1: ["AbstractMsg.js", "Card.js", "Game.js", "Storage.js"],
			list2: ["storage.js", "card.js", "game.js"],
	};
	var workerAjax = {
		list1: ["../model/Schema.json","../controller/characters.json"]
	};
	var data = {
			fn: "importScript",
			msg: ""
	};
	var worker_handler = new WorkerHandler();
	var workerID = 0;

	function createGame(data) {
		console.log("creating game from data. \n", data);
		for(var key in data) {
			console.log(data[key]);
			console.log(data[key].position);
			var p = data[key].position;
			$("#cardTable").append("<div class=\"card\" id=\"" + key + "\"></div>");
			$(".card").eq(p - 1).append("<dl></dl>");
			for(var subkey in data[key]) {
				$(".card").eq(p - 1).children("dl").append($("<dt />").html(key));
				$(".card").eq(p - 1).children("dl").append($("<dd />").html(data[key]));	
			}


		}
	}
	
	function WorkerHandler() {
		this.getLocation = function(data) {
			console.log("getLocation handler received", data);
			
		};
		
		this.importScript = function(data) {
			console.log("import handler received", data);
			
		};
		
		this.ajax = function(data) {
			console.log("ajax handler received", data);
			
		};
		
		this.timeout = function(data) {
			console.log("timeout handler received", data);
			
		};
		
		this.interval = function(data) {
			console.log("interval handler received", data);
			
		};
	}
	
	for(var prop in workerScripts) {
		var dir = prop === workerScripts.list1? "../model/": "../controller/";
		importLoop(workerScripts[prop], dir);
	}
	
	data.fn = "ajax";
	importLoop(workerAjax.list1, "");

	function importLoop(list, dir) {
		var len = list.length;
		var i = 0;
		
		for(i; i < len; i++) {
			data.id = i;
			data.msg = dir + list[i];
			spawnWorker();
		}
	}
	
	function spawnWorker() {
		var worker = new Worker("./model/Worker.js" + "?" + workerID);
		workerID += 1;
		worker.addEventListener("message", msg_handler, false);
		worker.postMessage(data);
//		worker.terminate();
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