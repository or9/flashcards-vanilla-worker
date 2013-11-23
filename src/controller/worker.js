this.addEventListener("message", msg_handler, false);

function msg_handler(e) {
	
}

console.log(this);
/*
 * Can use:
 * 		navigator object
 *		location object (read-only)
 *		importScripts() method (for accessing script files in the same domain)
 *		JavaScript objects such as Object, Array, Date, Math, String
 *		XMLHttpRequest
 *		setTimeout() and setInterval() methods
 *	Can't use:
 *		The DOM
 *		The worker's parent page (except via postMessage()) 
 */