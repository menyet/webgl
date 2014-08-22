var mouse = {
	mouseDown: false,

	handleMouseDown: function (event) {
		this.mouseDown = true;
		this.lastMouseX = event.clientX;
		this.lastMouseY = event.clientY;
	},

	handleMouseUp: function (event) {
		this.mouseDown = false;
	},

	handleMouseMove: function (event) {
		if (!this.mouseDown) {
			return;
		}
		var newX = event.clientX;
		var newY = event.clientY;

		var deltaX = newX - this.lastMouseX;
		var newRotationMatrix = mat4.create();
		mat4.identity(newRotationMatrix);
		mat4.rotate(newRotationMatrix, degToRad(deltaX / 10), [0, 1, 0]);

		var deltaY = newY - this.lastMouseY;
		mat4.rotate(newRotationMatrix, degToRad(deltaY / 10), [1, 0, 0]);

		mat4.multiply(newRotationMatrix, moonRotationMatrix, moonRotationMatrix);

		this.lastMouseX = newX
		this.lastMouseY = newY;
	}
}