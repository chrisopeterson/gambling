"use strict";

class PointNumber extends UI_RectangleBorder {

	constructor(x, y, width, height, number, events) {
        var fill = "rgba(255, 0, 0, 0)";
        var borderFill = "#ffffff";
        var borderSize = 1;

		super(x, y, width, height, fill, borderFill, borderSize, number, events);

        this.Number = number;
	}
	draw(context) {
		context.fillStyle = this.fill;
		context.fillRect(this.XPosition, this.YPosition, this.Width, this.Height);
		context.fillStyle = '#000000'; // for black text
		context.fillText(this.fillText, (this.XPosition + this.Height/2 - 5), (this.YPosition + this.Width/2 + 5)); // center text
		
		context.strokeStyle = this.borderFill;
		context.lineWidth   = this.borderSize;
    	context.strokeRect(this.XPosition, this.YPosition, this.Width, this.Height);
	}
    
}