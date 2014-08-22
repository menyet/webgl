

var keys = {
	currentlyPressedKeys: {},
	
    handleKeyDown: function (event) {
		this.currentlyPressedKeys[event.keyCode] = true;
	},
	
	handleKeyUp: function (event) {
		this.currentlyPressedKeys[event.keyCode] = false;
	}
};

