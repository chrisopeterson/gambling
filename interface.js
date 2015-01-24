function init(canvas) {

	var canvasContext = canvas.getContext('2d');

	// Wire up mouse event handlers
	//canvas.onmousedown = event_MouseDown;
	//canvas.onmouseup = event_MouseUp;
	canvas.onmousemove = event_MouseMove;

	createInterface(canvasContext);
};

function createInterface(ctx) {
	
	s = new Shape(10,10, 20, 20, null);
	s.draw(ctx);

	// left off here with adding the new shape array.
	App.Shapes.push(s);
};

//
// Handle Canvas events
//
function event_MouseMove(e) {
	var element = this;
    var offsetX = 0;
    var offsetY = 0;
 
    // Calculate offsets
    if (element.offsetParent) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }  
     
    // Calculate the mouse location
    var mouseX = e.pageX - offsetX;
    var mouseY = e.pageY - offsetY;


    var ctx = this.getContext('2d');

    // Clear the context then draw new coordinates
    ctx.clearRect(0,0, this.width, this.height);

    Coordinates(mouseX, mouseY, ctx);
}

//
// Define Classes needed for drawing the interface
//

function Coordinates(x,y,ctx) {
	// add coordinate track just for fun eh

	var s = new Shape(30, 30, 100, 100, '#000000', "x: " + x + " y: " + y);

	s.draw(ctx);
}

// Shape constructor
function Shape(x, y, height, width, fill, fillText='') {
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 1;
	this.height = height || 1;
	this.fill = fill || '#AAAAAA';
	this.fillText = fillText;
}
// Shape functions
Shape.prototype.draw = function(drawingContext) {
	drawingContext.fillStyle = this.fill;
	drawingContext.fillRect(this.x, this.y, this.width, this.height);
	drawingContext.fillText(this.fillText, this.x, this.y);
}
//
// Need to refactor this to make it better
// Basically the next thing I want to do is have the x and y coordinates in the right corner and
// have them constantly updated just as a for fun thing and useful later for debugging purposes.
//
// After thinking about this, i need a bigger refactor here. Need to organize a better redraw
// system so any updates are auto redrawn based on the saved shapes.