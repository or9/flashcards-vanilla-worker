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

var a = 0;

function testA(b) {
	a += b
	postMessage("testA(b) from within worker… " + a);
	// Should not increment…
	// Because test is being called from seperate worker instances
	// Each instance's var a should be isolated from change
}

addEventListener("message", msg_handler, false);
addEventListener("error", err_handler, false);

var workerData = {
		id: location["search"].slice(1)
};
var timer = 0;

postMessage(workerData);

function msg_handler(e) {
	workerData.msg = workerData.id + " ready for work";
	postMessage(workerData);
	workerData.fn = e.data.fn;
	
	if(!!e.data && !!e.data.fn) {
		(function() {
			this[e.data.fn](e.data);
		})();	
	}
}

function err_handler(e) {
	postMessage("Error @: ", e.lineno, "\n\t File: ", e.filename, "\n\t Message:", e.message);
}

function callback(data) {
	var cb = false;
	if(!!data.callback || data.callback === "")
		cb = true;
		return cb;
}

function importScript(data) {
	importScripts(data.msg);
	workerData.msg = data.msg;
	workerData.status = true;
//	delete workerData[fn];
	postMessage(workerData);
}

function passThrough(data) {
	
}

function ajax(data) {
	var ax = new XMLHttpRequest();
	var random = !!data.cache? "": Math.random();
	ax.addEventListener("readyStateChange", ajax_handler, false);
	ax.open("GET", data.msg + "?" + random, true);
	ax.send();
	
	function ajax_handler(e) {
		if(ax.readyState === 4) {
			if(ax.status === 200) {
				workerData.msg = ax.responseText;
				workerData.status = true;
				postMessage(workerData);
			} else {
				workerData.status = false;
				postMessage(workerData);
				
			}
		}
	}
}

function timeout(data) {
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
	
}

function shutdown() {
	close();
}

function status() {
	
}

function SubWorker(src, msg, callback) {
//	Cannot create SubWorker from within Worker; 
//	Webkit bug
	var subworkerData = {
			"id": location["search"].slice(1),
			"msg": msg,
			"callback": callback
	};
	
	var worker = new Worker(src);
	worker.postMessage(subworkerData);
}

function getLocation(part) {
	return !!part? location[part].toString(): location.toString();
}

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