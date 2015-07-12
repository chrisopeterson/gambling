//
// UI.js - provides objects for drawing and builds the base interface
//

"use strict";

// Establish namespace
window.App.UI = window.App.UI || {};

// List of all objects to draw
//
// Objects to draw tracking
App.UI.DrawObjects = [];

App.UI.AddDrawObject = function(name, obj) {
	App.UI.DrawObjects.push(obj);
}

// Function to draw all the objects in the DrawObject array
//
App.UI.Draw = function() {

	// clear everything and redraw
	var ctx = App.Draw_CTX;
	ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

	for(let i = 0; i < App.UI.DrawObjects.length; i++) {

		var s = App.UI.DrawObjects[i];

		s.draw(ctx);
	}
};

//
// Draw the initial interface
//
App.UI.PrepInterface = function() {

	// Green Background
	let bg = new UI_Rectangle(0, 0, 500, 500, '#478d47', null, null);
	App.UI.AddDrawObject("background", bg);
	
	// x/y coordinates for dev use
	let xy_track = function() { this.fillText = "x: " + App.MouseX + " y: " + App.MouseY; };
	let track = new UI_Rectangle(440, 12, 0, 0, null, 'none', xy_track);
	App.UI.AddDrawObject("tracking", track);
	
	// Pass line
	let passLine = new UI_RectangleBorder(10, 400, 480, 50, null, '#ffffff', 2, 'Pass Line', null);
	App.UI.AddDrawObject("passline", passLine);
	
	//  Draw
	App.UI.Draw();
};



//
// UI pieces classes/functions
//

// Was unable to figure out how to get the drawing to run in the parent class so each
// UI piece has to draw everything.

// Base class for all shapes
class UI_Shape {
	constructor(x, y, width, height, func) {
		this.XPosition = x || 0;
		this.YPosition = y || 0;
		this.Width = width || 0;
		this.Height = height || 0;
		// Function to attach to the shape
		this.fnUpdate = func == null ? function() { } : func;
	}
}


class UI_Rectangle extends UI_Shape {
	constructor(x, y, width, height, fill, fillText, func) {
		super(x, y, width, height, func);

		this.fill = fill || 'rgba(255, 0, 0, 0)'; // fill color or transparent
		this.fillText = fillText || '';
	}
	draw(drawingContext) {
		this.fnUpdate();
		drawingContext.fillStyle = this.fill;
		drawingContext.fillRect(this.XPosition, this.YPosition, this.Width, this.Height);
		drawingContext.fillStyle = '#000000'; // for black text
		drawingContext.fillText(this.fillText, this.XPosition, this.YPosition);
	}
}

class UI_RectangleBorder extends UI_Rectangle {
	constructor(x, y, width, height, fill, borderFill, borderSize, fillText, func) {
		super(x, y, width, height, fill, fillText, func);
		
		this.borderFill = borderFill;
		this.borderSize = borderSize;
	}
	draw(drawingContext) {
		
		this.fnUpdate();
		drawingContext.fillStyle = this.fill;
		drawingContext.fillRect(this.XPosition, this.YPosition, this.Width, this.Height);
		drawingContext.fillStyle = '#000000'; // for black text
		drawingContext.fillText(this.fillText, this.XPosition, this.YPosition + 12); // Add padding to text
		
		drawingContext.strokeStyle = this.borderFill;
		drawingContext.lineWidth   = this.borderSize;
    	drawingContext.strokeRect(this.XPosition, this.YPosition, this.Width, this.Height);
	}
}
