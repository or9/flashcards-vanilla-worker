testA(1);

function Card() {
	// Named function
	"use strict";
	
	// Define base properties of all cards
	this.audio = ""; // file location
	this.character = "template";
	this.name = "template";
	this.index = 0; // correct position within alphabet
	
	this.getCardByIndex = function(n_index) {
		
	};
}

function GameCard(prop) {
	console.log(typeof prop);
	this[prop] = undefined;
	
}

GameCard.prototype = new Card();

// return card by index?
// instantiate card type by ref #?
// if param.length >= 3, unique ID of card
// else, return card by index?
// 

// Models:
// 		Guess Character (given name)
//		Guess Name (given character)
//		Guess Character and / or Name (given audio)
//		Guess Audio (given name and / or character)
