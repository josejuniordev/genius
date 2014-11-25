/*
* Genius core
* @author L. Mazzetto
* @version 0.5
* @module
*/
var Genius = (function(){

	// elements that were created
	var elements = [],
	 	sequence = [],
	 	selectedSequence = [],
	 	score = 0;

	/**
	* A constructor of genius element
	* @constructor
	**/
	function Element(dom, callback){
		var self = this
		this.DOM = dom
		this.callback = callback
	}

	/**
	* Highlights the element who was clicked and
	* sends a callback to a class that is controlling the element
	**/
	Element.prototype.click = function(){
		this.callback(this)
		this.DOM.classList.add("clicked")
	}

	Element.prototype.active = function(isActive){
		var self = this;

		if(isActive){
			// mouse down
			this.DOM.onmousedown = function(){
				self.click(self)
			}

			// mouse up
			this.DOM.onmouseup = function(){
				self.DOM.classList.remove("clicked")
			}

			this.DOM.classList.add("active")
		} else {
			// resets
			this.DOM.onmousedown = function(){}
			this.DOM.classList.remove("active")
		}
	}

	Element.prototype.hide = function(callback){
		this.DOM.classList.remove("highlight")
		callback()
	}

	Element.prototype.highlight = function(callback){
		this.DOM.classList.add("highlight")
		var self = this
		setTimeout(function(){ self.hide(callback) }, 500)
	}

 	/**
	* Returns the score
	**/
	function getScore(){
		return score;
	};

 	/**
	* Returns the length of the sequence
	**/
	function getTotal(){
		return sequence.length;
	};

	/**
	* Generates a random number from an initial value and a final value
	* @param {Number} initialValue
	* @param {Number} finalValue
	**/
	function randomize(initialValue, finalValue){
		return Math.floor(Math.random() * finalValue) + initialValue;
	};

	/**
	* Appends a random value to the sequence
	**/
	function generate(){
		score++;
		sequence.push(randomize(0,elements.length))
	};

	/**
	* Highlights the elements following the sequence
	**/
	function play(callback){
		// restarts the user selected sequence
		selectedSequence = [];
		generate();

		// controls the timer
		function timer(index, total){
			var _callback = function(){}

			setTimeout(function(){
				if(index==total){
					_callback = callback;
				}
				elements[sequence[index]].highlight(_callback);
			}, 1000*i)
		}

		for (var i=0; i<sequence.length; i++){
			timer(i, sequence.length-1);
		}
	};

	/**
	*
	**/
	function select(element){
		if (selectedSequence.length < sequence.length){
			selectedSequence.push(element)

			var response = {
				"id":0,
				"counter":selectedSequence.length,
				"total":sequence.length,
			}

			if(selectedSequence[selectedSequence.length-1]
						!= elements[sequence[selectedSequence.length-1]]){

				response["id"] = -1
				return response
			}

			if (selectedSequence.length == sequence.length){
				response["id"] = 1;
				return response
			}

			response["id"] = 0
			return response
		}
	}

	/**
	* Prepares the initial configuration
	* @param {Object} config
	**/
	function init(config){
		elements = config.elements
		initialValue = config.initialValue || 3

		// remove 1 from initial value because later
		// we will increase it on the play event
		for (var i=0; i<initialValue-1; i++){
			sequence.push(randomize(0, elements.length))
		}
	}

	return {
		"Element" : Element,
		"init" : init,
		"play" : play,
		"select": select,
		"getTotal": getTotal,
		"getScore": getScore
	}
})();