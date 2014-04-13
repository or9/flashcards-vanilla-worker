// handler for receiving messages, based on WorkerHandler model

// Set prototype first based on Parent class,
// Otherwise prototype properties will be overridden by parent prototype properties
// When setting Decendent.prototype = new Parent()
MainHandler.prototype = new WorkerHandler();

WorkerHandler.prototype.getGameType = function(data) {
	console.log("MAIN Generic getGameType called with data: ", data.fn, data.msg);
	getGameType(data.msg);
};

WorkerHandler.prototype.setReadyState = function(data) {
	console.log("MAIN Generic setReadyState called", data, data.msg);
	// INFINITE LOOP…
	setReadyState(data.msg);
};

WorkerHandler.prototype.toggleReadyState = function(data) {
	//toggleReadyState(data.msg);
};

WorkerHandler.prototype.ready = function(data) {
	console.log("MAIN Generic ready called: ", data.msg);
};

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

mainHandler = new MainHandler();