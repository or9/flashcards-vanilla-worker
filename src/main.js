var com = com || {}; com.sudo = com.sudo || {};
// We're not using jQuery here… is it required?
// I like to use !! to coerce a boolean return

(function() {
	"use strict";
	
	var data = {
		"fn": "startGame",
		"msg": ""
	};
	var mainHandler = function() {};
	this.game = new Worker("./controller/game.js");
	var main = new Worker("./model/AbstractWorker.js");
	// this.storage = new Worker("./controller/storage.js");
	// var storage = new Worker("./controller/storage.js");
	
	// game: interface
	// cards: object, com.sudo.cards
	// main: interface

	var scripts = {
		worker: {
			url: "./model/WorkerHandler.js",
			callback: function(e) {
				mainHandler = new MainHandler();
				function MainHandler() {
					// console.log("MainHandler");
				}

				MainHandler.prototype = new WorkerHandler();
			}
		},
		card: {
			url: "./controller/card.js",
			callback: function(e) {
				console.log("card scriptLoad callback called");
				
			}
		},
		storage: {
			url: "./model/Storage.js",
			controller: {
				url: "./controller/storage.js",
				callback: function(e) {
					console.log("Storage.controller scriptLoad callback called");
					
				}
			},
			callback: function(e) {
				console.log("storage scriptLoad callback called");
				// addScript.call(scripts.storage.controller);
			}
		}
	};

	addScript.call(scripts.worker);
	addScript.call(scripts.card);
	// addScript.call(scripts.storage);
	// addScript.call(scripts.storage.controller);

	function msg_handler(e) {
		if(!!e.data && !!e.data.fn) {
			(function() {
				this[e.data.fn](e.data);
			}).apply(mainHandler);
		}
	}

	function addScript() {
		var head = document.getElementsByTagName("head")[0],
			script = document.createElement("script");
			
		script.addEventListener("load", this.callback, false);			
		script.src = this.url;
		head.appendChild(script);

		
	}
}).apply(com.sudo);