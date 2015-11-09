var WIDTH, HEIGHT, scene, renderer, camera, cube;
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

  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
  camera.position.set(0, 3.5, 5);
  camera.lookAt(scene.position);

  myColor = Math.random() * 0xffffff;
  defaultMaterial.color.setHex(myColor);
  cube = new THREE.Mesh(defaultGeometry, defaultMaterial);
  scene.add(cube);

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

function render() {
  window.requestAnimationFrame(render);
  if(counter % 20 === 0) {
    broadcast({type: 'position', value: [cube.position.x, cube.position.y, cube.position.z]});
    broadcast({type: 'color', value: myColor});
  }
  counter++;
  stats.begin();

  if(keys[40]) {
    cube.translateZ(0.05);
  }
  if(keys[38]) {
    cube.translateZ(-0.05);
  }
  if(keys[39]) {
    cube.translateX(0.05);
  }
  if(keys[37]) {
    cube.translateX(-0.05);
  }

  renderer.render(scene, camera);

  stats.end();
}
