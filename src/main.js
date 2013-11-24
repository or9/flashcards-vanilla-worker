//var worker = new Worker("./model/Worker.js");
//worker.postMessage();
//worker.addEventListener("message", msg_handler, false);
(function() {
	var imp = {
			list1: ["AbstractMsg.js", "Card.js", "Game.js", "Storage.js"],
			list2: ["storage.js", "card.js", "game.js"],
	};
	
	var data = {
			fn: "importScript",
			msg: ""
	};
	
	function IDWorker(idNumber, src) {
		var id = idNumber;
		this.getID = function() {
			return id;
		};
	}
	
	IDWorker.prototype = Worker.prototype;
	
	function WorkerHandler() {
		this.getLocation = function(data) {
			console.log("handler received", data);
		};
		
		this.importScript = function(data) {
			console.log("handler received", data);
		};
		
		this.ajax = function(data) {
			console.log("handler received", data);
		};
		
		this.timeout = function(data) {
			console.log("handler received", data);
		};
		
		this.interval = function(data) {
			console.log("handler received", data);
		};
	}
	
	var worker_handler = new WorkerHandler();
	
	for(var prop in imp) {
		importLoop(imp[prop]);
	}
	
	function importLoop(list) {
		var len = list.length;
		var i = 0;
		for(i; i < len; i++) {
			data.id = i;
			data.msg = list[i];
			spawnWorker();
		}
	}
	
	
	
	function spawnWorker() {
		var worker = new Worker("./model/Worker.js");
		worker.postMessage(data);
		worker.addEventListener("message", msg_handler, false);
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
	
	//data.type = "fn";
	//data.fn = "importScript";
	//data.msg = "script1, script2, script3";
	//worker.postMessage(data);
	//
	//data.fn = "passThrough";
	//worker.postMessage(data);
	//
	//data.fn = "getLocation";
	//worker.postMessage(data);
	//
	//data.fn = "ajax";
	//worker.postMessage(data);
	//
	//data.fn = "timeout";
	//worker.postMessage(data);
	//
	//data.fn = "interval";
	//worker.postMessage(data);
	//
	//data.type = "";
})();