

function getSquare() {

	var vertices = [
		// Front face
		-1.0, -1.0,  1.0,
		 1.0, -1.0,  1.0,
		 1.0,  1.0,  1.0,
		-1.0,  1.0,  1.0,
	];

var textureCoords = [
	  // Front face
	  0.0, 0.0,
	  1.0, 0.0,
	  1.0, 1.0,
	  0.0, 1.0,
	];
	
	var cubeVertexIndices = [
		0, 1, 2,	  0, 2, 3	// Front face
	];

	var obj = new Object();
	
	obj.initBuffers(vertices, textureCoords, cubeVertexIndices);


	return obj;

}