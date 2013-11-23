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

function msg_handler(e) {
	console.log("worker received message", e, e.data);
	self.postMessage("ready for work");
	
	if(!!e.data && !!e.data.fn) {
		(function() {
			this[e.data.fn]();
		})();
		
	}
	
}

function err_handler(e) {
	self.postMessage("Error @: ", e.lineno, "\n\t File: ", e.filename, "\n\t Message:", e.message);
}

function importScript() {
	console.log("importScript…");
	
}

function passThrough() {
	console.log("passThrough…");
	
}

function getLocation() {
	console.log("getLocation…");
	
}

function ajax() {
	console.log("ajax…");
	
}

function timeout() {
	console.log("setTimeout…");
	
}

function interval() {
	console.log("setInterval…");
}

function spawn() {
	console.log("spawn…");
}

function shutdown() {
	console.log("shutdown…");
	self.close();
}

function status() {
	console.log("status…");
	
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