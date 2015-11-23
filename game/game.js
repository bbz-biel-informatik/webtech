var WIDTH, HEIGHT, scene, renderer, camera, cube, plane;
var stats;
var keys = [];
var cubes = [];
var checkpoints = [];
var peer, myId, myName, myColor, peers, connections;
var COLORS = [0xff0000, 0x0ff000, 0x00ff00, 0x000ff0, 0x0000ff];
var CUBE_HEIGHT = 2;

var defaultMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});
var defaultGeometry = new THREE.CubeGeometry(2, CUBE_HEIGHT, 2);

var audio_enable = new Audio('enable.mp3');

function setup() {
  WIDTH  = window.innerWidth;
  HEIGHT = window.innerHeight;

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);

  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 500);
  camera.position.set(0, 2.5, 5);
  camera.lookAt(scene.position);

  myColor = Math.random() * 0xffffff;
  cube = new THREE.Mesh(defaultGeometry, defaultMaterial);
  scene.add(cube);
  cube.position.y = CUBE_HEIGHT / 2;
  cube.add(camera);
  setColor(cube, myColor);

  var worldWidth = 100;
  var worldDepth = 100;

  for(var i = 0; i < 5; i++) {
    var c = new THREE.Mesh(defaultGeometry, defaultMaterial);
    c.scale.set(5, 5, 5);
    setColor(c, Math.random() * 0xffffff);
    c.position.set(-250 + Math.random() * 500, 2.5, -250 + Math.random() * 500);
    scene.add(c);
    checkpoints.push(c);
  }

  //data = generateHeight( worldWidth, worldDepth );

  var geometry = new THREE.PlaneBufferGeometry( 500, 500, worldWidth - 1, worldDepth - 1 );
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
    addPlayerToList(peerId, '');

    conn.on('data', function(data) {
      handleData(peerId, data);
    });
  });
}

function setdown() {
  $.post("http://localhost:4567/goodbye", JSON.stringify({id: myId, name: myName}), null, 'json');
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

function addPlayerToList(id, name) {
  var $list = $('#players > ul');
  var $item = $('<li id="' + id + '">' + name + '</li>');
  $list.append($item);
}

function handleData(peerId, data) {
  if(peerId === myId) {
    return;
  }
  switch(data.type) {
    case 'name':
      var $player = $('li#' + peerId);
      $player.text(data.type);
      break;
    case 'color':
      setColor(cubes[peerId], data.value);
      var $player = $('li#' + peerId);
      var hashString = Math.round(data.value).toString(16);
      $player.css('background-color', '#' + hashString);
      break;
    case 'position':
      cubes[peerId].position.set(data.value[0], data.value[1], data.value[2]);
      cubes[peerId].rotation.set(data.value[3], data.value[4], data.value[5]);
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
        addPlayerToList(id, name);
      }
    }

    for(var j = 0; j < peers.length; j++) {
      var peer_id = peers[j];
      var conn = peer.connect(peer_id);
      connections.push(conn);
      cubes[peer_id] = createCube();
      (function(idCopy, connCopy) {
        connCopy.on('data', function(data) {
          handleData(idCopy, data);
        });
      }(id, conn));
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
      broadcast({type: 'name', value: myName});
    }
  }
  counter++;
  stats.begin();

  if(keys[40]) {
    speed = speed - 0.005;
  }
  if(keys[38]) {
    speed = speed + 0.005;
  }
  if(keys[39]) {
    cube.rotateY(-(MAX_SPEED - speed * 0.5) * 0.02);
  }
  if(keys[37]) {
    cube.rotateY((MAX_SPEED - speed * 0.5) * 0.02);
  }

  checkCollision();

  if(speed > MAX_SPEED)
    speed = MAX_SPEED;
  if(speed < -MAX_SPEED)
    speed = -MAX_SPEED;

  cube.translateZ(-speed);

  renderer.render(scene, camera);

  stats.end();
}

function checkCollision() {
  for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++) {
    var localVertex = cube.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4(cube.matrix);
    var directionVector = globalVertex.sub( cube.position );

    var ray = new THREE.Raycaster( cube.position, directionVector.clone().normalize() );
    var collisionResults = ray.intersectObjects( checkpoints );
    if ( collisionResults.length > 0 && collisionResults.length < 5 && collisionResults[0].distance < directionVector.length() )
    {
        for(var i = 0; i < collisionResults.length; i++) {
          setColor(collisionResults[i].object, myColor);
          audio_enable.play();
        }
    }
  }
}
