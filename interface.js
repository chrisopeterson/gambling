function init(canvas) {

	var canvasContext = canvas.getContext('2d');

	createInterface(canvasContext);
};

function createInterface(ctx) {
	
	s = new Shape(10,10, 20, 20, null);
	s.draw(ctx);

	// left off here with adding the new shape array.
	App.Shapes.push(s);
};


//
// Define Classes needed for drawing the interface
//

// Shape constructor
function Shape(x, y, height, width, fill) {
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 1;
	this.height = height || 1;
	this.fill = fill || '#AAAAAA';
}
// Shape functions
Shape.prototype.draw = function(drawingContext) {
	drawingContext.fillStyle = this.fill;
	drawingContext.fillRect(this.x, this.y, this.width, this.height);
}