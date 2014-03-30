//addEventListener("message", msg_handler, false);
addEventListener("error", abworker.err_handler, false);
Card.prototype.getPosition = function() {
	return position;
};

function Card(cardPropsObj) {
	console.log("CARD MODEL instantiating card");
	console.log("cards object: " + cardPropsObj);
	var position = cardPropsObj.position;
	var character = cardPropsObj.character;
	var name = cardPropsObj.name;
	var forms = contextualForms(cardPropsObj.forms);
	var tags = cardPropsObj.tags;
	var sound = cardPropsObj.sound || false;
	var index = position - 1;


	var cardHTML = "\n" + "<div class=\"card\" id=\"card_" + index + 
				"\" data-position=\"" + position + 
				"\" data-sound=\"" + "soundFile.mp4" + 
				"\" \>" +
				"<h2>" + character + "</h2>" +
				"<h2>" + name + "</h2>" +
				htmlForms(forms) +
				htmlTags(tags) +
				"</div>" + "\n";

	
	// send each card to main
	postmsg("createCard", cardHTML, "");


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
		console.log("arr: " + arr);
		var i = 0;
		var len = arr.length;
		var _tags = "<ul class=\"tags\">";
		for(i; i < len; i++) {
			_tags += "<li>" + arr[i] + "</li>";
		}
		return _tags + "</ul>";
	}
	

	function contextualForms(formsObj) {
		var _forms = "";
		for(var key in formsObj) {
			_forms += formsObj[key] + "\n";
		}
		return _forms;
	}

	this.getPosition = function() {
		return position;
	};

	this.getCharacter = function() {
		return character;
	};

	this.getName = function() {
		return name;
	};

	this.getForms = function() {
		return forms;
	};

	this.getSound = function() {
		return sound;
	};

}

