window.onload = function() {
  initCanvas()
}

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

  let sprite = PIXI.loader.add('paysage', 'assets/paysage.jpg').load(setup)

  render()
}


function setup(loader, resources) {
  let paysage = new PIXI.Sprite(resources.paysage.texture);
  stage.addChild(paysage);
}


function render() {
  requestAnimationFrame(render)
  renderer.render(stage)
}


function handleResize() {
  renderer.resize(window.innerWidth, window.innerHeight)
}
