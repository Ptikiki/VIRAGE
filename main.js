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

  let sprite = PIXI.loader
	.add([
		"assets/paysage.jpg",
	    "assets/chien.jpg",
	    "assets/gene.png"
	])
	.load(setup);

  render()
}


function setup(loader, resources) {
	console.log(resources)
	resources.foreach(el => {
		let texture = new PIXI.Sprite(el.texture);
		texture.width = 120;
		texture.height = 80;
		stage.addChild(texture);
	})
	//paysage.visible = false;
}


function render() {
  requestAnimationFrame(render)
  renderer.render(stage)
}


function handleResize() {
  renderer.resize(window.innerWidth, window.innerHeight)
}
