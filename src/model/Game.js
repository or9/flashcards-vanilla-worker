/*
 * Flashcard is main
 * Card instantiated for each card by Flashcard instance
 * Main initializes, sets / gets values, runs
 */

/* Game properties 
 * 		set language
 * 		create web workers
 * 		instantiate cards
 */
"use strict";
addEventListener("message", msg_handler, false);
addEventListener("error", err_handler, false);

var state = {
		initialized:false, 
		ran:false, 
		ended:false
	};

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

function begin(isInit) {
	if(!isInit) {
		isInit = true;
	}

	
}

function answer(data) {

}

function end(data) {

}

function checkAnswer(answer) {

}