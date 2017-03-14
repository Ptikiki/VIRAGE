window.onload = function() {
  initCanvas()
  loadPictures()
}

/*** LISTENERS ***/
window.addEventListener('resize', handleResize)


/*** SCENE SETUP ***/
let renderer,
    stage,
    sprites = {}


/*** CANVAS DRAWING ***/
function initCanvas() {
  renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight)
  renderer.backgroundColor = 0x061939
  renderer.autoResize = true
  document.body.appendChild(renderer.view)

  stage = new PIXI.Container()

  render()
}

/*** PICTURES LOADING ***/
function loadPictures() {
  const pictures = PIXI.loader
	.add([
		'assets/paysage.jpg',
	    'assets/chien.jpg',
	    'assets/gene.png'
	])
  .on('progress', loadProgressHandler)
	.load(setupLoaded)
}

// PROGRESSION CHARGEMENT
function loadProgressHandler(loader) {
  console.log('loading')
  console.log('progress: ' + loader.progress + '%')
}

// CREATION SPRITES
function setupLoaded(loader, resources) {
  Object.keys(resources).map(function(objectKey, index) { // nous donne objectKey et index correspondant
    const sprite = new PIXI.Sprite(resources[objectKey].texture) // récupère la texture de chaque objectKey
    sprites[objectKey] = sprite // remplit l'objet sprites avec chaque sprite
    stage.addChild(sprite)
  })
  makePage() 
}

// redimensionnements / repositionnements
function makePage() {
  sprites['assets/paysage.jpg'].width = window.innerWidth
  sprites['assets/paysage.jpg'].height = window.innerWidth / 2.25
  sprites['assets/paysage.jpg'].y = window.innerHeight / 2 - sprites['assets/paysage.jpg'].height / 2
}

// RENDU
function render() {
  requestAnimationFrame(render)
  renderer.render(stage)
}

// RESIZE
function handleResize() {
  renderer.resize(window.innerWidth, window.innerHeight)
  makePage() 
}