
function Object() {
	this.cubeVertexPositionBuffer = 0;
	this.cubeVertexTextureCoordBuffer = 0;
	this.cubeVertexIndexBuffer = 0;
	
	this.xRot = 0;
	this.yRot = 0;
	this.zRot = 0;
	
	this.posX = 0;
	this.posY = 0;
	this.posZ = 0;
	
	this.scale  = 1.0;
	
	this.texture = 0;
}


Object.prototype.initBuffers = function (vertices, textureCoords, vertexIndices) {
	this.cubeVertexPositionBuffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	this.cubeVertexPositionBuffer.itemSize = 3;
	this.cubeVertexPositionBuffer.numItems = vertices.length;

	this.cubeVertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexTextureCoordBuffer);
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
	this.cubeVertexTextureCoordBuffer.itemSize = 2;
	this.cubeVertexTextureCoordBuffer.numItems = length;

	this.cubeVertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
	
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
	this.cubeVertexIndexBuffer.itemSize = 1;
	this.cubeVertexIndexBuffer.numItems = vertexIndices.length;
}

Object.prototype.Draw = function(matrix) {
		mat4.translate(matrix, matrix, [this.posX, this.posY, this.posZ]);


        mat4.rotate(matrix, matrix, degToRad(this.xRot), [1, 0, 0]);
        mat4.rotate(matrix, matrix, degToRad(this.yRot), [0, 1, 0]);
        mat4.rotate(matrix, matrix, degToRad(this.zRot), [0, 0, 1]);
		
		mat4.scale(matrix, matrix, [this.scale, this.scale, this.scale]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.texture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVertexIndexBuffer);
        setMatrixUniforms(matrix);
        gl.drawElements(gl.TRIANGLES, this.cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }