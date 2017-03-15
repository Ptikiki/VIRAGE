window.onload = function() {
  initCanvas()
  initArdoises()
  loadCarouselPictures()
}

/*** SCENE SETUP ***/
let renderer,
    stage,
    carousel,
    sprites = {}

let dessinPoint,
    ardoises = []


/*** CANVAS DRAWING ***/
function initCanvas() {
  renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { antialias: true })
  renderer.backgroundColor = 0x061939
  renderer.autoResize = true
  document.body.appendChild(renderer.view)

  stage = new PIXI.Stage(true) // ne défile pas // graphics interactifs
  carousel = new PIXI.Container() // défile

  stage.addChild(carousel)

}


function initArdoises() {
  for(let i = 0; i < 2; i++) {
    dessineArdoise(i)
  }
  ardoises.forEach(function(el) {
    el.mousedown = onArdoiseMouseDown
  });
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
  render()
}

// creation carrousel : redimensionnements / repositionnements
function makeCarousel() {
  Object.keys(sprites).map(function(objectKey, index) {
    let ratioHorizontal = window.innerWidth / sprites[objectKey].texture.width // calcul ratio
		sprites[objectKey].scale = new PIXI.Point(ratioHorizontal, ratioHorizontal) // redimensionnement : img = taille fenêtre
		sprites[objectKey].position.y = -(sprites[objectKey].texture.height * sprites[objectKey].scale.y - window.innerHeight)/2 // centrage vertical
    sprites[objectKey].position.x = window.innerWidth * index // une img par "écran"
  })
}

// RENDU
function render() {
  requestAnimationFrame(render)
  renderer.render(stage)
}

// RESIZE
function handleResize() {
  renderer.resize(window.innerWidth, window.innerHeight)
  makeCarousel()
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

/*** ARDOISE ***/
function dessineArdoise(index) {
  let ardoise = new PIXI.Graphics()
  ardoise.beginFill(0x000000)
  ardoise.lineStyle(2, 0xFFFFFF)
  ardoise.drawRect(datas.ardoises[index].x, datas.ardoises[index].y, datas.ardoises[index].width, datas.ardoises[index].height)
  ardoise.interactive = true // pour attribuer événements à ardoise
  stage.addChild(ardoise)

  ardoises.push(ardoise)
}


function onArdoiseMouseDown(mouseData) {
  console.log(mouseData)
  dessinPoint = new PIXI.Graphics()
  dessinPoint.beginFill(0xffffff)
  dessinPoint.moveTo(mouseData.data.global.x, mouseData.data.global.y)
  stage.addChild(dessinPoint)

  ardoises.forEach(function(el) {
    el.mousemove = onArdoiseMouseMove
    el.mouseout = onArdoiseMouseOut
    el.mouseup = onArdoiseMouseUp
  });

}

function onArdoiseMouseMove(mouseData) {
  dessinPoint.lineStyle(3, 0xffffff)
  dessinPoint.lineTo(mouseData.data.global.x, mouseData.data.global.y)
}

function onArdoiseMouseOut() {
  TweenLite.to(dessinPoint, 0.3, {
    alpha: 0,
    onComplete: () => { dessinPoint.clear() }
  })

  ardoises.forEach(function(el) {
    el.mousemove = null
    el.mouseup = null
  });

}

function onArdoiseMouseUp() {
  dessinPoint.endFill()
  TweenLite.to(dessinPoint, 0.3, {
    alpha: 0,
    onComplete: () => { dessinPoint.clear() }
  })

  ardoises.forEach(function(el) {
    el.mousemove = null
    el.mouseout = null
  });

}


/*** LISTENERS ***/
window.addEventListener('resize', handleResize)
window.addEventListener('mousewheel', handleScroll)
