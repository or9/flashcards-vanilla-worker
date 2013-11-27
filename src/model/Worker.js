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

addEventListener("message", msg_handler, false);
addEventListener("error", err_handler, false);

var workerData = {
		id: location["search"].slice(1)
};
var timer = 0;

function msg_handler(e) {
	workerData.fn = "test";
	workerData.msg = e.data.msg;
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

function createCard(data) {
	var msg = data["msg"];
	for(var key in msg) {
		var p = msg.position;
		var dl = "<dl>" + content("dt") + "</dl>";
		var card = "<div class=\"card\" id=\"card_" + p + "\" \>" + 
			"<h2>" + msg.character + "</h2>" +
			//dl +
			contextualForms(msg["contextualForms"]) +
			tags(msg["tags"]) +
			"</div>";

		function content(e) {
			var _content = "<" + e + ">";
			var _end = "</" + e + ">";
			var _inner = e === "dt"? key: msg[key];
			var _warriors = _content + _inner + _end;
			return _warriors;
		}
	}


	function contextualForms(obj) {
		var _forms = "<ul class=\"forms\">";
		for(var key in obj) {
			if(obj[key] !== "") {
				_forms += "<li>" + obj[key] + "</li>";
			}
		}
		return _forms + "</ul>";
	}

	function tags(arr) {
		var i = 0;
		var len = arr.length;
		var _tags = "<ul class=\"tags\">";
		for(i; i < len; i++) {
			_tags += "<li>" + arr[i] + "</li>";
		}
		return _tags + "</ul>";
	}

	workerData.msg = card;
	postMessage(workerData);
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