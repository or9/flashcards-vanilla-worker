testA(1);

function Card(index, datasrc) {
	// Named function
	"use strict";
	
	var index = index || 0;
	var audio = datasrc[index].audio;
	var character = datasrc[index].character;
	var name = datasrc[index].name;
	var forms = datasrc[index].contextualForms;
	for(var key in datasrc[index].contextualForms) {
		forms.key = forms[key];
	}
	// Define base properties of all cards
	this.audio = ""; // file location
	this.character = "template";
	this.name = "template";
	this.index = 0; // correct position within alphabet
	
	this.getCardByIndex = function(n_index) {
		return datasrc[n_index];
	};

	this.getCharacter = function() {
		return character;
	};

	this.getAudio = function() {
		return audio;
	}
}

function GameCard(prop) {
	console.log(typeof prop);
	this[prop] = undefined;
	// this.addEventListener("click", game.answer_handler, false);
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
