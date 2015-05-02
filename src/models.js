//
// Models.js - Define all the models
//

// Establish namespace
window.App = window.App || {};

App.Shape = function(x, y, height, width, fill, fillText) {
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 1;
	this.height = height || 1;
	this.fill = fill || '#AAAAAA';
	this.fillText = fillText;
	this.fnUpdate = function() { this.fillText = "x: " + App.MouseX + " y: " + App.MouseY; };
}

// Shape functions
App.Shape.prototype.draw = function(drawingContext) {
	this.fnUpdate();
	drawingContext.fillStyle = this.fill;
	drawingContext.fillRect(this.x, this.y, this.width, this.height);
	drawingContext.fillText(this.fillText, this.x, this.y);
}

