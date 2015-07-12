//
// App.js - Primary application control
//

"use strict";

// Establish namespace
window.App = window.App || {};

App.Init = function(canvas) {
	
	//Set global vars
	App.Draw_CTX = canvas.getContext('2d');
	App.MouseX = 0;
	App.MouseY = 0;
	
	// Set Global Event Handling
	canvas.onmousemove = event_MouseMove;
	canvas.onmouseup = event_MouseUp;

	// Draw initial interface
	App.UI.PrepInterface();
	
	// Begin Running Game Loop
	App.GameLoop();
	
};

function createInterface(ctx) {
	
	App.UI.DrawInterface();
	
};


App.UpdateGameState = function() {
	
	// TODO

}

App.GameLoop = function() {
    window.requestAnimationFrame(App.GameLoop);
    
    App.UpdateGameState();
    App.UI.Draw();
}


//
// Handle Canvas level events
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
    App.MouseX = e.pageX - offsetX;
    App.MouseY = e.pageY - offsetY;
}

function event_MouseUp(e) {

	// LEFT OFF HERE
	// need to create a hit test function here just as a first step.
	// Basic order of operations would be...
	// 1. Handle click event - done
	// 2. Check the Application Draw objects array and determine if the object is at the x/y point clicked
	// 3. Send 'clicked' event to that object and handle whatever action is needed there. 

	//alert('position is x:' +  App.MouseX + ' Y:' + App.MouseY);
}