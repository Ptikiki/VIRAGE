window.onload = function() {
  initCanvas()
  loadCarouselPictures()
}

/*** SCENE SETUP ***/
let renderer,
    stage,
    carousel,
    ratioVertical = 1,
    totalCarouselWidth = 0
    sprites = {}

let drawLine,
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
  render()
}

// creation carrousel : redimensionnements pour faire 100% de la hauteur / repositionnements
function makeCarousel() {
  Object.keys(sprites).map(function(objectKey, index) {
    ratioVertical = window.innerHeight / sprites[objectKey].texture.height // calcul ratio vetical
    sprites[objectKey].scale = new PIXI.Point(ratioVertical, ratioVertical) // redimensionnement : img = taille fenêtre
    sprites[objectKey].x = totalCarouselWidth
    totalCarouselWidth += sprites[objectKey].width
  })
  totalCarouselWidth = 0

  for (var i = 0; i < ardoises.length; i++) {
    ardoises[i].destroy()
  }
  for (var i = 0; i < checkPoints.length; i++) {
    checkPoints[i].destroy()
  }
  ardoises = []
  checkPoints = []
  initArdoises()
}

// RENDU
function render() {
  requestAnimationFrame(render)
  renderer.render(stage)
}

// RESIZE
function handleResize() {
  renderer.resize(window.innerWidth, window.innerHeight)
  let test
  clearTimeout(test)
  test = setTimeout(()=> {
    makeCarousel()
  }, 200)
}

function handleScroll(e) {
  console.log( carousel, carousel.x - window.innerWidth)
  if (Math.abs(carousel.x - window.innerWidth) < carousel.width - 45 && e.deltaY > 0 ) { // stop le défilement au dernier sprite (défile tant que x abs < à largeur totale de tous les sprites-1)
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
  ardoise.drawRect(datas.datasArdoises[index].x * ratioVertical, datas.datasArdoises[index].y * ratioVertical, datas.datasArdoises[index].width * ratioVertical, datas.datasArdoises[index].height * ratioVertical)
  ardoise.interactive = true // pour attribuer événements à ardoise
  carousel.addChild(ardoise)

  ardoises.push(ardoise)
}

function onArdoiseMouseDown(mouseData) {
  drawLine = new PIXI.Graphics()
  drawLine.beginFill(0xffffff)
  drawLine.moveTo(mouseData.data.global.x, mouseData.data.global.y)
  stage.addChild(drawLine)

  checkPoints.forEach(function(el) {
    el.mouseover = drawingDetection
  })
  ardoises.forEach(function(el) {
    el.mousemove = onArdoiseMouseMove
    el.mouseup = onArdoiseMouseUp
  })
}

function onArdoiseMouseMove(mouseData) {
  drawLine.lineStyle(5, 0xffffff)
  drawLine.lineTo(mouseData.data.global.x, mouseData.data.global.y)
}

function onArdoiseMouseOut() {
  if (drawLine) {
    TweenLite.to(drawLine, 0.3, {
      alpha: 0,
      onComplete: () => { drawLine.clear() }
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
  drawLine.endFill()
  TweenLite.to(drawLine, 0.3, {
    alpha: 0,
    onComplete: () => { drawLine.clear() }
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
  checkPoint.beginFill(0xffffff, 1)
  checkPoint.drawCircle(0, 0, datas.datasCheckPoints[index].rayon)
  checkPoint.endFill()
  checkPoint.x = datas.datasCheckPoints[index].x * ratioVertical + ardoises[datas.datasCheckPoints[index].ardoise].graphicsData[0].shape.x
  checkPoint.y = datas.datasCheckPoints[index].y * ratioVertical + ardoises[datas.datasCheckPoints[index].ardoise].graphicsData[0].shape.y
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
