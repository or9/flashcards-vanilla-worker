addEventListener("message", msg_handler, false);
addEventListener("error", err_handler, false);

var workerData = {
	id: location["search"].slice(1)
};
var position = 0,
	character = "",
	name = "",
	forms = {},
	cardTags = [],
	sound = false;

function msg_handler(e) {
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

function createCard(jsonData) {
	var msg = jsonData["msg"];
	for(var key in msg) {
		position = msg.position;
		character = msg.character;
		name = msg.name;
		forms = contextualForms(msg.contextualForms);
		cardTags = tags(msg["tags"]);
		sound = msg.sound || false;
		
		var p = msg.position;
		var card = "\n" + "<div class=\"card\" id=\"card_" + workerData.id + "\" data-position=\"" + p + "\" data-sound=\"" + "soundFile.mp4" + "\" \>" + 
			"<h2>" + msg.character + "</h2>" +
			"<h2>" + msg.name + "</h2>" +
			htmlForms(msg["contextualForms"]) +
			htmlTags(msg["tags"]) +
			"</div>" + "\n";
	}

	function contextualForms(obj) {
		var _forms = "";
		for(var key in obj) {
			_forms += obj[key] + "\n";
		}
		return _forms;
	}
	
	function htmlForms(obj) {
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
		var _tags = "";
		for(i; i < len; i++) {
			_tags += arr[i] + " ";
		}
		return _tags;
	}

	function htmlTags(arr) {
		var i = 0;
		var len = arr.length;
		var _tags = "<ul class=\"tags\">";
		for(i; i < len; i++) {
			_tags += "<li>" + arr[i] + "</li>";
		}
		return _tags + "</ul>";
	}
	
	workerData.msg = card;
	// set / post each card back to main thread
	postMessage(workerData);
}

function postmsg(fn, msg) {
	data.fn = fn;
	data.msg = msg;
	postMessage(data);
}

function getLocation(part) {
	return !!part? location[part].toString(): location.toString();
}