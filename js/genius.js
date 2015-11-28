/*
* Genius core
* @author L. Mazzetto
* @version 0.5
* @module
*/
var Genius = (function(){

	var audioCpt = new Gaudio(document.getElementById("audiocpt"))


	// elements that were created
	var elements = [],
	 	sequence = [],
	 	selectedSequence = [],
	 	score = 0;

	 var notes = {
	 	"b1": "C2",
	 	"b2": "G1",
	 	"b3": "E1",
	 	"b4": "C1",
	 }

	 var notesSequences = {
	 	0: "C2",
	 	1: "G1",
	 	2: "E1",
	 	3: "C1",
	 }

	/**
	* A constructor of genius element
	* @constructor
	**/
	function Element(dom, callback){
		var self = this
		this.DOM = dom
		this.callback = callback
		this.audio = new Gaudio(document.getElementById("audio"+this.DOM.id))

	}

	/**
	* Highlights the element who was clicked and
	* sends a callback to a class that is controlling the element
	**/
	Element.prototype.click = function(){
		var self = this
		this.callback(this)
		this.DOM.classList.add("clicked")
		this.playNotes(notes[self.DOM.id])
		setTimeout(function(){
			self.DOM.classList.remove("clicked")
		},100)

	}

	Element.prototype.playNotes = function(val){
		this.audio.playNote(val,false)
	}

	Element.prototype.active = function(isActive){
		var self = this;

		if(isActive){
			// mouse down
			this.DOM.onclick = function(e){
				e.preventDefault
				self.click(self)
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
		return sequence.length + 1;
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
		sequence = shuffle(sequence)
	};

	/**
	* shuffle array function
	**/
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

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

				//console.log(index)

				audioCpt.playNote(notesSequences[sequence[index]])
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
