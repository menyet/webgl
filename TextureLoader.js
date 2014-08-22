function Texture(fileName) {
	this.fileName = fileName;
	this.texture = 0;
	
	this.loadTexture();
}

Texture.prototype.handleLoadedTexture = function () {
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.bindTexture(gl.TEXTURE_2D, null);
};

Texture.prototype.loadTexture = function () {
	this.texture = gl.createTexture();
	this.texture.image = new Image();
	
	var myself = this;
	
	this.texture.image.onload = function () {
		myself.handleLoadedTexture();
	}
	this.texture.image.src = this.fileName;
};