//
// State.js - handles state management
//

// Establish namespace
window.App = window.App || {};

// Objects to draw tracking
App.DrawObjects = [];

App.AddDrawObject = function(name, obj) {
	App.DrawObjects.push(obj);
}