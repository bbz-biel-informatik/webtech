var WIDTH, HEIGHT, scene, renderer, camera, cube, plane;
var stats;
var keys = [];
var cubes = [];
var peer, myId, myColor, peers, connections;
var COLORS = [0xff0000, 0x0ff000, 0x00ff00, 0x000ff0, 0x0000ff];

var defaultMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});
var defaultGeometry = new THREE.CubeGeometry(2, 2, 2);

function setup() {
  WIDTH  = window.innerWidth;
  HEIGHT = window.innerHeight;

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);

  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 100);
  camera.position.set(0, 3.5, 5);
  camera.lookAt(scene.position);

  myColor = Math.random() * 0xffffff;
  defaultMaterial.color.setHex(myColor);
  cube = new THREE.Mesh(defaultGeometry, defaultMaterial);
  scene.add(cube);

  var worldWidth = 100;
  var worldDepth = 100;

  data = generateHeight( worldWidth, worldDepth );

  var geometry = new THREE.PlaneBufferGeometry( 7500, 7500, worldWidth - 1, worldDepth - 1 );
  geometry.rotateX( - Math.PI / 2 );

  mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial({ wireframe: true }) );
  scene.add( mesh );

  document.body.appendChild(renderer.domElement);

  document.addEventListener('keydown', function(event) {
    keys[event.keyCode] = true;
  });

  document.addEventListener('keyup', function(event) {
    keys[event.keyCode] = false;
  });

  // stats
  stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms, 2: mb

  // align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild( stats.domElement );

  // peer, pw is asdfasdf
  peer = new Peer({key: 'jzg83g5ozh8e61or'});

  peers = [];
  connections = [];

  peer.on('open', function(id) {
    myId = id;
    displayText("Peer id is: " + id + "... ");

    sendIdToServer(myId);
  });

  peer.on('connection', function(conn) {
    var peerId = conn.peer;
    peers.push(peerId);
    connections.push(conn);
    cubes[peerId] = createCube();

    conn.on('data', function(data) {
      handleData(peerId, data);
    });
  });
}

function setdown() {
  $.post("http://localhost:4567/goodbye", myId);
}

function createCube() {
  var c = new THREE.Mesh(defaultGeometry, defaultMaterial);
  scene.add(c);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setColor(obj, color) {
  obj.material = new THREE.MeshBasicMaterial({color: color});
}

function displayText(text) {
  var $status = $('#status');
  $status.text($status.text() + "\n" + text);
}

function handleData(peerId, data) {
  switch(data.type) {
    case 'color':
      setColor(cubes[peerId], data.value);
      break;
    case 'position':
      cubes[peerId].position.set(data.value[0], data.value[1], data.value[2]);
      break;
    default:
      console.log(peerId + ': ' + data);
  }
}

function sendIdToServer(id) {
  jQuery.ajaxSetup({async:false});

  $.post( "http://localhost:4567/hello", id );

  displayText("Registered on server... ");

  getIdsFromServer();
}

function getIdsFromServer() {
  $.get( "http://localhost:4567/all", function( data ) {
    for(var i = 0; i < data.length; i++) {
      var id = data[i];
      if(id != myId) {
        var conn = peer.connect(id);
        peers.push(id);
        connections.push(conn);
        cubes[id] = createCube();
      }
    }
    displayText("Got " + peers.length + " peers... ");
    setColor(cube, myColor);
    broadcast({type: 'color', value: myColor});
  });
}

function broadcast(msg) {
  for(var i = 0; i < connections.length; i++) {
    connections[i].send(msg);
  }
}

var counter = 0;

var speed = 0;
var MAX_SPEED = 1;

function render() {
  window.requestAnimationFrame(render);
  if(counter % 20 === 0) {
    broadcast({type: 'position', value: [cube.position.x, cube.position.y, cube.position.z]});
    broadcast({type: 'color', value: myColor});
  }
  counter++;
  stats.begin();

  if(keys[40]) {
    speed = speed + 0.005;
  }
  if(keys[38]) {
    speed = speed - 0.005;
  }
  if(keys[39]) {
    cube.rotateY(-(MAX_SPEED - speed) * 0.02);
  }
  if(keys[37]) {
    cube.rotateY((MAX_SPEED - speed) * 0.02);
  }

  if(speed > MAX_SPEED)
    speed = MAX_SPEED;

  cube.translateZ(speed);

  /*camera.position.x = cube.position.x;
  camera.position.y = cube.position.y + 3.5;
  camera.position.z = cube.position.z + 5;
	camera.lookAt( cube.position );*/

  renderer.render(scene, camera);

  stats.end();
}

function generateHeight( width, height ) {
	var size = width * height, data = new Uint8Array( size ),
	perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;
	for ( var j = 0; j < 4; j ++ ) {
		for ( var i = 0; i < size; i ++ ) {
			var x = i % width, y = ~~ ( i / width );
			data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
		}
		quality *= 5;
	}
	return data;
}

function generateTexture( data, width, height ) {

				var canvas, canvasScaled, context, image, imageData,
				level, diff, vector3, sun, shade;

				vector3 = new THREE.Vector3( 0, 0, 0 );

				sun = new THREE.Vector3( 1, 1, 1 );
				sun.normalize();

				canvas = document.createElement( 'canvas' );
				canvas.width = width;
				canvas.height = height;

				context = canvas.getContext( '2d' );
				context.fillStyle = '#000';
				context.fillRect( 0, 0, width, height );

				image = context.getImageData( 0, 0, canvas.width, canvas.height );
				imageData = image.data;

				for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {

					vector3.x = data[ j - 2 ] - data[ j + 2 ];
					vector3.y = 2;
					vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
					vector3.normalize();

					shade = vector3.dot( sun );

					imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
					imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
					imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
				}

				context.putImageData( image, 0, 0 );

				// Scaled 4x

				canvasScaled = document.createElement( 'canvas' );
				canvasScaled.width = width * 4;
				canvasScaled.height = height * 4;

				context = canvasScaled.getContext( '2d' );
				context.scale( 4, 4 );
				context.drawImage( canvas, 0, 0 );

				image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
				imageData = image.data;

				for ( var i = 0, l = imageData.length; i < l; i += 4 ) {

					var v = ~~ ( Math.random() * 5 );

					imageData[ i ] += v;
					imageData[ i + 1 ] += v;
					imageData[ i + 2 ] += v;

				}

				context.putImageData( image, 0, 0 );

				return canvasScaled;

			}
