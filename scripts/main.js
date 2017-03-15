window.onload = function() {
  initCanvas()
  loadCarouselPictures()
}

/*** LISTENERS ***/
window.addEventListener('resize', handleResize)


/*** SCENE SETUP ***/
let renderer,
    stage,
    carousel,
    sprites = {}


/*** CANVAS DRAWING ***/
function initCanvas() {
  renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { antialias: true })
  renderer.backgroundColor = 0x061939
  renderer.autoResize = true
  document.body.appendChild(renderer.view)

  stage = new PIXI.Container() // ne défile pas
  carousel = new PIXI.Container() // défile

  stage.addChild(carousel)
}

/*** PICTURES LOADING ***/
function loadCarouselPictures() {
  const pictures = PIXI.loader
	.add([
		'assets/paysage.jpg',
	    'assets/chien.jpg',
	    'assets/ville.jpg'
	])
  .on('progress', loadProgressHandler)
	.load(setupLoaded) // lancement setupLoaded quand chargement img terminé
}

// PROGRESSION CHARGEMENT
function loadProgressHandler(loader) {
  console.log('loading')
  console.log('progress: ' + loader.progress + '%')
}

// CREATION SPRITES
function setupLoaded(loader, resources) {
  Object.keys(resources).map(function(objectKey, index) { // nous donne objectKey (char) et index correspondant
    const sprite = new PIXI.Sprite(resources[objectKey].texture) // récupère la texture de chaque objectKey
    sprites[objectKey] = sprite // remplit l'objet sprites avec chaque sprite
    carousel.addChild(sprite) // ajout sprites dans carousel
  })
  makeCarousel() // creation carousel
}

// creation carousel : redimensionnements / repositionnements
function makeCarousel() {
  Object.keys(sprites).map(function(objectKey, index) {
    let ratioHorizontal = window.innerWidth / sprites[objectKey].width // calcul ratio
		sprites[objectKey].scale = new PIXI.Point(ratioHorizontal, ratioHorizontal) // redimensionnement : img = taille fenêtre
		sprites[objectKey].position.y = -(sprites[objectKey].texture.height * sprites[objectKey].scale.y - window.innerHeight)/2 // centrage vertical
    sprites[objectKey].position.x = window.innerWidth * index // une img par "écran"
  })
  render() // rendu une fois carousel créé et bien paramétré
}

// RENDU
function render() {
  requestAnimationFrame(render)
  animate()
  renderer.render(stage)
}

// RESIZE
function handleResize() {
  renderer.resize(window.innerWidth, window.innerHeight)
}

function animate() {
  if (Math.abs(carousel.x) < window.innerWidth * (Object.keys(sprites).length - 1) ) { // stop le défilement au dernier sprite
    carousel.x -= 15
  }
}
