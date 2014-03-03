//addEventListener("message", msg_handler, false);
addEventListener("error", abworker.err_handler, false);
Card.prototype.id = 0;
Card.prototype.character = "";
Card.prototype.name = "";
Card.prototype.forms = {};
Card.prototype.tags = [];
Card.prototype.sound = false;
function Card() {}

var workerData = {
	id: location["search"].slice(1)
};
var position = 0,
	character = "",
	name = "",
	forms = {},
	cardTags = [],
	sound = false;
/*
function msg_handler(e) {
	postMessage(workerData);
	workerData.fn = e.data.fn;
	
	if(!!e.data && !!e.data.fn) {
		(function() {
			this[e.data.fn](e.data);
		})();	
	}
}

function postmsg(fn, msg, args) {
	data.fn = fn;
	data.msg = msg;
	data.args = args;
	postMessage(data);
}

function getLocation(part) {
	return !!part? location[part].toString(): location.toString();
}*/
