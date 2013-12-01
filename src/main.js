var console = console || {log: function() {alert("console unavailable")}};
var com = com || {}; com.sudo = com.sudo || {};
console.log("com: ", com, "\ncom.sudo: ", com.sudo);
(function($) {
	"use strict";

	var mainHandler = function(){};
	var game = new Worker("./controller/game.js");
	var main = new Worker("./model/AbstractWorker.js");

	var scripts = {
		worker: {
			url: "./model/WorkerHandler.js",
			callback: function(e) {
				console.log("WorkerHandler callback called");
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
				// console.log("card callback called");

			}
		},
		storage: {
			url: "./controller/storage.js",
			callback: function(e) {
				// console.log("storage callback called");

			}
		}
	};

	addScript.call(scripts.worker);
	addScript.call(scripts.card);
	addScript.call(scripts.storage);

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

		script.src = this.url;
		head.appendChild(script);
		script.addEventListener("load", this.callback, false);
	}
})(jQuery);