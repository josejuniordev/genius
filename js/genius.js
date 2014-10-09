var Genius = (function(){

	var elements = [

	];

	var sequence = [];
	var selectedSequence = [];
	var score = 0;

	function getScore(){
		return score;
	};

	function getTotal(){
		return sequence.length;
	};

	/**
	* Generates a random number from an initial
	* value and a final value
	**/
	function randomize(initial_value, final_value){
		return Math.floor(Math.random() * final_value) + initial_value;
	};

	/**
	*
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
			selectedSequence.push(element);

			var response = {
				"id":0,
				"counter":selectedSequence.length,
				"total":sequence.length,
			};

			if(selectedSequence[selectedSequence.length-1]
						!= elements[sequence[selectedSequence.length-1]]){

				response["id"] = 0;
				return response
			}

			if (selectedSequence.length == sequence.length){
				response["id"] = 2;
				return response;
			}

			response["id"] = 1;
			return response;
		}
	};

	/**
	* Prepares the initial configuration
	**/
	function init(config){
		elements = config.elements;
		initialValue = config.initialValue || 2;

		for (var i=0; i<initialValue; i++){
			sequence.push(randomize(0,elements.length));
		}
	};

	return {
		"init" : init,
		"play" : play,
		"select": select,
		"getTotal": getTotal,
		"getScore": getScore
	}
})();