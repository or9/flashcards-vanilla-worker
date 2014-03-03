"use strict";
//addEventListener("message", msg_handler, false);
//addEventListener("error", err_handler, false);

AbstractWorker.prototype.data = {
	id: location["search"].slice(1),
	status: true,
	cache: false,
	fn: "",
	msg: "",
	args: {}
};
AbstractWorker.prototype.cache = {
	// url?sample: {data: "some cached data"}i
	// this can't work. Each worker loads a new instance of this file
	id: "CACHE ID",
	create: function(url, dataValue) {
						console.log("\n\n\ncreating cache… : " + this + 
								"\n\t" + url + "\t" + this[url] +
								"\n\t" + dataValue + "\n" + this.id + "\n\n\n");
						this[url] = {data: dataValue};
					}
};
AbstractWorker.prototype.timer = 0;
AbstractWorker.prototype.msgHandler = function(e) {
	this.postmsg("receipt", e.data.fn, e.data.msg, e.data.args);
	this.data.fn = e.data.fn; 
	this.data.msg = "response";
	console.log("abworker calling: " + this[e.data.fn]);
	this[e.data.fn](e.data);
};
AbstractWorker.prototype.errHandler = function(e) {
	this.postmsg("err", "Error @: " + e.lineno + "\n\t File: " + e.filename + "\n\t Message:" + e.message);
};
AbstractWorker.prototype.importScripts = function(data) {
	importScripts(data.msg);
	postmsg(this.data.fn, data.msg, true);
};
AbstractWorker.prototype.xhr = function(data, callback, args) {
	//var instance = this;
	//console.log(self);
	//console.log(this);
	//var sel = self;
	var	xhr = new XMLHttpRequest();
	console.log("ABSTRACT WORKER received ajax call for… " + data);
	var url = data.msg || data;
	var contentType = checkArgs(contentType) || "application/x-www-form-urlencoded";
	var method = checkArgs(method) || "GET";
	var	random = this.data.cache? "": "?" +  Math.random() * 100;
	
	/*for(var prop in sel.cache) {
		console.log("\n\nprop in cache: " + prop + "\n val: " + sel.cache + "\n\n\n");
	}*/
	
	//if(!sel.cache[url]) {
	console.log(">>> response not cached <<<");
	xhr.open(method, url + random, true);
	xhr.addEventListener("readystatechange", ajax_handler, false);
	xhr.setRequestHeader("Content-type", contentType);
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	if(args && args.responseType) {xhr.responseType = args.responseType;}
	xhr.send();
	
	//} else {
	//console.log(">>> response using cached data callback <<<");
	//callback(sel.cache[url]);
	//}
	
	//console.log("\n\n\ncache: " + sel.cache + "\n" + sel.cache.id + sel.cache[url] + "\n\n\n");

	function checkArgs(prop) {
		var result = false;
		if(args && args.prop) {
			result = true;
		}
		return result;
	}

	function ajax_handler(e) {
		console.log("ABSTRACT WORKER ajax_handler called with e: " + e);
		if(xhr.readyState === 4) {
			console.log("XHR calling back with data as " + e + " and status of " + xhr.status);
			//console.log("\n\n\ncache in handler: " + cache + "\n" + url + "\n\n\n");
			//sel.cache.create(url, xhr);
			//console.log("creating instance.cache[url] as: " + instance.cache[url]);
			callback(xhr);
		}
	}
}
AbstractWorker.prototype.toggleReadyState = function(data) {
	postmsg("toggleReadyState", true);
};
AbstractWorker.prototype.timeout = function(data) {
	var int = parseInt(data.msg);
	
	if(data.timer === "set")
		timer = setTimeout(timeoutCallback, int);
	else
		clearTimeout(timer);
	
	function timeoutCallback() {
		postmsg("timer", "end", true);
	}
};
AbstractWorker.prototype.interval = function(data) {
	var int = parseInt(data.msg);
	
	if(data.timer === "set")
		timer = setInterval(intervalCallback, int);
	else
		clearInterval(timer);
	
	function intervalCallback() {
		this.postmsg("timer", "tick", true);
	}
};
AbstractWorker.prototype.shutdown = function() {
	self.close();
};
AbstractWorker.prototype.postmsg = function(fn, msg, args) {
	this.data.fn = fn;
	this.data.msg = msg;
	this.data.args = args;
	console.log("abstract worker posting message: \n\tfn: " + this.data.fn + "\n\tdata: " + this.data.msg + "\n\targs: " + this.data.args); 
 	self.postMessage(this.data);
};
AbstractWorker.prototype.getLocation = function(part) {
	return getLocation(part);
};
AbstractWorker.prototype.log = function(fn) {
	console.group("AbstractWorker Log");
	console[fn]("%c color: black; background: grey;", arguments);
	console.groupEnd();
};
AbstractWorker.prototype.status = function() {
	this.postmsg("status", this.data.status);
};

function AbstractWorker() {}
Cache.prototype.id = "CACHE ID";
Cache.prototype.create = function(url, dataValue) {
						console.log("\n\n\ncreating cache… : " + this + 
								"\n\t" + url + "\t" + this[url] +
								"\n\t" + dataValue + "\n" + this.id + "\n\n\n");
						this[url] = {data: dataValue};
};
function Cache() {}
function getLocation(part) {
	return part? location[part].toString(): location.toString();
}

if(getLocation("search")) {
	console.log("loadScripts from… ../controller/" + getLocation("search").slice(1));
	importScripts("../controller/" + getLocation("search").slice(1));
}

