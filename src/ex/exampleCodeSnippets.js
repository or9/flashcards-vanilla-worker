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


