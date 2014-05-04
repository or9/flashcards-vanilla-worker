//var helper = require("./main.helper.js");

describe("Main suite", function() {
	
	it("Sets initial expectation that true shall be true", function() {
//	var help = new helper();
//	help.test(["arrVal0", "arrVal1"], "test helper constructor");
		expect(true).toBe(true);
	});
	
	it("Expects that a language shall be defined", function() {
	
	});
	
	it("Expects that data contains default values", function() {
	
	});
	
	describe("test gameOptions object", function() {
		// diff, type, eID, vowels, eName
			
		it("Expects gameOptions.diff to return ctrlDifficulty value", function() {
	
		});
		
		it("Expects gameOptions.type to return ctrlType value", function() {
	
		});
		
		it("Expects gameOptions.vowels to return ctrlVowels value", function() {
	
		});
		
		it("Expects gameOptions.eID to return object of passed argument ID", function() {
	
		});

		it("Expects gameOptions.eName to return control object property of gcontrols DOM object", function() {
			
		});
	
	});
	
	describe("Worker init suite", function() {
		it("card is expected to be a worker", function() {
			
		});
		
		it("game is expected to be a worker", function() {
		
		});
		
		it("main is expected to be a worker", function() {
		
		});
		
		it("expects message listener to have been added to card worker", function() {
		
		});
		
		it("expects message listener to have been added to game worker", function() {
		
		});
		
		it("expects message listener to have been added to main worker", function() {
		
		});
		
	});
	
	describe("Handlers for web worker messages", function() {
		it("expects CardHandler to be extended from WorkerHandler", function() {
		
		});
		
		it("expects GameHandler to be extended from WorkerHandler", function() {
		
		});
		
		it("expects MainHandler to be extended from WorkerHandler", function() {
		
		});
		
		it("expects WorkerHandler utility functions to be available", function() {
		
		});
		
		it("expects that Handlers shall route appropriately", function() {
			
		});
		
	});
	
	
	
	

});
