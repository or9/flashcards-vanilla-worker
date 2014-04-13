// handler for receiving messages, based on WorkerHandler model

card.addEventListener("message", msg_handler_card, false);

postmsg.call(card, "init", language);

CardHandler.prototype = new WorkerHandler();

CardHandler.prototype.init = function(data) {
	//WorkerHandler.prototype.init = function(data) {
	console.log("MAIN CardHandler init called with data: ", data, data.msg, /cards/gi.test(data.msg));
	// Set column to either #cardTable or #choiceColumn depending on whether data.msg tests true for "cards"
	// Legend is the column's legend element
	// heading is the doocument's main header
	console.log("log elements: ", document.getElementById("cardTable"), document.getElementById("choiceColumn"), document.getElementById("gameTypeHeading"));
	//var col = /cards/gi.test(data.msg)? document.getELementById("cardTable"): document.getElementById("choiceColumn");
	
	var col = document.getElementById("cardTable");
	var legend = col.getElementsByTagName("legend")[0];
	var heading = document.getElementById("gameTypeHeading");
	// Move legend and heading out of column into body
	// Reinsert heading before all child nodes of column;
	// followed by reinserting legend before heading
	moveElement(legend);
	moveElement(heading);
	col.insertBefore(heading, col.childNodes[0]);
	col.insertBefore(legend, heading);
};

CardHandler.prototype.createCard = function(data) {
	console.log("createCard called… : ", data.msg);
	var table = document.getElementById("cardTable");
	var card = data.msg;
	table.innerHTML += card;
		
};

CardHandler.prototype.createQuestion = function(data) {
		
};

CardHandler.prototype.setupClickHandlers = function(data) {
	var cards = document.querySelectorAll(".card"),
			len = cards.length,
			i = 0;
	for(i; i < len; i++) {
		console.log("setting click handler for: ", cards[i]);
		cards[i].addEventListener("click", clickHandlerCard, false);
	}
};

GameHandler.prototype.init = function(data) {
	console.log("MAIN GameHandler init called with data: ", data, data.msg);
	
};

/*CardHandler.prototype.setupClickHandlers = function(data) {
	console.log("MAIN CardHandler setupClickHandlers called");
};*/
