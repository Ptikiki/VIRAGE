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
}

function onMouseUp(event) {
  dessinPoint.endFill()
  window.removeEventListener('mousemove', onMouseDrag)
}
