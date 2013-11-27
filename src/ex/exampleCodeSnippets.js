/*
 *
 */
/*function getElements(name) {
  if (!getElements.cache) getElements.cache = {};
  return getElements.cache[name] =
    getElements.cache[name] ||
    document.getElementsByTagName(name);
}

Function.prototype.partial = function() {
  var fn = this, args = Array.prototype.slice.call(arguments);
  return function() {
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = arguments[arg++];
} }
    return fn.apply(this, args);
  };
};

var bindClick = document.body.addEventListener
  .partial("click", undefined, false);
*
* (function($){
* 	// use $ for jQuery within here
* 
* })(jQuery);
*
* Constructor properties take precedence over 
* 	constructor's prototype properties
* Prototype is only referenced when properties are not found directly 
* 	within the constructor
* 
* SubClass.prototype = new SuperClass();
* Ninja.prototype = new Person()
* 
* hasOwnProperty() checks whether property defined on object
* 	vs inherited from prototype
*/

/* **************************************************************************************************
  	U+060C ،‎ arabic comma
 	U+060D ؍‎ arabic date separator
 	U+060E ؎‎ arabic poetic verse sign
 	U+060F ؏‎ arabic sign misra
 	U+061F ؟‎ arabic question mark
 	U+066D ٭ arabic five pointed star
 	U+06DD ۝‎ arabic end of ayah
 	U+06DE ۞‎ arabic start of rub el hizb
 	U+06E9 ۩‎ arabic arabic place of sajdah
 	U+FD3E ﴾ arabic ornate left parenthesis
 	U+FD3F ﴿ arabic ornate right parenthesis
 
 ************************************************************************************************** */

/* **************************************************************************************************
	U+FDF0 ﷰ‎ arabic ligature salla used as koranic stop sign isolated form (صلے)
	U+FDF1 ﷱ‎ arabic ligature qala used as koranic stop sign isolated form (قلے)
	U+FDF2 ﷲ‎ arabic ligature allah isolated form (الله)
	U+FDF3 ﷳ‎ arabic ligature akbar isolated form (As used for the phrase الله اكبر Allahu akbar)
	U+FDF4 ﷴ‎ arabic ligature mohammad isolated form (محمد)
	U+FDF5 ﷵ‎ arabic ligature salam isolated form (Abbreviation for صلعم "peace be upon him")
	U+FDF6 ﷶ‎ arabic ligature rasoul isolated form (رسول)
	U+FDF7 ﷷ‎ arabic ligature alayhe isolated form (عليه)
	U+FDF8 ﷸ‎ arabic ligature wasallam isolated form (وسلم)
	U+FDF9 ﷹ‎ arabic ligature salla isolated form
	U+FDFA ﷺ‎ arabic ligature sallallahou alayhe wasallam (صلى الله عليه وسلم "peace be upon him")
	U+FDFB ﷻ‎ arabic ligature jallajalalouhou (جل جلاله)
	U+FDFC ﷼‎ rial sign (ريال)
	U+FDFD ﷽‎ arabic ligature bismillah ar-rahman ar-raheem (the Basmala)
************************************************************************************************** */
 
if(!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback, context) {
		var i = 0, len = this.length;
		for(i; i < len; i++) {
			callback.call(context || null, this[i], i, this);
		}
	};
}

HTMLElement.prototype.remove = function() {
    if(this.parentNode)
      this.parentNode.removeChild(this);
};

function Person() {
	this.personality = {};
	this.identity = {};
	this.isAlive = true;
}

function Individual(str_name) {
	var name = str_name;
	var disposition = {
			overall: "",
			underlying: ""
	};
	
	this.personality.disposition = disposition;
	
	this.getName = function() {
		return name;
	};
}

function Generic() {
	this.index = 0;
	this.personality = false;
	this.identity = this.index - 1;
	var name = "Person " + this.index;
	
	this.index += 1;
	
	this.getName = function() {
		return name;
	};
}

function GenGuy() {
	var props = {
			unique: false,
			tv: true,
			spongebob: false
	};
	
	this.getProps = function() {
		for(var key in props) {
			return key + ": " + props[key];
		}
	};
}

function GenGal() {
	this.getProps = GeneralGuy.getProps();
}

function Guy(hasBeard) {
	var beardStatus = true;
	
	this.beardStatus = function() {
		return beardStatus;
	};
}

function Gal(lady) {
	var ladylike = lady;
	
	this.ladyStatus = function() {
		return ladylike;
	};
}

Individual.prototype = new Person();
Generic.prototype = new Person();
GenGuy.prototype = new Generic();
GenGal.prototype = new Generic();
Guy.prototype = new Individual();
Gal.prototype = new Individual();

var jack = new Guy(true);
var jill = new Gal(false);
var joe = new Guy(false);
var eli = new Gal(true);

var generics = ["guys", "gals"];
var guyslist = ["bob", "chuck", "chad", "channing", "brad"];
var galslist = ["ella", "emma", "brittany", "courtney", "anna", "penelope"];
var genGuys = createGenerics(guysList, true);
var genGals = createGenerics(galsList, false);

function createGenerics(list, isGuys) {
	var i = 0;
	var len = list.length;
	var arr = [];
	for(i; i < len; i++) {
		var genericPerson = isGuys? new GenGuy(): new GenGal();
		arr.push(genericPerson);
	}
	return arr;
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

