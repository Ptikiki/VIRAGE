window.onload = function() {
  initCanvas()
  loadCarouselPictures()
}

/*** LISTENERS ***/
window.addEventListener('resize', handleResize)
window.addEventListener('mousewheel', handleScroll)


/*** SCENE SETUP ***/
let renderer,
    stage,
    carousel,
    sprites = {}

let dessinPoint,
    ardoise


/*** CANVAS DRAWING ***/
function initCanvas() {
  renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { antialias: true })
  renderer.backgroundColor = 0x061939
  renderer.autoResize = true
  document.body.appendChild(renderer.view)

  stage = new PIXI.Stage(true) // ne défile pas
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

// ACTIONS APRES CHARGEMENT IMG
function setupLoaded(loader, resources) {
  Object.keys(resources).map(function(objectKey, index) { // nous donne objectKey (char) et index correspondant
    const sprite = new PIXI.Sprite(resources[objectKey].texture) // récupère la texture de chaque objectKey
    sprites[objectKey] = sprite // remplit l'objet sprites avec chaque sprite
    carousel.addChild(sprite) // ajout sprites dans carousel
  })
  makeCarousel() // creation carousel
  //drawExercice()
  dessineArdoise()
}

// creation carrousel : redimensionnements / repositionnements
function makeCarousel() {
  Object.keys(sprites).map(function(objectKey, index) {
    let ratioHorizontal = window.innerWidth / sprites[objectKey].width // calcul ratio
		sprites[objectKey].scale = new PIXI.Point(ratioHorizontal, ratioHorizontal) // redimensionnement : img = taille fenêtre
		sprites[objectKey].position.y = -(sprites[objectKey].texture.height * sprites[objectKey].scale.y - window.innerHeight)/2 // centrage vertical
    sprites[objectKey].position.x = window.innerWidth * index // une img par "écran"
  })
  render() // rendu une fois carrousel créé et bien paramétré
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


function handleScroll(e) {
  if (Math.abs(carousel.x) < (window.innerWidth * (Object.keys(sprites).length - 1)) - 45 && e.deltaY > 0 ) { // stop le défilement au dernier sprite (défile tant que x abs < à largeur totale de tous les sprites-1)
    carousel.x -= Math.abs(e.deltaY) / 3
  } else if (carousel.x > -45) {
    return
  } else if (e.deltaY < 0) {
    carousel.x += Math.abs(e.deltaY) / 3
  }
}

// DESSIN

function onMouseDown(event) {
  dessinPoint = new PIXI.Graphics()
  dessinPoint.beginFill(0xffffff)
  dessinPoint.moveTo(event.offsetX, event.offsetY)
  stage.addChild(dessinPoint)
  ardoise.mousemove = function(mouseData) {
    onMouseDrag(mouseData)
  }
}

function onMouseDrag(event) {
  dessinPoint.lineStyle(3, 0xffffff)
  dessinPoint.lineTo(event.offsetX, event.offsetY)
  drawingDetection()
}

function onMouseUp(event) {
  dessinPoint.endFill()
  ardoise.mousemove = null
}

function drawExercice() {
  console.log("ahahaha")
  let circle = new PIXI.Graphics()
  circle.beginFill(0xFFF68F)
  circle.drawCircle(0, 0, 10)
  circle.endFill()
  circle.x = 500
  circle.y = 500
  carousel.addChild(circle)
}

function drawingDetection() {
  console.log("detection en cours")
  let mouseX = event.offsetX
  let mouseY = event.offsetY
  if (mouseX > 490 && mouseX < 510 && mouseY > 490 && mouseY < 510) {
    console.log("c'est passé par 500px 500px")
  }
}

function dessineArdoise() {
  ardoise = new PIXI.Graphics();
  ardoise.beginFill(0x000000);
  ardoise.lineStyle(2, 0xFFFFFF);
  ardoise.drawRect(1000, 50, 150, 100);
  ardoise.interactive = true

  stage.addChild(ardoise);

  ardoise.mousedown = function(mouseData) {
    onMouseDown(mouseData)
    ardoise.mouseout = function(mouseData) {
      dessinPoint.destroy()
    }
  }

  ardoise.mouseup = function(mouseData) {
    onMouseUp(mouseData)
    ardoise.mouseout = null
  }



}

