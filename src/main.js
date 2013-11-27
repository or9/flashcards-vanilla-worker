var console = console || new Console();

var a = 0;
function testA(b) {
	alert("a: ", a);
	return a += b;
}

(function() {
	var imp = {
			list1: ["AbstractMsg.js", "Card.js", "Game.js", "Storage.js"],
			list2: ["storage.js", "card.js", "game.js"],
	};
	var ajax = {
		list1: ["../model/Schema.json","../controller/characters.json"]
	};
	var data = {
			fn: "importScript",
			msg: ""
	};
	var worker_handler = new WorkerHandler();
	var workerID = 0;
	
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
	
	for(var prop in imp) {
		var dir = prop === imp.list1? "../model/": "../controller/";
		importLoop(imp[prop], dir);
	}
	
	data.fn = "ajax";
	importLoop(ajax.list1, "");

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

})();