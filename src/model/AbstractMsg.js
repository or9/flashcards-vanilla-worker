function AbstractMsg() {
	this.useWorkers = function() {
//		console.log(this.name, arguments);
		return !!window.Worker;
	};
	
	function msg_handler(e, fn) {
//		console.log(this.name, arguments);
		fn(e);
	}
	
	this.register = function(target, callback) {
//		console.log(this.name, arguments);
		target.addEventListener("message", msg_handler.call(this, callback), false);
	};
}

function SpecMessage(type) {
	
}

SpecMessage.prototype = new AbstractMessage();