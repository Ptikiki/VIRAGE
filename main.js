window.onload = function() {
  initCanvas()
  loadPictures()
}

/*** LISTENERS ***/
window.addEventListener('resize', handleResize)


/*** SCENE SETUP ***/
let renderer,
    stage


/*** CANVAS DRAWING ***/
function initCanvas() {
  renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight)
  renderer.backgroundColor = 0x061939
  renderer.autoResize = true
  document.body.appendChild(renderer.view)

  stage = new PIXI.Container()

  render()
}

function loadPictures() {
  const pictures = PIXI.loader
	.add([
		"assets/paysage.jpg",
	    "assets/chien.jpg",
	    "assets/gene.png"
	])
	.load(setupLoaded)
}

function setupLoaded(loader, resources) {
  Object.keys(resources).map(function(objectKey, index) {
    const sprite = new PIXI.Sprite(resources[objectKey].texture)
    stage.addChild(sprite)
  })
}

function render() {
  requestAnimationFrame(render)
  renderer.render(stage)
}

function handleResize() {
  renderer.resize(window.innerWidth, window.innerHeight)
}
