var gl;

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }
	
	

	
	var camPosX = 0;
	var camPosY = 0;
	
	var minCamX = 0;
	var maxCamX = 0;
	var minCamY = 0;
	var maxCamY = 0;
	
	var playerTileX = 0;
	var playerTileY = 0;

	var walls;
	
    function drawScene() {
		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		mat4.perspective(pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

		mat4.identity(mvMatrix);
		
		mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -10.0]);
		
		mat4.translate(mvMatrix, mvMatrix, [-camPosX, -camPosY, 0.0]);

		objects.forEach(function(object) {
			object.Draw(mat4.clone(mvMatrix));
		});
    }


    var lastTime = 0;

	function animate() {
		var timeNow = new Date().getTime();
		if (lastTime != 0) {
			var elapsed = timeNow - lastTime;

			objects[0].xRot += (90 * elapsed) / 10000.0;
			objects[0].yRot += (90 * elapsed) / 10000.0;
			objects[0].zRot += (90 * elapsed) / 10000.0;
			
			
			var camMoveSpeed = 0.005;
			
			
			var playerX = player.posX;
			var playerY = player.posY;
			
			//LEFT
			if (keys.currentlyPressedKeys[37]) {
				playerX -= elapsed * camMoveSpeed;
			}
			
			//RIGHT
			if (keys.currentlyPressedKeys[39]) {
				playerX += elapsed * camMoveSpeed;
			}
			
			//UP
			if (keys.currentlyPressedKeys[38]) {
				playerY += elapsed * camMoveSpeed;
			}
			
			//DOWN
			if (keys.currentlyPressedKeys[40]) {
				playerY -= elapsed * camMoveSpeed;
			}
			
			
			
			var newPlayerTileX = Math.floor(playerX + 0.5);
			var newPlayerTileY = Math.floor(playerY + 0.5);
			
			if (!walls[newPlayerTileX][newPlayerTileY] || walls[playerTileX][playerTileY]) {
			
				playerTileX = newPlayerTileX;
				playerTileY = newPlayerTileY;
				
				player.posX = playerX;
				player.posY = playerY;
			}
				
			
			playerHighlight.posX = playerTileX;
			playerHighlight.posY = playerTileY;
			
			if (player.posX - camPosX > 2) {
				camPosX = player.posX - 2;
			}
			
			if (player.posX - camPosX < -2) {
				camPosX = player.posX + 2;
			}
			
			if (player.posY - camPosY > 1.5) {
				camPosY = player.posY - 1.5;
			}
			
			if (player.posY - camPosY < -1.5) {
				camPosY = player.posY + 1.5;
			}
			
			if (walls[playerTileX][playerTileY]) {
				player.posZ = 2;
			} else {
				player.posZ = 1;
			}
			
			
			camPosX = Math.max(minCamX, camPosX);
			camPosX = Math.min(maxCamX, camPosX);
			camPosY = Math.max(minCamY, camPosY);
			camPosY = Math.min(maxCamY, camPosY);
		}
		lastTime = timeNow;
	}


    function tick() {
        requestAnimFrame(tick);
        drawScene();
        animate();
    }


	function handleKeyDown(event) {
	
		if (event.keyCode == 32) {
				var wall = getCube();
				
					wall.texture = new Texture("wall.jpg");
					wall.rotY = 1.5;
					wall.posX = playerTileX;
					wall.posY = playerTileY;
					wall.posZ = 1;
				
					wall.scale = 0.5;
					
					walls[playerTileX][playerTileY] = true;
				
					objects.push(wall);			
			}
	
		keys.handleKeyDown(event);
		return false;
	}

	function handleKeyUp(event) {
		keys.handleKeyUp(event);
		return false;
	}
	
	function handleMouseDown(event) {
		mouse.handleMouseDown(event);
		return false;
	}

	function handleMouseUp(event) {
		mouse.handleMouseUp(event);
		return false;
	}

	function handleMouseMove(event) {
		mouse.handleMouseMove(event);
		return false;
	}
	
	var objects = [];
	
	var player;
	var playerHighlight;
	
	function webGLStart() {
		var canvas = document.getElementById("canvas");
		initGL(canvas);
		initShaders();
		
		player = getCube();
		player.texture = new Texture("companion.png");
		player.scale = 0.2;
		player.posX = 3;
		player.posY = 3;
		player.posZ = 1;
		objects.push(player);
		
		playerHighlight = getSquare();
		playerHighlight.texture = new Texture("highlight.png");
		//playerHighlight.posZ = 0.1;
		playerHighlight.scale = 0.5;
		objects.push(playerHighlight);
		
		walls = new Array(20);
		
		for (var x = 0; x < 20; x++) {
		
			walls[x] = new Array(20);
		
			for (var y = 0; y < 20; y++) {
				var object = getSquare();
				
				object.texture = new Texture("grass2.png");
				
				object.posX = x;
				object.posY = y;
				
				object.scale = 0.5;
				
				objects.push(object);
				
				walls[x][y] = false;
				
				
				if (x == 0 || x == 19 || y == 0 || y == 19) {
					var wall = getCube();
				
					wall.texture = new Texture("wall.jpg");
					wall.rotY = 1.5;
					wall.posX = x;
					wall.posY = y;
					wall.posZ = 1;
				
					wall.scale = 0.5;
				
					objects.push(wall);				
					
					walls[x][y] = true;
				}
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		minCamX = 2;
		maxCamX = 16;
		
		minCamY = 1.5;
		maxCamY = 16.5;
		
		
		
		
		//keys.init();
		
		document.onkeydown = handleKeyDown;
		document.onkeyup = handleKeyUp;

		canvas.onmousedown = handleMouseDown;
		document.onmouseup = handleMouseUp;
		document.onmousemove = handleMouseMove;

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);

		tick();
    }
