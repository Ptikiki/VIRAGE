window.onload = function() {
  initCanvas()
}

/*** LISTENERS ***/
window.addEventListener('resize', handleResize)

/*** SCENE SETUP ***/
let renderer,
    stage,
    eye,
    eyes = []

/*** CANVAS DRAWING ***/
function initCanvas() {
  renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { antialias: true })
  renderer.backgroundColor = 0x000000
  renderer.autoResize = true
  document.body.appendChild(renderer.view)

  stage = new PIXI.Container()

  initEyes()
  animate()
}

function initEyes() {
  for(let i = 0; i < datas.datasEyes.length; i++) {
    drawEye(i)
  }

  eyes.forEach(function(el) {
    el.mouseover = onMouseOver
    el.mouseout = onMouseOut
  })
}

// RESIZE
function handleResize() {
  renderer.resize(window.innerWidth, window.innerHeight)
}

function drawEye(i) {
  eye = PIXI.Sprite.fromImage('./assets/eyes.png') 
  eye.x = datas.datasEyes[i].x
  eye.y = datas.datasEyes[i].y
  eye.width = 200
  eye.height = 2
  eye.interactive = true
  stage.addChild(eye)
  eyes.push(eye)
}

function onMouseOver(el) {
  console.log(el.target)
  if (el.target != null) {
    TweenLite.to(this, 0.5, {
      height: 100
    })
  }
}

function onMouseOut(el) {
  //console.log("sortie")
  TweenLite.to(this, 10, {
    height: 2
  })
}

function animate() {
  render()
}

// RENDU
function render() {
  requestAnimationFrame(render)
  renderer.render(stage)
}