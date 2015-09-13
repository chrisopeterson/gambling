//
// State.js - manages game state and business logic
//

"use strict";

// Establish namespace
window.App.State = window.App.State || {};

// Global state variables
//
App.State.Users = [];
App.State.Point = null;
App.State.Board = [];

App.State.Init = function() {

	// Add one player
	App.State.Users.push(new Player("Default", 1000));
	
	// Setup bets players can make
	App.State.Board.push(new TablePosition("Pass Line", 1));
	App.State.Board.push(new TablePosition("Don't Pass Line", 1));
};
