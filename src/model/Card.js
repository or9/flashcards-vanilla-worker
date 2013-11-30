addEventListener("message", msg_handler, false);
addEventListener("error", err_handler, false);

var workerData = {
	id: location["search"].slice(1)
};
var timer = 0;

function msg_handler(e) {
	// workerData.fn = "test";
	// workerData.msg = e.data.msg;
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
		// var card = "<div class=\"card\" id=\"card_" + p + "\" \>" + 
		var card = "<div class=\"card\" id=\"card_" + workerData.id + "\" data-position=\"" + p + "\" \>" + 
			"<h2>" + msg.character + "</h2>" +
			contextualForms(msg["contextualForms"]) +
			tags(msg["tags"]) +
			"</div>";
	}


	function contextualForms(obj) {
		// use &#x....; to use unicode in HTML markup
		var _forms = "<ul class=\"forms\">";
		for(var key in obj) {
			if(obj[key] !== "") {
				_forms += "<li>" + "&#x" + obj[key] + ";</li>";
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

function shutdown() {
	close();
}

function status() {
	postMessage(workerData);
}

function getLocation(part) {
	return !!part? location[part].toString(): location.toString();
}