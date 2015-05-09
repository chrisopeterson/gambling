//
// App.js - Primary application control
//

// Establish namespace
window.App = window.App || {};

App.Init = function(canvas) {
	
	//Set global vars
	App.Draw_CTX = canvas.getContext('2d');
	App.MouseX = 0;
	App.MouseY = 0;
	
	// Set Global Event Handling
	canvas.onmousemove = event_MouseMove;

	// Draw initial interface
	createInterface(App.Draw_CTX);
	
	// Begin Running Game Loop
	App.GameLoop();
	
};

function createInterface(ctx) {

	// background
	bg = new App.Shape(0, 0, 500, 500, '#478d47', null, null);
	App.AddDrawObject("background", bg);

	// Tracking object
	var func = function() { this.fillText = "x: " + App.MouseX + " y: " + App.MouseY; };
	s = new App.Shape(440, 12, 0, 0, '#000000', "none", func);
	App.AddDrawObject("tracking", s);
	
	// build rest of interface.
	var passLine = new App.BorderShape(10, 300, 50, 300, null, '#ffffff', 2, 'Pass Line', null);
	App.AddDrawObject("passLine", passLine);
};


App.Draw = function() {

	// clear everything and redraw
	var ctx = App.Draw_CTX;
	ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

	for(i = 0; i < App.DrawObjects.length; i++) {

		var s = App.DrawObjects[i];

		s.draw(ctx);
	}

};

App.UpdateGameState = function() {
	
	// left off here - just finalized making the model update itself
	// though I think it needs some refactoring to make it clearer what is going on
	//App.DrawObjects[0] = new App.Shape(30, 30, 100, 100, '#000000', "x: " + this.MouseX + " y: " + this.MouseY);

}

App.GameLoop = function() {
    window.requestAnimationFrame(App.GameLoop);
    
    App.UpdateGameState();
    App.Draw();
}


//
// Event Handlers
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