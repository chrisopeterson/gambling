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
	App.UI.DrawObjects.push({ "key": name, "value": obj });
}

// Function to draw all the objects in the DrawObject array
//
App.UI.Draw = function() {

	// clear everything and redraw
	var ctx = App.Draw_CTX;
	ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

	for(var i = 0; i < App.UI.DrawObjects.length; i++) {

		var s = App.UI.DrawObjects[i].value;

		s.draw(ctx);
	}
};

//
// Load initial interface pieces
//
App.UI.PrepInterface = function() {

	// Green Background
	var bg = new UI_Rectangle(0, 0, 500, 500, '#478d47', null, null);
	App.UI.AddDrawObject("background", bg);
	
	// x/y coordinates for dev use
	var track_events = {
		"mouseMove" : function(obj) { obj.fillText = "x: " + App.MouseX + " y: " + App.MouseY }
	}
	
	var track = new UI_Rectangle(440, 12, 0, 0, null, 'none', track_events);
	App.UI.AddDrawObject("tracking", track);
	
	/*
	// Pass line
	var pass_events = {
		"mouseMove" : function(obj) { obj.fillText = "Pass Line - Hover" },
		"mouseLeave" : function(obj) { obj.fillText = "Pass Line - Leave"},
		"onClick" : function(obj) { obj.Parent.MakeBet() }
	}
	
	var passLine = new UI_RectangleBorder(10, 400, 480, 40, null, '#ffffff', 2, 'Pass Line', pass_events);
	App.UI.AddDrawObject("passline", passLine);
	
	// Dont Pass Line
	var dontPassLine = new UI_RectangleBorder(10, 350, 480, 40, null, '#ffffff', 2, 'Don\'t Pass Line', null);
	App.UI.AddDrawObject("dontPassline", dontPassLine);
	*/
	
	// There has to be a link between the UI and the model. I need to have a controller or similar structure
	// To instantiate the models, instantiate the UI, and link the UI pieces to the models so I can pass_events
	// info between them.
	// Right now the UI and models are totally separate and can't interact.
	
	//  Draw
	App.UI.Draw();
};


//
// UI Event Handling
//
App.UI.DetectClick = function(e) {
	
	// Loop through draw objects and detect which ones were clicked on
	for(var i = 0; i < App.UI.DrawObjects.length; i++) {
		var obj = App.UI.DrawObjects[i].value;
		var key = App.UI.DrawObjects[i].key;
		
		// Skip if object does not subscribe to click event
		if(obj.Events["onClick"] == null) { continue; }
		
		// Based on position and size, was the object clicked on?
		if(detectCollision(App.MouseX, App.MouseY, obj.XPosition, obj.YPosition, obj.Width, obj.Height))
		{
			obj.Events.onClick(obj);
		}
	}
}

App.UI.DetectMouseMove = function(e) {
	// Loop through draw objects and detect which ones respond to the mouseMove event
	for(var i = 0; i < App.UI.DrawObjects.length; i++) {
		var obj = App.UI.DrawObjects[i].value;
		var key = App.UI.DrawObjects[i].key;
		
		// Skip if object does not subscribe to event
		if(obj.Events["mouseMove"] == null) { continue; }
		
		// Detect if object is where the mouse is
		if(detectCollision(App.MouseX, App.MouseY, obj.XPosition, obj.YPosition, obj.Width, obj.Height)
			|| key == "tracking") // ignore tracking for debugging purposes
		{
			obj.IsHovered = true;
			obj.Events.mouseMove(obj);
		}
	}
}

App.UI.DetectMouseLeave = function(e) {
	// Loop through draw objects and detect which ones respond to the event
	for(var i = 0; i < App.UI.DrawObjects.length; i++) {
		var obj = App.UI.DrawObjects[i].value;
		var key = App.UI.DrawObjects[i].key;
		
		// Skip if object does not subscribe to event
		if(obj.Events["mouseLeave"] == null) { continue; }
		
		// Skip is object is not currently hovered over
		if(!obj.IsHovered) { continue; }
		
		// Detect if mouse is outside the object and it used to be hovered over
		if(!detectCollision(App.MouseX, App.MouseY, obj.XPosition, obj.YPosition, obj.Width, obj.Height))
		{
			obj.IsHovered = false;
			obj.Events.mouseLeave(obj);
		}
	}
}

function detectCollision(x,y, objectx, objecty, objectwidth, objectheight) {
	if(x > objectx && x < objectx + objectwidth) {
		if(y >  objecty && y < objecty + objectheight) {
			return true;
		}
	}
	return false;
}


//
// UI pieces classes/functions
//

// Was unable to figure out how to get the drawing to run in the parent class so each
// UI piece has to draw everything...

// Base class for all shapes
class UI_Shape {
	constructor(x, y, width, height, events) {
		this.XPosition = x || 0;
		this.YPosition = y || 0;
		this.Width = width || 0;
		this.Height = height || 0;
		// Attach events to the object
		this.Events = events == null ? Object.create(null) : events;
		this.IsHovered = false;
	}
}


class UI_Rectangle extends UI_Shape {
	constructor(x, y, width, height, fill, fillText, events) {
		super(x, y, width, height, events);

		this.fill = fill || 'rgba(255, 0, 0, 0)'; // fill color or transparent
		this.fillText = fillText || '';
	}
	draw(drawingContext) {
		drawingContext.fillStyle = this.fill;
		drawingContext.fillRect(this.XPosition, this.YPosition, this.Width, this.Height);
		drawingContext.fillStyle = '#000000'; // for black text
		drawingContext.fillText(this.fillText, this.XPosition, this.YPosition);
	}
}

class UI_RectangleBorder extends UI_Rectangle {
	constructor(x, y, width, height, fill, borderFill, borderSize, fillText, events) {
		super(x, y, width, height, fill, fillText, events);
		
		this.borderFill = borderFill;
		this.borderSize = borderSize;
	}
	draw(drawingContext) {
		
		drawingContext.fillStyle = this.fill;
		drawingContext.fillRect(this.XPosition, this.YPosition, this.Width, this.Height);
		drawingContext.fillStyle = '#000000'; // for black text
		drawingContext.fillText(this.fillText, this.XPosition, this.YPosition + 12); // Add padding to text
		
		drawingContext.strokeStyle = this.borderFill;
		drawingContext.lineWidth   = this.borderSize;
    	drawingContext.strokeRect(this.XPosition, this.YPosition, this.Width, this.Height);
	}
}
