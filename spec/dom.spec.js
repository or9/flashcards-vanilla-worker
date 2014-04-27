describe("DOM suite", function() {
	var row = document.querySelectorAll(".row");
	var col = document.querySelectorAll(".col");
	var cards = document.querySelectorAll(".card");
	var header = document.getElementById("mainHeader");
	var controls = document.getElementById("gameControls");
	var cardArea = document.getElementById("cardTable");
	var choiceColumn = document.getElementById("choiceColumn");
	var footer = document.getElementById("mainFooter");
	var copyright = document.getElementById("copywriteYear");
	var typeHeading = document.getElementById("gameTypeHeading");
	
	describe("Overall DOM readiness", function() {
		it("Expects that header is available", function() {
			expect(header).toBeDefined();
		});
	
		it("Expects that game controls are available", function() {
			expect(controls).toBeDefined();
		});
	
		it("Expects that cards' content area is available", function() {
			expect(cardArea).toBeDefined();
		});
	
		it("Expects that choices column is available", function() {
			expect(choiceColumn).toBeDefined();
		});
	
		it("Expects that footer exists", function() {
			expect(footer).toBeDefined();
		});
	
		it("Expects that copyright date exists", function() {
			expect(copyright).toBeDefined();
		});
	});
	
	describe("Game test suites", function() {
		it("Expects that gameTypeHeading is defined", function() {
			expect(typeHeading).toBeDefined();
		});
	
		it("Expects that gameTypeHeading is not null", function() {
			expect(typeHeading.innerHTML).not.toBeUndefined();
		});
	
	});
	
	
});
