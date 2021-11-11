
window.addEventListener('load', function(){
	new World(document.getElementById('world'));
});




function World(element) {
	// Explicit binding of this even in changing contexts.
	var self = this;

	// Scoped variables in this world.
	var scene, camera, character, renderer, light, shadowLight;
	var runningCharacter;
	var clock = new THREE.Clock();
	var mixer = new THREE.AnimationMixer(scene);
	// Initialize the world.
	init();
	var i =0;
	/**
	  * Builds the renderer, scene, lights, camera, and the character,
	  * then begins the rendering loop.
	  */
	function init() {

		// Initialize the renderer.
		renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true;
		element.appendChild(renderer.domElement);

		// Initialize the scene.
		scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x363d3d, -1, 3000);

		// Initialize the lights.
		light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
		shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
		shadowLight.position.set(200, 200, 200);
		shadowLight.castShadow = true;
		scene.add(light);
		scene.add(shadowLight);

		// Initialize the camera with field of view, aspect ratio,
		// near plane, and far plane.
		camera = new THREE.PerspectiveCamera(
			60, window.innerWidth / window.innerHeight, 1, 2000);
		camera.position.set(0, 400, 800);
		camera.lookAt(new THREE.Vector3(0, 150, 0));
		window.camera = camera;

		// Set up resizing capabilities.
		window.addEventListener('resize', handleWindowResize, false);

		// Initialize the character and add it to the scene.


		const loader = new THREE.GLTFLoader();
		loader.load('./model/scene.gltf', function(gltf){
		  running = gltf.scene.children[0];
		  running.scale.set(300,-400,250);
		  running.position.set(0,0,-300);
		  scene.add(gltf.scene);
		  runningCharacter = running;
		  mixer = new THREE.AnimationMixer( gltf.scene );
		  var action = mixer.clipAction( gltf.animations[ 0 ] );
		  action.play();
		  }, undefined, function (error) {
			console.error(error);
		});

		// Begin the rendering loop.
		loop();
		
	}
	
	/**
	  * The main animation loop.
	  */
	function loop() {
		var delta = clock.getDelta();
		if ( mixer ) mixer.update( delta );
		if (runningCharacter) runningCharacter.rotation.z += 0.01;
		renderer.render(scene, camera);
		requestAnimationFrame(loop);
	}

	/**
	  * A method called when window is resized.
	  */
	function handleWindowResize() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}
	
}
