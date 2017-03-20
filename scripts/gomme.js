window.onload = function() {
  initCanvas()
}

/*** SCENE SETUP ***/
let renderer,
    stage,
    background,
    mask,
    container
let count = 0

/*** CANVAS DRAWING ***/
function initCanvas() {
  renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { antialias: true,  preserveDrawingBuffer: true })
  renderer.backgroundColor = 0x000000
  renderer.autoResize = true
  renderer.autoClear = false
  document.body.appendChild(renderer.view)

  stage = new PIXI.Stage(true)
  stage.interactive = true

  setImages()
  createMask()
  listeners()
  animate()
  stage.mousemove = onMouseMove
}

function setImages() {
  container = new PIXI.Container()
  container.position.x = window.innerWidth / 2
  container.position.y = window.innerHeight / 2

  background = PIXI.Sprite.fromImage('./assets/square.svg')
  background.anchor.x = 0.5
  background.anchor.y = 0.5
  container.addChild(background)

  stage.addChild(container)
}

function createMask() {
  mask = PIXI.Sprite.fromImage('./assets/cercle.svg')
  stage.addChild(mask)
  mask.position.x = window.innerWidth / 2 - 100
  mask.position.y = window.innerHeight / 2 - 100
  container.mask = mask
}

function listeners() {
  stage.on('click', onClick)
  stage.on('tap', onClick)
}

function onClick() {
  if(!container.mask) { // clic en dehors du masque
    container.mask = mask
  } else { // clic sur le masque
    container.mask = null
  }
}

function onMouseMove(mouseData) {
  console.log("over")
  mask.position.x = mouseData.data.global.x - 100
  mask.position.y = mouseData.data.global.y - 100
}

function animate() {
  render()
}

function render() {
  requestAnimationFrame(animate)
  renderer.render(stage)
}






