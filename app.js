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
	
	// Begin Game Loop
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
    
    // Trigger any mouseMove events
    App.UI.DetectMouseMove(e);
}

function event_MouseUp(e) {
	App.UI.DetectClick(e);
}