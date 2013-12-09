function WorkerHandler() {
	this.test = function(data) {
		console.log("test > data: ", data);
		console.log(data.msg);

	};

	this.log = function(data) {
		console.log("Worker log: ", data.msg);
	};

	this.getLocation = function(data) {
		console.log("getLocation handler received: ", data.msg);
		
	};
	
	this.importScript = function(data) {
		console.log("import handler received: ", data.msg);
		
	};
	
	this.ajax = function(data) {
		console.log("ajax handler received: ", data.msg);
		
	};
	
	this.timeout = function(data) {
		console.log("timeout handler received: ", data);
		
	};
	
	this.interval = function(data) {
		console.log("interval handler received: ", data);
		
	};

	this.stop = function(data) {
		console.log("stop handler received: ", data);
	};
}