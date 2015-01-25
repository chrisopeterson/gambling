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
	s = new App.Shape(10,10, 20, 20, null);
	s.draw(ctx);
};


App.Draw = function() {

	var ctx = App.Draw_CTX;
	ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw coordinates
    var s = new App.Shape(30, 30, 100, 100, '#000000', "x: " + this.MouseX + " y: " + this.MouseY);
	s.draw(ctx);
};

App.GameLoop = function() {
    window.requestAnimationFrame(App.GameLoop);
    
    /* left off here with refactoring and adding gameloop
    now need to add the game logic updating function */
    
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