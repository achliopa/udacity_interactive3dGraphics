"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Ornament axis/angle exercise: add three more cylinders to the ornament
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, document, window, dat*/

var camera, scene, renderer;
var cameraControls, effectController;
var clock = new THREE.Clock();
var bCube = true;
var gridX = false;
var gridY = false;
var gridZ = false;
var axes = true;
var ground = false;

function fillScene() {
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

	// LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x222222 );

	var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light.position.set( 200, 400, 500 );

	var light2 = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light2.position.set( -500, 250, -200 );

	scene.add(ambientLight);
	scene.add(light);
	scene.add(light2);

	var cylinderMaterial = new THREE.MeshPhongMaterial( { color: 0xD1F5FD, specular: 0xD1F5FD, shininess: 100 } );

	// get two diagonally-opposite corners of the cube and compute the
	// cylinder axis direction and length
	var maxCorner1 = new THREE.Vector3(  1, 1, 1 );
	var minCorner1 = new THREE.Vector3( -1,-1,-1 );
	var maxCorner2 = new THREE.Vector3(1,1,-1);
	var minCorner2 = new THREE.Vector3(-1,-1,1);
 	var maxCorner3 = new THREE.Vector3(1,-1,-1);
	var minCorner3 = new THREE.Vector3(-1,1,1);
	var maxCorner4 = new THREE.Vector3(-1,1,-1);
	var minCorner4 = new THREE.Vector3(1,-1,1);
	// note how you can chain one operation on to another:
	var cylAxis1 = new THREE.Vector3().subVectors( maxCorner1, minCorner1 );
	var cylAxis2 = new THREE.Vector3().subVectors( maxCorner2, minCorner2 );
	var cylAxis3 = new THREE.Vector3().subVectors( maxCorner3, minCorner3 );
	var cylAxis4 = new THREE.Vector3().subVectors( maxCorner4, minCorner4 );
	var cylLength = cylAxis1.length();

	// take dot product of cylAxis and up vector to get cosine of angle
	cylAxis1.normalize();
	cylAxis2.normalize();
	cylAxis3.normalize();
	cylAxis4.normalize();

	var originalAxis = new THREE.Vector3(0,1,0);
	var theta1 = Math.acos( cylAxis1.dot( originalAxis ) );
	var theta2 = Math.acos( cylAxis2.dot( originalAxis ) );
	var theta3 = Math.acos( cylAxis3.dot( originalAxis ) );
	var theta4 = Math.acos( cylAxis4.dot( originalAxis ) );
	// or just simply theta = Math.acos( cylAxis.y );

	// YOUR CODE HERE
	var cylinderGeometry = new THREE.CylinderGeometry( 0.2, 0.2, cylLength, 32 );
	var cylinder1 = new THREE.Mesh(cylinderGeometry, cylinderMaterial );
	var cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial );
	var cylinder3 = new THREE.Mesh(cylinderGeometry, cylinderMaterial );
	var cylinder4 = new THREE.Mesh(cylinderGeometry, cylinderMaterial );
	//var rotationAxis = new THREE.Vector3(1,0,-1);
	var rotationAxis1 = new THREE.Vector3();
	rotationAxis1.crossVectors(originalAxis,cylAxis1);
	// makeRotationAxis wants its axis normalized
	rotationAxis1.normalize();
	var rotationAxis2 = new THREE.Vector3();
	rotationAxis2.crossVectors(originalAxis,cylAxis2);
	// makeRotationAxis wants its axis normalized
	rotationAxis2.normalize();
	var rotationAxis3 = new THREE.Vector3();
	rotationAxis3.crossVectors(originalAxis,cylAxis3);
	// makeRotationAxis wants its axis normalized
	rotationAxis3.normalize();
	var rotationAxis4 = new THREE.Vector3();
	rotationAxis4.crossVectors(originalAxis,cylAxis4);
	// makeRotationAxis wants its axis normalized
	rotationAxis4.normalize();
	// don't use position, rotation, scale
	cylinder1.matrixAutoUpdate = false;
	cylinder2.matrixAutoUpdate = false;
	cylinder3.matrixAutoUpdate = false;
	cylinder4.matrixAutoUpdate = false;
	cylinder1.matrix.makeRotationAxis( rotationAxis1, theta1 );
	cylinder2.matrix.makeRotationAxis( rotationAxis2, theta2 );
	cylinder3.matrix.makeRotationAxis( rotationAxis3, theta3 );
	cylinder4.matrix.makeRotationAxis( rotationAxis4, theta4 );
	scene.add( cylinder1 );
	scene.add( cylinder2 );
	scene.add( cylinder3 );
	scene.add( cylinder4 );
}

function drawHelpers() {
	if (ground) {
		Coordinates.drawGround({size:100});
	}
	if (gridX) {
		Coordinates.drawGrid({size:100,scale:1});
	}
	if (gridY) {
		Coordinates.drawGrid({size:100,scale:1, orientation:"y"});
	}
	if (gridZ) {
		Coordinates.drawGrid({size:100,scale:1, orientation:"z"});
	}
	if (axes) {
		Coordinates.drawAllAxes({axisLength:5,axisRadius:0.01,axisTess:50});
	}

	if (bCube) {
		var cubeMaterial = new THREE.MeshLambertMaterial(
			{ color: 0xFFFFFF, opacity: 0.7, transparent: true } );
		var cube = new THREE.Mesh(
			new THREE.CubeGeometry( 2, 2, 2 ), cubeMaterial );
		scene.add( cube );
	}
}

function init() {
	var canvasWidth = 846;
	var canvasHeight = 494;
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColorHex( 0xAAAAAA, 1.0 );

	var container = document.getElementById('container');
	container.appendChild( renderer.domElement );

	// CAMERA
	camera = new THREE.PerspectiveCamera( 30, canvasRatio, 1, 10000 );
	// CONTROLS
	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	camera.position.set( -7, 7, 2 );
	cameraControls.target.set(0,0,0);

}

function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}

function animate() {
	window.requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);

	if ( effectController.newCube !== bCube || effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes)
	{
		bCube = effectController.newCube;
		gridX = effectController.newGridX;
		gridY = effectController.newGridY;
		gridZ = effectController.newGridZ;
		ground = effectController.newGround;
		axes = effectController.newAxes;

		fillScene();
		drawHelpers();
	}
	renderer.render(scene, camera);
}



function setupGui() {

	effectController = {

		newCube: bCube,
		newGridX: gridX,
		newGridY: gridY,
		newGridZ: gridZ,
		newGround: ground,
		newAxes: axes
	};

	var gui = new dat.GUI();
	gui.add( effectController, "newCube").name("Show cube");
	gui.add( effectController, "newGridX").name("Show XZ grid");
	gui.add( effectController, "newGridY" ).name("Show YZ grid");
	gui.add( effectController, "newGridZ" ).name("Show XY grid");
	gui.add( effectController, "newGround" ).name("Show ground");
	gui.add( effectController, "newAxes" ).name("Show axes");
}

try {
	init();
	fillScene();
	setupGui();
	drawHelpers();
	addToDOM();
	animate();
} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport+e);
}

