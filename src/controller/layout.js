com.sudo.layout = com.sudo.layout || {};
(function() {
	this.addEventListener("message", msg_handler, false);
	
	
	
	function msg_handler(e) {
		if(!!e.data && !!e.data.fn) {
			(function() {
				this[e.data.fn](e.data);
			}).apply(mainHandler);
		}
	}
	
}).call(com.sudo.layout);