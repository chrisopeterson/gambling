//
// App.js - Primary application control
//

"use strict";

// Establish namespace
window.App = window.App || {};

App.Init = function(canvas) {
	
	//Set global vars
	App.Draw_CTX = canvas.getContext('2d');
    App.Draw_CTX.font = '20px Arial';
	App.MouseX = 0;
	App.MouseY = 0;
	
	// Initialize game state
	App.State.Init();
	
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
    
    // Trigger any mouse movement events
    App.UI.DetectMouseMove(e);
    App.UI.DetectMouseLeave(e);
}

function event_MouseUp(e) {
	App.UI.DetectClick(e);
}