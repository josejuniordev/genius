(function(){


	// creates the elements with a callback event
	var elements = [
		new Genius.Element(document.getElementById("b1"), elementClickCallbackEvent),
		new Genius.Element(document.getElementById("b2"), elementClickCallbackEvent),
		new Genius.Element(document.getElementById("b3"), elementClickCallbackEvent),
		new Genius.Element(document.getElementById("b4"), elementClickCallbackEvent)
	]
	, $btnPlay = document.getElementById("play")
	,$controls = document.getElementById("controls")
	, oldPlayValue = $btnPlay.innerHTML
	, delayPlay = 1000; // milisegundos



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
				setTimeout(function(){
					$controls.classList.remove("playing")
					addBtnLabel("Você errou.")
				}, 800)

				setElementsAsActive(false)
				break
			case 0:
				//addBtnLabel("OK")
				counter.innerHTML = response.counter
				break
			case 1:
				counter.innerHTML = response.counter
				setTimeout(function(){
					$controls.classList.remove("playing")
					addBtnLabel("Próximo")
				}, 800)

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
		$btnPlay.removeEventListener("click", play)
		$btnPlay.classList.remove("active")
		updateScore()
	}

	/*
	* Adds the play event
	*/
	function addPlayEvent(){
		$btnPlay.addEventListener("click", play)
		$btnPlay.classList.add("active")
		enableElements(false)
	}

	/*
	*
	*/
	function addBtnLabel(label){
		$btnPlay.innerHTML = label;
	}

	/*
	*
	*/
	function play(){
		var counter = document.getElementById("counter-number")
		counter.innerHTML = 0 // resets the counter
		removePlayEvent() // removes play event
		enableElements(false)

		$controls.classList.add("playing")
		addBtnLabel("")


		// inits the round and trigger a callback to enable all
		// elements when the animation was ended.

		setTimeout(function(){
			Genius.play(function(){
				enableElements(true)
			})
		}, delayPlay)


		console.log("play");

		updateScore()
	}

	// initial configuration
	Genius.init({
		elements : elements
	})

	// ready to play :)
	addPlayEvent()
})()
