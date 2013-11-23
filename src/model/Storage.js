function Storage() {
	"use strict";
	var store;
	
	this.destroy = function() {
		for(var key_str in this.getStore()) {
			this.getStore().removeItem(key_str);
		}
	};
	
	this.setItem = function(key_str, val_str) {
		this.getStore().setItem(key_str, val_str);
	};
	
	this.getItem = function(key_str) {
		this.getStore().getItem(key_str);
	};
	
	this.removeItem = function(key_str) {
		this.getStore().removeItem(key_str);
	};
	
	this.init = function(instance) {
		return instance = new this();
	};
}

function Local() {
	var store = localStorage;
	this.getStore = function() {
		return store;
	};
}

function Session() {
	var store = sessionStorage;
	this.getStore = function() {
		return store;
	};
}

/*
var local = new Local();
var session = new Session();

Local.prototype = new Storage();
Session.prototype = new Storage();
*/