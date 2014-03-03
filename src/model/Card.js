//addEventListener("message", msg_handler, false);
addEventListener("error", abworker.err_handler, false);
Card.prototype.id = 0;
Card.prototype.character = "";
Card.prototype.name = "";
Card.prototype.forms = {};
Card.prototype.tags = [];
Card.prototype.sound = false;
Card.prototype.init = function(card, we) {
	function createCard(card, we) {
		//  var msg = jsonData["msg"];
		//for(var key in card) {
		//  console.log(key);
		var position = this.position,
				character = this.character,
				name = this.name,
				forms = contextualForms(this.contextualForms),
				cardTags = tags(card["tags"]),
				sound = this.sound || false;

		console.log("properties of card: \n\t" + position + "\n\t" + character + "\n\t" + name + "\n\t" +     forms + "\n\t" + cardTags +
				"\n\t" + sound + "\n\t" + card + "\n\t" + we);

		var card = "\n" + "<div class=\"card\" id=\"card_" + we + "\" data-position=\"" + position + "\" d    ata-sound=\"" + "soundFile.mp4" + "\" \    >" +
			"<h2>" + character + "</h2>" +
			"<h2>" + name + "</h2>" +
			htmlForms(this["contextualForms"]) +
			htmlTags(this["tags"]) +
			"</div>" + "\n";

		console.log("card created: " + card);
		// set / post each card back to main thread
		postmsg("createCard", card, "");
		//postmsg("init", card, ""); // new… no shortcuts, I guess
		//}

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


	}
};

function Card() {
	console.log("CARD MODEL instantiating card");
}

/*
var = data {
	id: location["search"].slice(1)
};

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
