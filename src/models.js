//
// Models.js - Define all the models
//

// Establish namespace
window.App = window.App || {};

App.Shape = function(x, y, height, width, fill, fillText, func) {
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.fill = fill || '#AAAAAA';
	this.fillText = fillText;
	this.fnUpdate = func == null ? function() { } : func;
}

// Shape w. border
App.BorderShape = function(x, y, height, width, fill, borderFill, borderSize, fillText, func) {
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.fill = fill || '#AAAAAA';
	this.borderFill = borderFill;
	this.borderSize = borderSize;
	this.fillText = fillText;
	this.fnUpdate = func == null ? function() { } : func;
}

// Shape functions
App.Shape.prototype.draw = function(drawingContext) {
	this.fnUpdate();
	drawingContext.fillStyle = this.fill;
	drawingContext.fillRect(this.x, this.y, this.width, this.height);
	drawingContext.fillText(this.fillText, this.x, this.y);
}

App.BorderShape.prototype.draw = function(drawingContext) {
	this.fnUpdate();
	
	drawingContext.strokeStyle = this.borderFill;
    drawingContext.lineWidth   = this.borderSize;
    drawingContext.strokeRect(10,10, 100,100);
    drawingContext.fillText(this.fillText, this.x, this.y);

}
