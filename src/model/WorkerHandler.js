WorkerHandler.prototype.test = function(data) {
	console.log("WORKER HANDLER: test: " + data + "\tmsg: " data.msg);

};
WorkerHandler.prototype.log = function(data) {
	console.log("WORKER HANDLER: log: " +  data + "\tmsg: " data.msg);

};
WorkerHandler.prototype.getLocation = function(data) {
	console.log("WORKER HANDLER: getLocation: " +  data + "\tmsg: " data.msg);

};
WorkerHandler.prototype.importScript = function(data) {
	console.log("WORKER HANDLER: importScript: " + data + "\tmsg: " data.msg);

};
WorkerHandler.prototype.ajax = function(data) {
	console.log("WORKER HANDLER: ajax: " +  data + "\tmsg: " data.msg);

};
WorkerHandler.prototype.timeout = function(data) {
	console.log("WORKER HANDLER: timeout: " +  data + "\tmsg: " data.msg);

};
WorkerHandler.prototype.interval = function(data) {
	console.log("WORKER HANDLER: interval: " +  data + "\tmsg: " data.msg);

};
WorkerHandler.prototype.stop = function(data) {
	console.log("WORKER HANDLER: stop: " +  data + "\tmsg: " data.msg);

};
function WorkerHandler() {
	console.log("WorkerHandler instantiated");
}
