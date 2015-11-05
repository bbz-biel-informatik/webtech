var WIDTH, HEIGHT, scene, renderer, camera, cube;
var stats;
var peer, myId, peers, connections;

function setup() {
  WIDTH  = window.innerWidth;
  HEIGHT = window.innerHeight;

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);

  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
  camera.position.set(0, 3.5, 5);
  camera.lookAt(scene.position);

  cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshNormalMaterial());
  scene.add(cube);

  document.body.appendChild(renderer.domElement);


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
    alert("Peer id is: " + id);

    sendIdToServer(myId);
  });

  peer.on('connection', function(conn) {
    var peerId = conn.peer;
    peers.push(peerId);
    connections.push(conn);

    conn.on('data', function(data) {
      handleData(peerId, data);
    });

    conn.send('Hello');
  });
}

function handleData(peerId, data) {
  console.log(data);
}

function sendIdToServer(id) {
  jQuery.ajaxSetup({async:false});

  $.post( "http://localhost:4567/hello", id );

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
      }
    }
    console.log(peers);
  });
}

function broadcast(msg) {
  for(var i = 0; i < connections.length; i++) {
    connections[i].send(msg);
  }
}

var counter = 0;

function render() {
  if(counter % 20 == 0) {
    broadcast([cube.position.x, cube.position.y, cube.position.z]);
  }
  counter++;
  stats.begin();

  cube.rotation.y += 0.01;
  renderer.render(scene, camera);

  stats.end();
  window.requestAnimationFrame(render);
}
