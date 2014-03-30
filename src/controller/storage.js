com.sudo.storage = com.sudo.storage || {};
(function() {
	var local = new Local();
	var session = new Session();
	var storageType = function() {return isLocal? local: session;};
	
	this.set = function(key, val, isLocal) {
		storageType.setItem(key, val);
	};
	
	this.get = function(key, isLocal) {
		return storageType.getItem(key);
	};
	
	this.remove = function(key, isLocal) {
		storageType.rm(key);
	};
	
	this.rm = this.remove;
	
	this.destroy = function(storageType) {
		storageType.destroy();
	};
}).apply(com.sudo.storage);
