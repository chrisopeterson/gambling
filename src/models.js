//
// Models.js - Define all the models
//

"use strict";

// Establish namespace
window.App = window.App || {};
window.App.Models = window.App.Models || {};

// Classes
//

// Player class
// Describes a player with chips/current bets

class Player {
	constructor(name, bankroll) {
		this.Name = name;
		this.Bankroll = bankroll;
	};
}

// Describes a position on that table that users can wager
class TablePosition {
	constructor(name, payout) {
		this.Name = name;
		this.Payout = payout;
	}
}