/**
* A constructor of genius element
* @constructor
**/
var Element = function(dom, callback){
	var self = this;
	this.DOM = dom;
	this.callback = callback
};

/**
* Highlights the element who was clicked and
* sends a callback to a class that is controlling the element
**/
Element.prototype.click = function(){
	this.highlight(function(){})
	this.callback(this);

	// TODO: remove the highlight and add another class
	// when the user clicks
};

Element.prototype.active = function(isActive){
	var self = this;

	if(isActive){
		this.DOM.onclick = function(){ self.click(self) };
		this.DOM.classList.add("active");
	} else {
		this.DOM.onclick = function(){}
		this.DOM.classList.remove("active");
	}
};

Element.prototype.hide = function(callback){
	this.DOM.classList.remove("highlight");
	callback();
};

Element.prototype.highlight = function(callback){
	// if(this.DOM.className.match(/highlight/g){
	this.DOM.classList.add("highlight");
	// }

	var self = this;

	setTimeout(function(){ self.hide(callback) }, 500);
};
