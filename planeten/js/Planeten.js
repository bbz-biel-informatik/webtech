
	var webglEl = document.getElementById('daria');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
	}

	var views = [
				{
					left: 0,
					bottom: 0,
					width: 0.5,
					height: 1.0,
					background: new THREE.Color().setRGB( 0.5, 0.5, 0.7 ),
					eye: [ 0, 0, 20 ],
					up: [ 0, 1, 0 ],
					fov: 45,
					updateCamera: function ( camera, x, y, z ) {
					  earthPivot.rotation.y += 0.001;
					}
				},
				{
					left: 0.5,
					bottom: 0,
					width: 0.5,
					height: 1,
					background: new THREE.Color().setRGB( 0.7, 0.5, 0.5 ),
					eye: [ 1, 0, 20 ],
					up: [ 0, 1, 0 ],
					fov: 45,
					updateCamera: function ( camera, x, y, z ) {
					  earthPivot.rotation.y += 0.001;
					}
				}];

	var width  = window.innerWidth,
		height = window.innerHeight;

		windowWidth  = window.innerWidth;
					windowHeight = window.innerHeight;

	// Earth params
	var radius   = 0.5,
		segments = 15,
		rotation = 6;

	var scene = new THREE.Scene();

	//erde wird definiert
    var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation;
	scene.add(sphere)

	var earthPivot = new THREE.Object3D();
sphere.add( earthPivot );

	for (var ii =  0; ii < views.length; ++ii ) {

					var view = views[ii];
					camera = new THREE.PerspectiveCamera( view.fov, window.innerWidth / window.innerHeight, 1, 100 );
					camera.position.x = view.eye[ 0 ];
					camera.position.y = view.eye[ 1 ];
					camera.position.z = view.eye[ 2 ];
					camera.up.x = view.up[ 0 ];
					camera.up.y = view.up[ 1 ];
					camera.up.z = view.up[ 2 ];
					view.camera = camera;
					earthPivot.add( camera );
				}


	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 2);
	light.position.set(5,3,5);
	scene.add(light);


	//camera.lookAt(sphere);

	//mond wird definiert
	var mond = createSphere2(0.1, 8);
	//mond.rotation.y = rotation;
	mond.position.x += 0.6;
	mond.position.y += 0.6;
	scene.add(mond)

	//jupiter wird definiert
	var jupiter = createSphere3(2.4, 24);
	//jupiter.rotation.y = rotation;
	jupiter.position.x += 5;
	jupiter.position.y += 5;
	scene.add(jupiter)

	//Mond von Jupiter wird definiert
	var mondvonjupiter = createSphere15(0.2, 2);
	//jupiter.rotation.y = rotation;
	mondvonjupiter.position.x += 8.2;
	mondvonjupiter.position.y += 8.2;
	scene.add(mondvonjupiter)

	//mars wird definiert
	var mars = createSphere4(0.3, 10);
	//jupiter.rotation.y = rotation;
	mars.position.x += 2;
	mars.position.y += 2;
	scene.add(mars)

	//Mond von Mars wird definiert
	var mondvonmars = createSphere14(0.1, 5);
	//mond.rotation.y = rotation;
	mondvonmars.position.x += 2.5;
	mondvonmars.position.y += 2.5;
	scene.add(mondvonmars)

	//Saturn wird definiert
	var saturn = createSphere5(2.2, 22);
	//saturn.rotation.y = rotation;
	saturn.position.x += 10;
	saturn.position.y += 10;
	scene.add(saturn)

	//Mond von Saturn wird definiert
	var mondvonsaturn = createSphere15(0.4, 4);
	//mond.rotation.y = rotation;
	mondvonsaturn.position.x += 13.0;
	mondvonsaturn.position.y += 13.0;
	scene.add(mondvonsaturn)

	//Uranus wird definiert
	var uranus = createSphere6(1.1, 11);
	//saturn.rotation.y = rotation;
	uranus.position.x += 14;
	uranus.position.y += 14;
	scene.add(uranus)

	//Mond von Uranus wird definiert
	var mondvonuranus = createSphere16(0.2, 2);
	//saturn.rotation.y = rotation;
	mondvonuranus.position.x += 15;
	mondvonuranus.position.y += 15;
	scene.add(mondvonuranus)

	//Neptun wird definiert
	var neptun = createSphere7(1.2, 12);
	//saturn.rotation.y = rotation;
	neptun.position.x += 17;
	neptun.position.y += 17;
	scene.add(neptun)

	//Mond von Neptun wird definiert
	var mondvonneptun = createSphere12(0.3, 3);
	//mond.rotation.y = rotation;
	mondvonneptun.position.x += 19.0;
	mondvonneptun.position.y += 19.0;
	scene.add(mondvonneptun)

	//Pluto wird definiert
	var pluto = createSphere8(0.14, 1.4);
	//saturn.rotation.y = rotation;
	pluto.position.x += 20;
	pluto.position.y += 20;
	scene.add(pluto)

	//Venus wird definiert
	var venus = createSphere9(0.5, 10);
	//saturn.rotation.y = rotation;
	venus.position.x -= 2;
	venus.position.y -= 2;
	scene.add(venus)

	//Mond von Venus wird definiert
	var mondvonvenus = createSphere13(0.1, 3);
	//mond.rotation.y = rotation;
	mondvonvenus.position.x -= 3;
	mondvonvenus.position.y -= 3;
	scene.add(mondvonvenus)

	//Merkur wird definiert
	var merkur = createSphere10(0.2, 10);
	//saturn.rotation.y = rotation;
	merkur.position.x -= 4;
	merkur.position.y -= 4;
	scene.add(merkur)

	//Mond von Merkur wird definiert
	var mondvonmerkur = createSphere17(0.01, 1);
	//saturn.rotation.y = rotation;
	mondvonmerkur.position.x -= 4.3;
	mondvonmerkur.position.y -= 4.3;
	scene.add(mondvonmerkur)

	//Stern wird definiert
	var dstar = createSphere11(16, 50);
	//saturn.rotation.y = rotation;
	dstar.position.x += 50;
	dstar.position.y += 50;
	scene.add(dstar)

	var stars = createStars(50, 64);
	scene.add(stars);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {

		//Rotation Mond um Erde
		var speed = 0.001;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		mond.position.x -= sphere.position.x;
		mond.position.y -= sphere.position.y;

		var x = mond.position.x * c - mond.position.y * s;
		var y = mond.position.x * s + mond.position.y * c;

		mond.position.x = x + sphere.position.x;
		mond.position.y = y + sphere.position.y;

		//Rotation Mars um Erde
		var speed = 0.002;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		mars.position.x -= sphere.position.x;
		mars.position.y -= sphere.position.y;

		var x = mars.position.x * c - mars.position.y * s;
		var y = mars.position.x * s + mars.position.y * c;

		mars.position.x = x + sphere.position.x;
		mars.position.y = y + sphere.position.y;

		//Rotation  Mond von Mars um Mars
		var speed = 0.032;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		mondvonmars.position.x -= mars.position.x;
		mondvonmars.position.y -= mars.position.y;

		var x = mondvonmars.position.x * c - mondvonmars.position.y * s;
		var y = mondvonmars.position.x * s + mondvonmars.position.y * c;

		mondvonmars.position.x = x + mars.position.x;
		mondvonmars.position.y = y + mars.position.y;

		//Rotation Jupiter um Erde
		var speed = 0.003;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		jupiter.position.x -= sphere.position.x;
		jupiter.position.y -= sphere.position.y;

		var x = jupiter.position.x * c - jupiter.position.y * s;
		var y = jupiter.position.x * s + jupiter.position.y * c;

		jupiter.position.x = x + sphere.position.x;
		jupiter.position.y = y + sphere.position.y;

		//Rotation Mond von Jupiter um Jupiter
		var speed = 0.03;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		mondvonjupiter.position.x -= jupiter.position.x;
		mondvonjupiter.position.y -= jupiter.position.y;

		var x = mondvonjupiter.position.x * c - mondvonjupiter.position.y * s;
		var y = mondvonjupiter.position.x * s + mondvonjupiter.position.y * c;

		mondvonjupiter.position.x = x + jupiter.position.x;
		mondvonjupiter.position.y = y + jupiter.position.y;

		//Rotation Merkur um Erde
		var speed = 0.0028;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		merkur.position.x -= sphere.position.x;
		merkur.position.y -= sphere.position.y;

		var x = merkur.position.x * c - merkur.position.y * s;
		var y = merkur.position.x * s + merkur.position.y * c;

		merkur.position.x = x + sphere.position.x;
		merkur.position.y = y + sphere.position.y;

		//Rotation Mond von Merkur um Merkur
		var speed = 0.028;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		mondvonmerkur.position.x -= merkur.position.x;
		mondvonmerkur.position.y -= merkur.position.y;

		var x = mondvonmerkur.position.y * s - mondvonmerkur.position.x * c;
		var y = mondvonmerkur.position.x * s + mondvonmerkur.position.y * c;

		mondvonmerkur.position.x = x + merkur.position.x;
		mondvonmerkur.position.y = y + merkur.position.y;

		//Rotation Venus um Erde
		var speed = 0.0021;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		venus.position.x -= sphere.position.x;
		venus.position.y -= sphere.position.y;

		var x = venus.position.x * c - venus.position.y * s;
		var y = venus.position.x * s + venus.position.y * c;

		venus.position.x = x + sphere.position.x;
		venus.position.y = y + sphere.position.y;

		//Rotation  Mond von Venus um Venus
		var speed = 0.061;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		mondvonvenus.position.x -= venus.position.x;
		mondvonvenus.position.y -= venus.position.y;

		var x = mondvonvenus.position.x * c - mondvonvenus.position.y * s;
		var y = mondvonvenus.position.x * s + mondvonvenus.position.y * c;

		mondvonvenus.position.x = x + venus.position.x;
		mondvonvenus.position.y = y + venus.position.y;

		//Rotation Saturn um Erde
		var speed = 0.005;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		saturn.position.x -= sphere.position.x;
		saturn.position.y -= sphere.position.y;

		var x = saturn.position.x * c - saturn.position.y * s;
		var y = saturn.position.x * s + saturn.position.y * c;

		saturn.position.x = x + sphere.position.x;
		saturn.position.y = y + sphere.position.y;

		//Rotation  Mond von Saturn um Saturn
		var speed = 0.1;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		mondvonsaturn.position.x -= saturn.position.x;
		mondvonsaturn.position.y -= saturn.position.y;

		var x = mondvonsaturn.position.x * c - mondvonsaturn.position.y * s;
		var y = mondvonsaturn.position.x * s + mondvonsaturn.position.y * c;

		mondvonsaturn.position.x = x + saturn.position.x;
		mondvonsaturn.position.y = y + saturn.position.y;


		//Rotation Pluto um Erde
		var speed = 0.021;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		pluto.position.x -= sphere.position.x;
		pluto.position.y -= sphere.position.y;

		var x = pluto.position.x * c - pluto.position.y * s;
		var y = pluto.position.x * s + pluto.position.y * c;

		pluto.position.x = x + sphere.position.x;
		pluto.position.y = y + sphere.position.y;

		//Rotation Uranus um Erde
		var speed = 0.004;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		uranus.position.x -= sphere.position.x;
		uranus.position.y -= sphere.position.y;

		var x = uranus.position.x * c - uranus.position.y * s;
		var y = uranus.position.x * s + uranus.position.y * c;

		uranus.position.x = x + sphere.position.x;
		uranus.position.y = y + sphere.position.y;

		//Rotation Mond von Uranus um Erde
		var speed = 0.04;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		mondvonuranus.position.x -= uranus.position.x;
		mondvonuranus.position.y -= uranus.position.y;

		var x = mondvonuranus.position.x * c - mondvonuranus.position.y * s;
		var y = mondvonuranus.position.x * s + mondvonuranus.position.y * c;

		mondvonuranus.position.x = x + uranus.position.x;
		mondvonuranus.position.y = y + uranus.position.y;

		//Rotation Neptun um Erde
		var speed = 0.0021;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		neptun.position.x -= sphere.position.x;
		neptun.position.y -= sphere.position.y;

		var x = neptun.position.x * c - neptun.position.y * s;
		var y = neptun.position.x * s + neptun.position.y * c;

		neptun.position.x = x + sphere.position.x;
		neptun.position.y = y + sphere.position.y;

		//Rotation  Mond von Neptun um Neptun
		var speed = 0.081;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		mondvonneptun.position.x -= neptun.position.x;
		mondvonneptun.position.y -= neptun.position.y;

		var x = mondvonneptun.position.x * c - mondvonneptun.position.y * s;
		var y = mondvonneptun.position.x * s + mondvonneptun.position.y * c;

		mondvonneptun.position.x = x + neptun.position.x;
		mondvonneptun.position.y = y + neptun.position.y;

		//Rotation Neptun um Erde
		var speed = 0.011;
		var s = Math.sin(speed);
		var c = Math.cos(speed);

		dstar.position.x -= sphere.position.x;
		dstar.position.y -= sphere.position.y;

		var x = dstar.position.x * c - dstar.position.y * s;
		var y = dstar.position.x * s + dstar.position.y * c;

		dstar.position.x = x + sphere.position.x;
		dstar.position.y = y + sphere.position.y;

		jupiter.rotation.y += 0.0005;
		dstar.rotation.y +=0.0005;
		sphere.rotation.y += 0.0005;



		requestAnimationFrame(render);
		for ( var ii = 0; ii < views.length; ++ii ) {

					view = views[ii];
					camera = view.camera;

					view.updateCamera( camera );

					var left   = Math.floor( 1600  * view.left );
					var bottom = Math.floor( 800 * view.bottom );
					var width  = Math.floor( 1600  * view.width );
					var height = Math.floor( 800 * view.height );
					renderer.setViewport( left, bottom, width, height );
					renderer.setScissor( left, bottom, width, height );
					renderer.enableScissorTest ( true );
					renderer.setClearColor( view.background );

					camera.aspect = width / height;
					camera.updateProjectionMatrix();

					renderer.render( scene, camera );
				}
	}
	//erstellt die Erde
	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/2_no_clouds_4k1.jpg')
			})
		);
	}
	//erstellt den Mond
	function createSphere2(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/moonmapfarbig1k.jpg'),
			})
		);
	}

	//erstellt den Jupiter
	function createSphere3(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/jupitermap.jpg'),
			})
		);
	}

	//erstellt den Mond von Jupiter
	function createSphere15(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/moonmapfarbig1k.jpg'),
			})
		);
	}

	//erstellt den Saturn
	function createSphere4(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/mars.jpg'),
			})
		);
	}

	//erstellt den Mond von Saturn
	function createSphere15(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/moonmapfarbig1k.jpg'),
			})
		);
	}

	//erstellt den Uranus
	function createSphere5(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/saturn_4k_texture.png'),
			})
		);
	}

		//erstellt den Mond von Uranus
	function createSphere16(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/moonmapfarbig1k.jpg'),
			})
		);
	}

	//erstellt den Mars
	function createSphere6(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/uranus.png'),
			})
		);
	}

	//erstellt den Mond von Mars
	function createSphere14(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/moonmapfarbig1k.jpg'),
			})
		);
	}


	//erstellt den Neptun
	function createSphere7(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/neptun.jpg'),
			})
		);
	}

		//erstellt den Mond von Neptun
	function createSphere12(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/moonmapfarbig1k.jpg'),
			})
		);
	}


	//erstellt den Pluto
	function createSphere8(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/pluto.jpg'),
			})
		);
	}

	//erstellt den Venus
	function createSphere9(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/venus.jpg'),
			})
		);
	}

		//erstellt den Mond von Venus
	function createSphere13(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/moonmapfarbig1k.jpg'),
			})
		);
	}

	//erstellt den Merkur
	function createSphere10(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/merkur.png'),
			})
		);
	}

		//erstellt den Mond von Merkus
	function createSphere17(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/moonmapfarbig1k.jpg'),
			})
		);
	}

	//erstellt den Eidgenossen-Planeten
	function createSphere11(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/todesstern1.jpg'),
			})
		);
	}


	//erstellt die Wolken auf der Erde
	function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
				transparent: true
			})
		);
	}
	//erstellt den Hintergrund --> Die Sterne
	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
				side: THREE.BackSide
			})
		);
	}
