function Utility() {
	"use strict";
	
	function AbstractLog() {
		
	}
	
	function argarr() {
		return Array.slice.call([arguments[0], arguments.length - 1]);
	}
	
	this.fn = function(fn_name) {
		return this[fn].call(Array.slice[arguments[0], arguments.length - 1]);
	};
}

function AbstractLog() {
	function log() {
		if(!!console && !!console.log) {
			switch(arguments[0]) {
			case "log":
				console.log(arguments);
				break;
			case "warn":
				if(!!console.warn) {
					console.warn(arguments);	
				}
				break;
			case "error":
				if(!!console.error) {
					
				}
				break;
				default:
					
					break
			}
		}
	}
	
	function printArgs() {
		var i = 0;
		var len = arguments.length;
		
		for(i; i < len; i++) {
			
		}
	}
	
	this.log = function() {
		log("log");
	};
	
	this.warn = function() {
		log("warn");
	};
	
	this.error = function() {
		log("error");
	};
}

function Log(context) {
	
}

Log.prototype = new AbstractLog();