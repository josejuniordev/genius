// start the game :)
(function(){

	var elements = [
			new Element(document.getElementById("b1"), elementClickCallbackEvent),
			new Element(document.getElementById("b2"), elementClickCallbackEvent),
			new Element(document.getElementById("b3"), elementClickCallbackEvent),
			new Element(document.getElementById("b4"), elementClickCallbackEvent)
		];

	function elementClickCallbackEvent(element){
		var counter = document.getElementById("counter-number");
		response = Genius.select(element);

		switch(response.id){
			case 0:
				console.log("Você errou.");
				setElementsAsActive(false)
				break;
			case 1:
				console.log("Ok.");
				counter.innerHTML = response.counter;
				break;
			case 2:
				console.log("Proximo.");
				counter.innerHTML = response.counter;
				addPlayEvent()
				break;

		}
	};

	function setElementsAsActive(isActive){
		for (var i = 0; i<elements.length; i++){
			var element = elements[i];
			element.active(isActive);
		};
	};

	function updateScore(){
		var total = document.getElementById("counter-total");
		var score = document.getElementById("score-number");

		total.innerHTML = Genius.getTotal();
		score.innerHTML = Genius.getScore();
	};

	function removePlayEvent(){
		document.getElementById("play").removeEventListener("click", play);
		document.getElementById("play").classList.remove("active");
		updateScore();
	};

	function addPlayEvent(){
		document.getElementById("play").addEventListener("click", play);
		document.getElementById("play").classList.add("active");

		setElementsAsActive(false);
	};

	function play(){
		var counter = document.getElementById("counter-number");
		counter.innerHTML = 0;

		removePlayEvent();

		setElementsAsActive(false);

		Genius.play(function(){
			setElementsAsActive(true);
		});

		updateScore();
	};

	Genius.init({
		elements : elements
	});

	addPlayEvent();
})();
