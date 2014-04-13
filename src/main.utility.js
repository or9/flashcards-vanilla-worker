function msg_handler_main(e) {
	//console.log("%cMAIN msg_handler_MAIN called", "color: orange;", e);
	console.log("%cMAIN msg_handler_MAIN called", "color: orange;");
	msg_handler.call(mainHandler, e.data);
}

function msg_handler_game(e) {
	console.log("%cMAIN msg_handler_GAME called", "color: cyan;");
	msg_handler.call(gameHandler, e.data);
}

function msg_handler_card(e) {
	console.log("%cMAIN msg_handler_CARD called", "color: magenta;");
	msg_handler.call(cardHandler, e.data);
}

function msg_handler(dataFromWorker) {
	//console.log("%cmsg_handler: ", "color: blue;",  dataFromWorker, this, "\n\tfn: ", dataFromWorker.fn);
	console.log("%ccalling: ", "color: blue;", this);
	//console.log("%ccalling: ", "color: blue;", this, this[dataFromWorker.fn]);
	this[dataFromWorker.fn](dataFromWorker);
}

function addScript() {
	var head = document.getElementsByTagName("head")[0],
			script = document.createElement("script");
		
	script.addEventListener("load", this.callback, false);			
	script.src = this.url;
	head.appendChild(script);

}

function postmsg(fn, msg, args) {
	console.log("MAIN postmsg called for this, fn, msg, args…\n\t", this, fn, msg, args);
	data.fn = fn;
	data.msg = msg;
	data.args = args;
	this.postMessage(data);
}

function gameReady(bool) {
	console.log("CALL gameReady. Init.");
	if(checkReadyDependencies("game")) {
		console.log("game AND dependencies are ready");
		readyGame();
	}
}

function cardsReady(bool) {
	console.log("CALL cardsReady. Init.");
	if(checkReadyDependencies("cards")) {
		console.log("cards AND dependencies are ready");
		readyGame();
	}
}

function layoutReady(bool) {
	console.log("CALL layoutReady. Init.");
	if(checkReadyDependencies("layout")) {
		
	}
}

function storageReady(bool) {
	console.log("CALL storageReady. Init.");
	if(checkReadyDependencies("storage")) {

	}
}

function readyGame() {
	console.log("MAIN set readyGame()");
	postmsg.call(card, "mainReady", "true");
	postmsg.call(game, "mainReady", "true");
}

function checkReadyDependencies(resource) {
	var i = 0,
			len = readiness[resource].depends.length,
			ready = true;
	
	// If dependencies, check ready state
	for(i; i < len; i++) {
		console.log("running for each dependency");
		if(readiness[readiness[resource].depends[i]].state === false) {
			// Check if dependencies are ready by property determined by associative array
			ready = false;
			break;
		}
	}
	// If no dependencies, just return true
	return ready;
}
		
function toggleReadyState(resource, bool) {
	console.log("toggleReadyState from: ", readiness[resource].state);
	readiness[resource].state = bool || !readiness[resource].state? true: false;
	readiness[resource].ready(readiness[resource].state);
	console.log("toggleReadyState to: ", resource, readiness[resource].state);
}

function setReadyState(resource) {
	console.log("setReadyState from: ", readiness[resource].state);
	readiness[resource].state = true;
	console.log("readiness: ", readiness);
	console.log("resource: ", resource);
	//readiness[resource].ready(readiness[resource].state);
	/*if(readiness.iteration <= 4) {
		// @Debug only
		readiness[resource].ready(true);
	}*/
	readiness[resource].ready(true);
	console.log("setReadyState to: ", resource, readiness[resource].state);
}

function getGameType(iface) {
	console.log("%cMAIN getGameType called: ", "background: silver;", iface, gameOptions.type(), gameOptions.vowels());
	postmsg.call(iface, "getGameType", gameOptions.type() + ", " +  gameOptions.vowels());
}

function getInterface(name) {
	return this[name]; //error. not a function
}

this.getGameInterface = function() {
	return game;
};

this.getMainInterface = function() {
	return main;
};

this.getReadyState = function(resource) {
	return readiness[resource].state;
};

function MainHandler() {}
function CardHandler() {}
function GameHandler() {}

/* CONTROL ELEMENTS
/
/	ctrlReset
/	ctrlSkip
/	ctrlPrev
/	ctrlDiffBasic
/	ctrlDiffAdvanced
/	difficultyTypeText
/	ctrlTypeBasic
/	ctrlTypeAdvanced
*/

/* ANSWER ELEMENTS
/	question_rad_(#POSITION)
/	
*/



document.getElementById("copyrightYear").innerHTML = new Date().getFullYear();
console.groupEnd();