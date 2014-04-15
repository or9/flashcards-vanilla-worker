// @TODO
// Limit the scope of these utility functions to Handlers only, not global

gameHandler = new GameHandler();
mainHandler = new MainHandler();
cardHandler = new CardHandler();


function clickHandlerCard(e) {
	console.log(e.target.id);
}

function moveElement(element, target) {
	console.log("MAIN moveElement: ", element, target);
	// If the element is hidden, leave it hidden; otherwise, hide it
	element.className = /disp_none/g.test(element.className)? element.className: element.className += "disp_none";
	var _target = target || document.getElementsByTagName("body")[0];
	// Move the element to resolved target (element | body)
	_target.appendChild(element);
	// Unhide the moved element
	element.className.replace("\\s{0,}disp_none\\s{0,}","");
}
	
function unsetQuestionCard(array) {
	console.log("unsetting question cards");
	var name = "current",
		elements = [],
		len = array.length,
		i = 0;
	for(i; i < len; i++) {
		console.log(array[i]);
		elements.push(document.getElementById("card_" + array[i]));
	}
	adjustClass(elements, name, false);
}
	
function adjustClass(elements, name, forShow) {
	var rex = new RegExp("\s{0,}"+name,"g"),
		len = elements.length,
		i = 0;
	
	for(i; i < len; i++) {
		if(!!forShow) // if for show
			elements[i].className += " " + name;
		else
			elements[i].className.replace(name,"");
	}
		
}

function readyGame() {
	console.log("MAIN set readyGame()");
	postmsg.call(card, "mainReady", "true");
	postmsg.call(game, "mainReady", "true");
}


function getGameType(iface) {
	console.log("%cMAIN getGameType called: ", "background: silver;", iface, gameOptions.type(), gameOptions.vowels());
	postmsg.call(iface, "getGameType", gameOptions.type() + ", " +  gameOptions.vowels());
}

function getInterface(name) {
	return this[name]; //error. not a function
}


function CardHandler() {}
function GameHandler() {}