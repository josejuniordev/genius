(function(){

	// creates the elements with a callback event
	var elements = [
		new Element(document.getElementById("b1"), elementClickCallbackEvent),
		new Element(document.getElementById("b2"), elementClickCallbackEvent),
		new Element(document.getElementById("b3"), elementClickCallbackEvent),
		new Element(document.getElementById("b4"), elementClickCallbackEvent)
	]

	/*
	* Callback event of an element, this event is triggered on click
	* @callback
	*/
	function elementClickCallbackEvent(element){
		var counter = document.getElementById("counter-number")
		response = Genius.select(element)

		// gets the response from genius core
		switch(response.id){
			case -1:
				alert("Você errou.")
				setElementsAsActive(false)
				break
			case 0:
				console.log("Ok.")
				counter.innerHTML = response.counter
				break
			case 1:
				alert("Proximo.");
				counter.innerHTML = response.counter
				addPlayEvent()
				break
		}
	}

	/*
	* Updates the score of the game
	*/
	function updateScore(){
		var total = document.getElementById("counter-total")
		var score = document.getElementById("score-number")

		// get the values from genius core
		total.innerHTML = Genius.getTotal()
		score.innerHTML = Genius.getScore()
	}

	/*
	* Function to enable or disable all elements from genius
	* @param {Boolean} enable
	*/
	function enableElements(enable){
		for (var i = 0; i<elements.length; i++){
			var element = elements[i]
			element.active(enable)
		}
	}

	/*
	* Removes the play event
	*/
	function removePlayEvent(){
		document.getElementById("play").removeEventListener("click", play)
		document.getElementById("play").classList.remove("active")
		updateScore()
	}

	/*
	* Adds the play event
	*/
	function addPlayEvent(){
		document.getElementById("play").addEventListener("click", play)
		document.getElementById("play").classList.add("active")
		enableElements(false)
	}

	/*
	*
	*/
	function play(){
		var counter = document.getElementById("counter-number")
		counter.innerHTML = 0 // resets the counter
		removePlayEvent() // removes play event
		enableElements(false)

		// inits the round and trigger a callback to enable all
		// elements when the animation was ended.
		Genius.play(function(){
			enableElements(true)
		})

		updateScore()
	}

	// initial configuration
	Genius.init({
		elements : elements
	})

	// ready to play :)
	addPlayEvent()
})()
