var WIDTH, HEIGHT, scene, renderer, camera, cube, plane;
var stats;
var keys = [];
var cubes = [];
var peer, myId, myName, myColor, peers, connections;
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
  cube = new THREE.Mesh(defaultGeometry, defaultMaterial);
  scene.add(cube);
  setColor(cube, myColor);

  var worldWidth = 100;
  var worldDepth = 100;

  //data = generateHeight( worldWidth, worldDepth );

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
    var name = prompt('Name?');
    myId = id;
    myName = name;
    displayText("Peer id is: " + id + "... ");

    sendIdToServer(myId, name);
  });

  peer.on('connection', function(conn) {
    console.log("Player entering the game: " + conn.peer);
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
  $.post("http://localhost:4567/goodbye", JSON.stringify({id: id, name: name}), null, 'json');
}

function createCube() {
  var c = new THREE.Mesh(defaultGeometry, defaultMaterial);
  scene.add(c);
  return c;
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
  if(peerId === myId) {
    return;
  }
  switch(data.type) {
    case 'color':
      console.log(data.value);
      setColor(cubes[peerId], data.value);
      break;
    case 'position':
      cubes[peerId].position.set(data.value[0], data.value[1], data.value[2]);
      cubes[peerId].rotation.set(data.value[3], data.value[4], data.value[5])
      break;
    default:
      console.log(peerId + ': ' + data);
  }
}

function sendIdToServer(id, name) {
  jQuery.ajaxSetup({async:false});

  $.post("http://localhost:4567/hello", JSON.stringify({id: id, name: name}), null, 'json');

  displayText("Registered on server... ");

  getIdsFromServer();
}

function getIdsFromServer() {
  $.get( "http://localhost:4567/all", function( data ) {
    for(var i = 0; i < data.length; i++) {
      var id = data[i].id;
      var name = data[i].name;
      if(id != myId) {
        console.log("Player already in room: " + name + " (" + id + ")");
        peers.push(id);
      }
    }

    for(var i = 0; i < peers.length; i++) {
      var id = peers[i];
      var conn = peer.connect(id);
      connections.push(conn);
      cubes[id] = createCube();
      conn.on('data', function(data) {
        handleData(id, data);
      });
    }
    //displayText("Got " + peers.length + " peers... ");
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
  if(counter % 10 === 0) {
    broadcast({type: 'position', value: [cube.position.x, cube.position.y, cube.position.z, cube.rotation.x, cube.rotation.y, cube.rotation.z]});

    if(counter % 100 === 0) {
      broadcast({type: 'color', value: myColor});
    }
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
