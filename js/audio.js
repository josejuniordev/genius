var Gaudio = function(obj){
	var a = obj
	,end = 0
	,scale = {
		'C1': [0, 0.4],
		'C1d': [1, 1.4],
		'D1': [2, 2.4],
		'E1b': [3, 3.4],
		'E1': [4, 4.4],
		'F1': [5, 5.4],
		'F1d': [6, 6.4],
		'G1': [7, 7.4],
		'G1d': [8, 8.4],
		'A1': [9, 9.4],
		'B1b': [10, 10.4],
		'B1': [11, 11.4],
		'C2': [12, 12.4],
		'C2d': [13, 13.4],
		'D2': [14, 14.4],
		'E2b': [15, 15.4],
		'E2': [16, 16.4],
		'F2': [17, 17.4],
		'F2d': [18, 18.4],
		'G2': [19, 19.4],
		'G2d': [20, 20.4],
		'A2': [21, 21.4],
		'B2b': [22, 22.4],
		'B2': [23, 23.4]
	}
	,self = this;

	this.playNote = function(note, el){


		if(scale[note]){


			try{

				this.pauseNote();
				a.currentTime = scale[note][0];

				a.play();

				setTimeout(function(){
					self.pauseNote();
					a.currentTime = scale[note][0];
				},800)
			}
			catch(error){
				if(console && console.log){
					console.warn("Error "+error);
				}
			}
		}
		return false;

	}

	this.pauseNote = function(){
		a.pause();
	}

}
