window.onload = function() {
  initCanvas()
}

/*** SCENE SETUP ***/
let renderer,
    stage,
    background,
    mask,
    container,
    frite,
    texture
let count = 0

/*** CANVAS DRAWING ***/
function initCanvas() {
  renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight, { antialias: true,  clearBeforeRender: false })
  renderer.backgroundColor = 0x000000
  renderer.autoClear = false;
  renderer.autoResize = true
  document.body.appendChild(renderer.view)

  stage = new PIXI.Container()
  stage.interactive = true

  setImages()
  createMask()
  listeners()
  animate()
  stage.mousemove = onMouseMove
}

function setImages() {
  container = new PIXI.DisplayObjectContainer()
  container.position.x = window.innerWidth / 2
  container.position.y = window.innerHeight / 2

  background = PIXI.Sprite.fromImage('./assets/frite.png') // silhouette de Sum
  background.anchor.x = 0.5
  background.anchor.y = 0.5
  container.addChild(background)

  stage.addChild(container)
}

function createMask() {
  mask = new PIXI.Graphics()
  mask.beginFill(0)
  mask.drawCircle(100,100,30)
  // mask = PIXI.Sprite.fromImage('./assets/cercle.svg')
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
  // if(!container.mask) { // clic en dehors du masque
  //   container.mask = mask
  // } else { // clic sur le masque
  //   container.mask = null
  // }

  background = PIXI.Sprite.fromImage('./assets/frite_bleue.png') // silhouette de Sum
  background.anchor.x = 0.5
  background.anchor.y = 0.5
  container.addChild(background)

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






