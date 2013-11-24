/*
 * Methods:
 * 	import (scripts): > String(s)
 *  passThrough (msg): > destination String
 *  getLocation: return Worker URL
 *  ajax (perform AJAX): TODO
 *  timeout (setTimeout): milliseconds, callback (via msg)
 *  interval (setInterval): milliseconds, callback (via msg)
 *  spawn: TODO
 *  shutdown: TODO
 *  status: TODO
 *  
 */
self.addEventListener("message", msg_handler, false);
self.addEventListener("error", err_handler, false);

var workerData = {};
var timer = 0;

function msg_handler(e) {
	console.log("worker received message", e, e.data);
	self.postMessage("ready for work");
	
	workerData.fn = e.data.fn;
	
	if(!!e.data && !!e.data.fn) {
		(function() {
			this[e.data.fn](e.data);
		})();
		
	}
	
}

function err_handler(e) {
	self.postMessage("Error @: ", e.lineno, "\n\t File: ", e.filename, "\n\t Message:", e.message);
}

function callback(data) {
	var cb = false;
	if(!!data.callback || data.callback === "")
		cb = true;
		return cb;
}

function importScript(data) {
	console.log("importScript…");
	importScripts(data.msg);
	workerData.msg = data.msg;
	workerData.status = true;
//	delete workerData[fn];
	postMessage(workerData);
}

function passThrough(data) {
	console.log("passThrough…");
	
}

function getLocation(data) {
	console.log("getLocation…", self.location, "…");
	postMessage(self.location);
}

function ajax(data) {
	console.log("ajax… from", self.location);
	var ajax = new XMLHTTPRequest();
	var random = !!data.cache? "": Math.random();
	ajax.addEventListener("readyStateChange", ajax_handler, false);
	ajax.open("GET", data.msg + random, true);
	ajax.send();
	
	function ajax_handler(e) {
		if(ajax.readyState === 4) {
			if(ajax.status === 200) {
				workerData.msg = ajax.responseText;
				workerData.status = true;
				postMessage(workerData);
			} else {
				console.error("worker ajax failed");
			}
		}
	}
}

function timeout(data) {
	console.log("setTimeout…");
	var int = parseInt(data.msg);
	
	if(data.timer === "set")
		timer = setTimeout(timeoutCallback, int);
	else
		clearTimeout(timer);
	
	function timeoutCallback() {
		workerData.msg = "timer end";
		workerData.status = true;
		postMessage(workerData);
	}
}

function interval(data) {
	console.log("setInterval…");
	var int = parseInt(data.msg);
	
	if(data.timer === "set")
		timer = setInterval(tick, int);
	else
		clearInterval(timer);
	
	function intervalCallback() {
		workerData.msg = "tick";
		workerData.status = true;
		workerData.fn = "tick";
		postMessage(workerData);
	}
}

function spawn() {
	console.log("spawn… not permitted…");
}

function shutdown() {
	console.log("shutdown…");
	self.close();
}

function status() {
	console.log("status…");
	
}

function SubWorker(src, msg, callback) {
//	console.log(new Worker());
//	var worker = new Worker(src);
//	console.log(worker);
//	worker.postMessage(msg, callback);
}


this.postMessage("worker loaded");

/*
 * Can use:
 * 		navigator object
 *		location object (read-only)
 *		importScripts() method (for accessing script files in the same domain)
 *		JavaScript objects such as Object, Array, Date, Math, String
 *		XMLHttpRequest
 *		setTimeout() and setInterval() methods
 *	Can't use:
 *		The DOM
 *		The worker's parent page (except via postMessage()) 
 * 
 * worker.postMessage(arrayBuffer, [arrayBuffer]);
 * window.postMessage(arrayBuffer, targetOrigin, [arrayBuffer]);
 * 
 */