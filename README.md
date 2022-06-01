***
# Rungether

![diplay](https://user-images.githubusercontent.com/80996046/141610263-82c16730-2a47-4963-af0d-8b7f48f36f56.PNG)
![gameAlone](https://user-images.githubusercontent.com/80996046/141610287-800db5bf-c69b-4c64-9cfe-eb2d5c4815e8.PNG)
![gameTogether](https://user-images.githubusercontent.com/80996046/141610288-56e0bc72-d2ab-48b1-810f-b091a57ed1cb.png)

**Rungether** is the web game developed in JavaScript.<br><br>
It is a project conducted in subject **_Computer Graphics of department of Software of Gachon university._**<br>
***
# Description

**Rungether** is the running game.<br><br>
Player should avoid obstacles while running and do not fall off the lane.<br><br>
The longer the running time, the higher the score, so player can compete for the score.
***
# Features

1. Single mode and double mode
   * In display.html, player can select single mode and double mode. In single mode, user can practice the game and enjoy the game with other players in dual mode.<br><br>
2. control the game with the keyboard
   * Control with a direction key in the single mode. In the double mode, the player is controlled with a direction key and the 'awsd' key. Jump using the ↑ key and w key.<br>
   * When you want to start the game, press the 'enter' key.<br>
   * When you want to pause the game, press the 'p' key.<br><br>
3. Score
   * When the game is over, each scores are printed on the screen.<br><br>
4. Obstacles
   * The player must avoid obstacles through jumping, and if you hits obstacles or the game is over.<br><br>
5. Runner Characters
   * Using threejs, implement 3D model.<br><br>
6. Graphic
   * Through texture mapping, background, obstacles and ground is implemented vividly.<br><br>
7. Ground motion
   * During the game, ground was move left or right cyclically.<br><br>
8. Camera motion
   * Player can adjust the viewpoint.<br>
   * Using the numeric keys from 1 to 5, can change the viewpoint.<br>
   * Using 'q, w, e, a, s, and d' keys, can adjust the viewpoint in detail.<br><br>
9. Background Music
   * During the game, BGM plays so that you can enjoy the game more.<br><br>
***
# Implementation
1. Single mode and double mode
``` html
<a href="gameAlone.html">Alone</a>
<br><br>
<a href="gameTogether.html">Together</a>
```
In double mode, declare two variables such as character, score.<br>
Initialize character & score
``` javascript
character = new rCharacter();
character2 = new rCharacter2();

score = 0;
score2 = 0;
```
User1 is assigned to the left character to operate the character using w, a, and d keys, and user2 is assigned to the right character to operate using the arrow keys.
<br>User1
``` javascript
if (key == w && !paused ) {
                     character.onUpKeyPressed();
                  }
                  if (key == a && !paused  ) {
                     character.onLeftKeyPressed();
                  }
                  if (key == d && !paused  ) {
                     character.onRightKeyPressed();
                  }
```
User2
``` javascript
if (key == up && !paused2 ) {
                     character2.onUpKeyPressed();
                  }
                  if (key == left && !paused2 ) {
                     character2.onLeftKeyPressed();
                  }
                  if (key == right && !paused2 ) {
                     character2.onRightKeyPressed();
                  }
```
2. control the game with the keyboard<br>
Declaration variables
``` javascript
var left = 37;
var up = 38;
var right = 39;
var p = 80;

var w = 87;
var a = 65;
var s = 83;
var d = 68;
var q = 81;
var ee = 69;
```
Pre-assign key codes to variables to handle user key press events
``` javascript
if (!gameOver || !gameOver2) {
               var key = e.keyCode;
               if (keysAllowed[key] === false) return;
```
When the game is running and a keyboard input is received, a function indicating that each key was pressed is called through a function such as onUpKeyPressed().
``` javascript
if (key == w && !paused ) {
                     character.onUpKeyPressed();
                  }
                  if (key == a && !paused  ) {
                     character.onLeftKeyPressed();
                  }
                  if (key == d && !paused  ) {
                     character.onRightKeyPressed();
                  }
                  if (key == up && !paused2 ) {
                     character2.onUpKeyPressed();
                  }
                  if (key == left && !paused2 ) {
                     character2.onLeftKeyPressed();
                  }
                  if (key == right && !paused2 ) {
                     character2.onRightKeyPressed();
                  }
```
The called function adds an item to the queue containing the action to be performed by the character.
``` javascript
this.onLeftKeyPressed = function() {
  self.queuedActions.push("left");
}
this.onUpKeyPressed = function() {
  self.queuedActions.push("up");
}
this.onRightKeyPressed = function() {
  self.queuedActions.push("right");
}
```
If game is running, call update(). <br>
In update function, change the state value of the character variable according to the items put in the queue.
``` javascript
this.update = function() {
      var currentTime = new Date() / 1000;

      if (!self.isJumping &&
         !self.isSwitchingLeft &&
         !self.isSwitchingRight &&
         self.queuedActions.length > 0) {
         switch(self.queuedActions.shift()) {
            case "up":
               self.isJumping = true;
               self.jumpStartTime = new Date() / 1000;
               break;
            case "left":
               if (self.currentLane != -1) {
                  self.isSwitchingLeft = true;
               }
               break;
            case "right":
               if (self.currentLane != 2) {
                  self.isSwitchingRight = true;
               }
               break;
         }
      }
```
3. Score
In loop, score is updated until the game is over.
``` javascript
if (!gameOver) {
	motionValue += 0.1;
	score += 10;
	document.getElementById("score").innerHTML = score;
}
if (!gameOver2) {
	motionValue += 0.1;
	score2 += 10;
	document.getElementById("score2").innerHTML = score2;
}
```
check the real-time update in html
``` html
<div class="stat">
	<label>Score</label>
	<p id="score">0</p>
</div>
```
4. Obstacles<br>
In the case of collision with an obstacle, the x, y, and z values ​​were determined in consideration of the location and size of the tree that was set in advance to set the collision coordinate space. 
``` javascript
this.collides = function(minX, maxX, minY, maxY, minZ, maxZ) {
       var treeMinX = self.mesh.position.x - this.scale * 250;
       var treeMaxX = self.mesh.position.x + this.scale * 250;
       var treeMinY = self.mesh.position.y - this.scale * 1150;
       var treeMaxY = self.mesh.position.y + this.scale * 1150;
       var treeMinZ = self.mesh.position.z - this.scale * 250;
       var treeMaxZ = self.mesh.position.z + this.scale * 250;
       return treeMinX <= maxX && treeMaxX >= minX
          && treeMinY <= maxY && treeMaxY >= minY
          && treeMinZ <= maxZ && treeMaxZ >= minZ;
    }
```
If the coordinate space and the position value of the character match, it is judged that a collision with an obstacle has occurred and true is returned.
``` javascript
function character1CollisionsDetected() {
       var charMinX = runningCharacter.position.x - 115;
 		var charMaxX = runningCharacter.position.x + 115;
 		var charMinY = runningCharacter.position.y - 310;
 		var charMaxY = runningCharacter.position.y + 320;
 		var charMinZ = runningCharacter.position.z - 40;
 		var charMaxZ = runningCharacter.position.z + 40;
 		for (var i = 0; i < objects.length; i++) {
 			if (objects[i].collides(charMinX, charMaxX, charMinY, 
 					charMaxY, charMinZ, charMaxZ)) {
 				return true;
 			}
 		}
 		return false;
    }
    function character2CollisionsDetected() {
       var charMinX2 = runningCharacter2.position.x - 115;
       var charMaxX2 = runningCharacter2.position.x + 115;
       var charMinY2 = runningCharacter2.position.y - 320;
       var charMaxY2 = runningCharacter2.position.y + 320;
       var charMinZ2 = runningCharacter2.position.z - 40;
       var charMaxZ2 = runningCharacter2.position.z + 40;
       for (var i = 0; i < objects2.length; i++) {
          if (objects2[i].collides(charMinX2, charMaxX2, charMinY2, 
                charMaxY2, charMinZ2, charMaxZ2)) {
            return true;
         }
      }
      return false;
   }
```
5. Runner Characters
The characters in the game were added to the scene by downloading the 3D model from sketchfab and using the gltf loader.
And using AnimationMixer, rendered an animation with characters running on.
``` javascript
const loader = new THREE.GLTFLoader();
loader.load('./model2/scene.gltf', function(gltf){
  running = gltf.scene.children[0];
  running.scale.set(4.5,-4.5,4.5);
  running.position.set(-1800,0,-4000);
  scene.add(gltf.scene);
  runningCharacter = running;
  mixer = new THREE.AnimationMixer( gltf.scene );
  var action = mixer.clipAction( gltf.animations[ 0 ] );
  runningaction = action;
  }, undefined, function (error) {
	console.error(error);
});
```
6. Graphic
Images were mapped to the ground and obstacles(tree) using TextureLoader.<br>
- Ground
``` javascript
function createGround(dx, dy, dz, map, x, y, z, notFlatShading) {

	const loader = new THREE.TextureLoader();

    const materials = [
    new THREE.MeshBasicMaterial({map: loader.load('https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=750&w=1260')}),
    new THREE.MeshBasicMaterial({map: loader.load('https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=750&w=1260')}),
    new THREE.MeshBasicMaterial({map: loader.load('https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=750&w=1260')}),
    new THREE.MeshBasicMaterial({map: loader.load('https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=750&w=1260')}),

  ];
```
- Obstacle (tree)
``` javascript
function createTree(radiusTop, radiusBottom, height, radialSegments, map, x, y, z) {
    var loader = new THREE.TextureLoader();
    var geom = new THREE.CylinderGeometry(
    	radiusTop, radiusBottom, height, radialSegments);
    var mat = new THREE.MeshPhongMaterial({
	map: loader.load('tree.jpg'),
    	flatShading: true
    });
    var cylinder = new THREE.Mesh(geom, mat);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    cylinder.position.set(x, y, z);
    return cylinder;
}
```
7. Ground motion
By adjusting the value of the motion value variable according to the cycle, the ground was move left and right in the game.
``` javascript
 if (motionValue >= 0 && motionValue < 10) {
	ground.onLeft();
	if (!gameOver) {
		objects.forEach(function(object) {
			object.mesh.position.x -= 10;
		});
	}
	if (!gameOver2) {
		objects2.forEach(function(object) {
			object.mesh.position.x -= 10;
		});
	}  
	

	if (motionValue >= 6 && motionValue < 10) {
		if (character2.currentLane >= 1) {
			out2 = true;
		}
	}

}

if (motionValue >= 10 && motionValue < 30) {
	ground.onRight();

	if (!gameOver) {
		objects.forEach(function(object) {
			object.mesh.position.x += 10;
		});
	}
	if (!gameOver2) {
		objects2.forEach(function(object) {
			object.mesh.position.x += 10;
		});
	}

```
8. Camera motion
Various viewpoints are provided by making it possible to adjust the camera position value through keyboard input.
``` javascript
this.onWKeyPressed = function() {
      cameraY += 200;
   };

   this.onSKeyPressed = function() {
      cameraY -= 200;
   };

   this.onAKeyPressed = function() {
      cameraX -= 200;
   };

   this.onDKeyPressed = function() {
      cameraX += 200;
   };

   this.onQ	Pressed = function() {
      cameraZ += 200;
   };

   this.onEKeyPressed = function() {
      cameraZ -= 200;
   };

   this.on1KeyPressed = function() {
      cameraX = -1200;
      cameraY = 500;
      cameraZ = -1500;

   };

   this.on2KeyPressed = function() {
      cameraX = -1000;
      cameraY = 3000;
      cameraZ = 3000;   
   };

   this.on3KeyPressed = function() {
      cameraX = -5000;
      cameraY = 3000;
      cameraZ = 3000;      
   };

   this.on4KeyPressed = function() {
      cameraX = 2500;
      cameraY = 3000;
      cameraZ = 3000;   
   };

   this.on5KeyPressed = function() {
      cameraX = -1100;
      cameraY = 1500;
      cameraZ = -1000;      
   };
```
9. Background Music
Using the autoplay and loop attributes of the audio tag, bgm is automatically played without being cut off while the game is running.
```html
<audio autoplay
                   loop
                   src="audio/main.mp3"
                   type="audio/mpeg"></audio>
```

***
# Installation

**Rungether** is just basic HTML/CSS/JavaScript.<br><br>
Clone this repository and then open 'display.html' in the browser.<br><br>
You should open 'display.html' through Web Server.
***
# Member Information
Team C

- 최형인 llodhigh@gmail.com
- 박수빈 wlqkr23_@naver.com
- 임채윤 lcu1027@gmail.com  
- 채정인 ksh06293@naver.com
