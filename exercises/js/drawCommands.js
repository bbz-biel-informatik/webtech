STEP = 20
OFFSET = new Point(20, 380)
var initPos = new Point(OFFSET.x, OFFSET.y)
var pos = new Point(0, 0)
var pencil = new Point(0, 0)

document.onload = reset()

function reset() {
  pos.set(0, 0) // the initial Position is applied only for drawing
  pencil.set(pos.x, pos.y)
  clearCanvas()
}

function setInitPos(x, y) {
  initPos.set(x, y)
  reset()
}

function clearCanvas() {
  var canvas = document.getElementById("drawboard")
  if (canvas == null)
    return
  var context = canvas.getContext("2d")
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function left(step = STEP) {
  pos.addX(-step)
  draw()
  return pos
}

function right(step = STEP) {
  pos.addX(step)
  draw()
  return pos
}

function up(step = STEP) {
  pos.addY(-step)
  draw()
  return pos
}

function down(step = STEP) {
  pos.addY(step)
  draw()
  return pos
}

function goTo(x, y) {
  console.log(x)
  pos.set(x, -y)
  pencil.set(pos.x, pos.y)
  return pos
}

function drawTo(x, y) {
  pos.set(x, -y)
  draw()
  return pos
}

function draw() {
  var paper = document.getElementById("drawboard").getContext("2d")
  paper.beginPath()
  // respect the initial Position
  paper.moveTo(pencil.x + initPos.x, pencil.y + initPos.y)
  paper.lineTo(pos.x + initPos.x, pos.y + initPos.y)
  paper.stroke()
  pencil.set(pos.x, pos.y)
}
