window.onload = function() {
  initCanvas()
  loadCarouselPictures()
}

/*** SCENE SETUP ***/
let renderer,
    stage,
    carousel,
    sprites = {}

let dessinPoint,
    ardoises = [],
    checkPoints = []


/*** CANVAS DRAWING ***/
function initCanvas() {
  renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { antialias: true })
  renderer.autoResize = true
  document.body.appendChild(renderer.view)

  stage = new PIXI.Stage(true) // ne défile pas // graphics interactifs
  carousel = new PIXI.Container() // défile

  stage.addChild(carousel)
}


function initArdoises() {
  for(let i = 0; i < datas.datasArdoises.length; i++) {
    dessineArdoise(i)
  }

  for(let i = 0; i < datas.datasCheckPoints.length; i++) {
    drawCheckpoint(i)
  }

  checkPoints.forEach(function(el) {
    el.mousedown = drawingDetection
  })

  ardoises.forEach(function(el) {
    el.mousedown = onArdoiseMouseDown
    el.mouseover = () => { document.body.style.cursor = 'crosshair' }
    el.mouseout = onArdoiseMouseOut
  });
}


/*** PICTURES LOADING ***/
function loadCarouselPictures() {
  const pictures = PIXI.loader
  .add([
    'assets/carousel-1.jpg',
    'assets/carousel-2.jpg',
    'assets/carousel-3.jpg'
  ])
  .on('progress', loadProgressHandler)
  .load(setupLoaded) // lancement setupLoaded quand chargement img terminé
}

// PROGRESSION CHARGEMENT
function loadProgressHandler(loader) {
}

// ACTIONS APRES CHARGEMENT IMG
function setupLoaded(loader, resources) {
  Object.keys(resources).map(function(objectKey, index) { // nous donne objectKey (char) et index correspondant
    const sprite = new PIXI.Sprite(resources[objectKey].texture) // récupère la texture de chaque objectKey
    sprites[objectKey] = sprite // remplit l'objet sprites avec chaque sprite
    carousel.addChild(sprite) // ajout sprites dans carousel
  })
  makeCarousel() // creation carousel
  initArdoises()
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
  ardoise.beginFill(0x000000, 0.3)
  ardoise.drawRect(datas.datasArdoises[index].x, datas.datasArdoises[index].y, datas.datasArdoises[index].width, datas.datasArdoises[index].height)
  ardoise.interactive = true // pour attribuer événements à ardoise
  carousel.addChild(ardoise)

  ardoises.push(ardoise)
}


function onArdoiseMouseDown(mouseData) {
  dessinPoint = new PIXI.Graphics()
  dessinPoint.beginFill(0xffffff)
  dessinPoint.moveTo(mouseData.data.global.x, mouseData.data.global.y)
  stage.addChild(dessinPoint)

  checkPoints.forEach(function(el) {
    el.mouseover = drawingDetection
  })
  ardoises.forEach(function(el) {
    el.mousemove = onArdoiseMouseMove
    el.mouseup = onArdoiseMouseUp
  })

}

function onArdoiseMouseMove(mouseData) {
  dessinPoint.lineStyle(3, 0xffffff)
  dessinPoint.lineTo(mouseData.data.global.x, mouseData.data.global.y)
}

function onArdoiseMouseOut() {
  if (dessinPoint) {
    TweenLite.to(dessinPoint, 0.3, {
      alpha: 0,
      onComplete: () => { dessinPoint.clear() }
    })
  }
  document.body.style.cursor = 'auto'

  checkPoints.forEach(function(el) {
    el.mouseover = null
  })
  ardoises.forEach(function(el) {
    el.mousemove = null
    el.mouseup = null
    reseDrawingDetection(el)
  })

}

function onArdoiseMouseUp() {
  dessinPoint.endFill()
  TweenLite.to(dessinPoint, 0.3, {
    alpha: 0,
    onComplete: () => { dessinPoint.clear() }
  })

  checkPoints.forEach(function(el) {
    el.mouseover = null
  })
  ardoises.forEach(function(el) {
    el.mousemove = null
    reseDrawingDetection(el)
  })
}

function drawCheckpoint(index) {
  let checkPoint = new PIXI.Graphics()
  checkPoint.beginFill(0xFFF68F, 1)
  checkPoint.drawCircle(0, 0, datas.datasCheckPoints[index].rayon)
  checkPoint.endFill()
  checkPoint.x = datas.datasCheckPoints[index].x
  checkPoint.y = datas.datasCheckPoints[index].y
  checkPoint.interactive = true // pour attribuer événements à checkPoint
  checkPoint.isChecked = false
  ardoises[datas.datasCheckPoints[index].ardoise].addChild(checkPoint)

  checkPoints.push(checkPoint)
}

function drawingDetection(mouseData) {
  console.log('yes')
  this.isChecked = true
  let drawValidated = true

  for (var i = 0; i < this.parent.children.length; i++) { // parcours des checkPoints de l'ardoise parente du checkPoint en hover
    if (!this.parent.children[i].isChecked) { // si un de ces checkpoint pas check...
      drawValidated = false
    }
  }

  if (drawValidated) {
    console.log('dessin valide')

    TweenLite.to(this.parent.children, 0.3, {
      alpha: 0.5
    })

    reseDrawingDetection(this.parent)
  }
}

reseDrawingDetection = (el) => {
  for (var i = 0; i < el.children.length; i++) {
    el.children[i].isChecked = false
  }
}


/*** LISTENERS ***/
window.addEventListener('resize', handleResize)
window.addEventListener('mousewheel', handleScroll)
