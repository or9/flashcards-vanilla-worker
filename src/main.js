(function() {
	var worker = new Worker("./model/Worker.js");
//	worker.postMessage(sessionStorage);
//	worker.postMessage(localStorage);
	console.log(localStorage, sessionStorage);
	worker.postMessage();
	worker.addEventListener("message", msg_handler, false);
	
	var data = {};
	
	function msg_handler(e) {
		console.log("main thread: ", e, e.data);
		if(!!e.data && !!e.data.callback) {
			
		}
	}
	
	data.type = "fn";
	data.fn = "importScript";
	data.msg = "script1, script2, script3";
	worker.postMessage(data);
	
	data.fn = "passThrough";
	worker.postMessage(data);
	
	data.fn = "getLocation";
	worker.postMessage(data);
	
	data.fn = "ajax";
	worker.postMessage(data);
	
	data.fn = "timeout";
	worker.postMessage(data);
	
	data.fn = "interval";
	worker.postMessage(data);
	
	data.type = "";
})();