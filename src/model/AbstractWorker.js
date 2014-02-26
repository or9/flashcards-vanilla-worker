"use strict";
addEventListener("message", msg_handler, false);
addEventListener("error", err_handler, false);

var workerData = {
	id: location["search"].slice(1)
};

var timer = 0;

function msg_handler(e) {
	console.log("ABSTRACT WORKER msg_handler: " + e.data.fn + " \t" + e.data.msg);
	postMessage("test", workerData);
	workerData.fn = e.data.fn;
	console.log("AbstractWorker received msg: " + workerData);	
	if(!!e.data && !!e.data.fn) {
		(function() {
			this[e.data.fn](e.data);
		})();	
	}
}

function init(data) {
	this.init(data);
}

function err_handler(e) {
	postMessage("Error @: ", e.lineno, "\n\t File: ", e.filename, "\n\t Message:", e.message);
}

function importScript(data) {
	importScripts(data.msg);
	workerData.msg = data.msg;
	workerData.status = true;
//	delete workerData[fn];
	postMessage(workerData);
}

function ajax(data, callback) {
	var ax = new XMLHttpRequest();
	var random = !!data.cache? "": "?" +  Math.random() * 1000;
	console.log("AbstractWorker ajax request for: " + data.msg + random);
	ax.addEventListener("readyStateChange", ajax_handler, false);
	ax.open("GET", data.msg + random, true);
	ax.send();
	
	function ajax_handler(e) {
		if(ax.readyState === 4) {
			callback(e, ax.status);
		}
	}
}

function toggleReadyState(data) {
	postMessage(data);
}

function init(data) {
	console.log("Abstract worker received init signal");
}

function callback(event, status) {
	if(status === 200) {
		// Handle successful response
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
		timer = setInterval(intervalCallback, int);
	else
		clearInterval(timer);
	
	function intervalCallback() {
		workerData.msg = "tick";
		workerData.status = true;
		workerData.fn = "tick";
		postMessage(workerData);
	}
}

function shutdown() {
	close();
}

function postmsg(fn, msg) {
 data.fn = fn;
 data.msg = msg;
 postMessage(data);
}

function status() {
	postMessage(workerData);
}

function getLocation(part) {
	return !!part? location[part].toString(): location.toString();
}
