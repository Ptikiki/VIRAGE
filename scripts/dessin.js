window.onload = function() {
  initCanvas()
}

/*** LISTENERS ***/
window.addEventListener('resize', handleResize)
window.addEventListener('mousedown', onMouseDown)
window.addEventListener('mouseup', onMouseUp)


/*** SCENE SETUP ***/
let renderer,
    stage

let dessinPoint

/*** CANVAS DRAWING ***/
function initCanvas() {
  renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { antialias: true })
  renderer.backgroundColor = 0x000000
  renderer.autoResize = true
  document.body.appendChild(renderer.view)

  stage = new PIXI.Container()

  drawExercice()
  render()
}

// RENDU
function render() {
  requestAnimationFrame(render)
  renderer.render(stage)
}

// RESIZE
function handleResize() {
  renderer.resize(window.innerWidth, window.innerHeight)
}

function onMouseDown(event) {
  dessinPoint = new PIXI.Graphics()
  dessinPoint.beginFill(0xffffff)
  dessinPoint.moveTo(event.offsetX, event.offsetY)
  stage.addChild(dessinPoint)
  window.addEventListener('mousemove', onMouseDrag)
}

function onMouseDrag(event) {
  dessinPoint.lineStyle(3, 0xffffff)
  dessinPoint.lineTo(event.offsetX, event.offsetY)
  drawingDetection()
}

function onMouseUp(event) {
  dessinPoint.endFill()
  window.removeEventListener('mousemove', onMouseDrag)
}

function drawExercice() {
  console.log("ahahaha")
  let circle = new PIXI.Graphics()
  circle.beginFill(0xFFF68F)
  circle.drawCircle(0, 0, 10)
  circle.endFill()
  circle.x = 500
  circle.y = 500
  stage.addChild(circle)
}

function drawingDetection() {
  console.log("detection en cours")
  let mouseX = event.offsetX
  let mouseY = event.offsetY
  if (mouseX > 490 && mouseX < 510 && mouseY > 490 && mouseY < 510) {
    console.log("c'est passé par 500px 500px")
  }
}
