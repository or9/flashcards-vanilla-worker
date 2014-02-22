console.log("GameType script begin");
// Questions: Text Labels
// Answer: Single Card
GameType.prototype.current = "";
GameType.prototype.heading = "";
GameType.prototype.question = "";
GameType.prototype.allQuestions = false;
GameType.prototype.useVowels = false;
GameType.prototype.basic = new Basic();
GameType.prototype.advanced = new Advanced();
GameType.prototype.getScope = function() {
	console.log("GameType.prototype.getScope, scope is…: ", scope);
	return scope
};

Type.prototype.current = "";
Type.prototype.heading = "";
Type.prototype.question = "";

//GameType.prototype = new Type();
//Basic.prototype = new Type();
//Advanced.prototype = new Type();
Basic.prototype = new GameType();
Advanced.prototype = new GameType();

Basic.prototype.char2Trans = function() {
	// Provided char, user must match to transliteration (and name?)
	console.log("setting game type to basic matchChar2Transliteration");
	this.current = "basic.char2Trans";
	this.heading = "Select the Character Card&#8217;s Name";
	this.question = "The character&#8217;s name is&hellip; ";
};
Basic.prototype.trans2Char = function() {
	// Provided transliteration, user must match to char
	console.log("setting game type to basic matchTransliteration2Char");
	this.current = "basic.trans2Char";
	this.heading = "Select the Named Card&#8217;s Character";
	this.question = "This character is&hellip; ";
};
Basic.prototype.sound2Char = function() {
	// Provided sound, user must match to char
	console.log("setting game type to basic matchChar2Sound");
	this.current = "basic.sound2Char";
	this.heading = "What Character Makes This Sound?";
	this.question = "That sound is&hellip; ";      
};

Advanced.prototype.charform2Initial = function() {
	// Provided char form (random, !initial), user must match to initial form (and name?)
	console.log("setting game type to advanced matchCharForm2InitialForm");
	this.current = "advanced.charform2Initial";
	this.heading = "Select the Card&#8217;s Initial Form";
	this.question = "The initial form of the character is&hellip; ";
};
Advanced.prototype.trans2Charform = function() {
	// Provided char transliteration, user must match to form(random, !initial)
	console.log("setting game type to advanced matchTransliteration2Form");
	this.current = "advanced.trans2Charform";
	this.heading = "Select an Associated Form of the Named Card";
	this.question = "One possible form is&hellip; ";   
};
Advanced.prototype.sound2Charform = function() {
	//Provided sound, user must match to form(random, !initial)
	console.log("setting game type to advanced matchSound2Form");
	this.current = "advanced.sound2Charform";
	this.heading = "Select an Associated Form of the Spoken Card";
	this.question = "That sound was&hellip; ";
};

function Type() {console.log("instantiating Type()");}
function Basic() {console.log("instantiating Basic()");}
function Advanced() {console.log("instiating Advanced()");}

function GameType(type) {
	console.log("instantiating GameType() with type: ", type);
	var scope = ""; // [questions||cards]
	console.log("log GameType properties: ", this.current,"\n", this.heading,"\n", this.question,
			"\n", this.sound2Charform, this.prototype);
	//this.getScope = function() {
	//	return scope;
	//};

	console.log();

	resolveType.call(this, type, arguments[1]);

	function resolveType(type, options) {
		console.log("resolving type in GameType() -----------------------------------|");
		var _type = !!type && typeof type === "string"? type.toString(): "default",
				_options = options || {},
				rex_adv = /ADVANCED+/gi,
				rex_sound = /SOUND+/gi,
				rex_translit = /TRANS\w+/i,
				rex_char = /CHAR\w+/i;

		if(_type.match(rex_adv)) {
			//setAdvanced();
			_options.basic = false; _options.advanced = true; _options.level = "advanced";
		} else {
			//setBasic();
			_options.basic = true; _options.advanced = false; _options.level = "basic";
		}

		setLevel.call(this, _options.level);
		
		function sortOptions() {
			//var advanced,basic;
			var levelStr = "";

			if(_options.advanced) {
				levelStr = "advanced";
			} else {
				levelStr = "basic";
			}

			setLevel(levelStr);
		}

		function setLevel(level) {
			var fn = ""; // fn name reference to call after conditions resolve
			setOptions.call(this);
			if(_type.match(rex_sound)) {
				fn = "sound";
			} else if(_type.match(rex_translit)) {
				fn = "trans";
			} else {
				fn = "char";
			}
			console.log(resolveFn.call(this, new RegExp("^" + fn,"")));
			console.log(this[level]["char2Trans"]);
			console.log(this.advanced);
			console.log(this.basic.char2Trans);
			console.log(">!>!>!>!> setting level. but what's this?", typeof this);
			//this[level][fn]();

			function resolveFn(str) {
				var re = "unresolved";
				for(var fn in this[level]) {
					console.log(this[level][fn]);
					if(this[level][fn].match(str)) {
						re = this[level][fn];
						break;
					}
				}
				return re;
			}
		}

		function setOptions() {
			var rex_q = /question/gi,
					rex_vowels = /vowel/gi;
			
			for(var key in _options) {
				checkOption(key, _options[key]);
			}

			function checkOption(key, option) {

				if(key.match(rex_q)) {
					if(option === true) {
						this.allQuestions = true;
					} else {
						this.allQuestions = false;
					}
				}
			
				if(key.match(rex_vowels)) {
					if(option === true) {
						this.useVowels = true;
					} else {
						this.useVowels = false;
					}
				}

			}
		}

	} // /resolveType
	
} // /GameType
