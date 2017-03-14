window.onload = function() {
  initCanvas()
}

/*** LISTENERS ***/
window.addEventListener('resize', handleResize)
window.addEventListener('mousedown', onMouseDown)
window.addEventListener('mouseup', onMouseUp)


/*** SCENE SETUP ***/
let renderer,
    stage

let nbr_yeux = 30,
    circles = [],
    dessinPoint

/*** CANVAS DRAWING ***/
function initCanvas() {
  renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight)
  renderer.backgroundColor = 0x000000
  renderer.autoResize = true
  document.body.appendChild(renderer.view)

  stage = new PIXI.Container()

  drawManyCircles()
  render()
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

function drawCircle(i) {
  let circle = new PIXI.Graphics()
  circle.beginFill(0xffffff)
  circle.drawCircle(0, 0, Math.random()*10*i)
  circle.endFill()
  circle.x = Math.random()*1000*i
  circle.y = Math.random()*100*i
  stage.addChild(circle)
  circles.push(circle)
}

function drawManyCircles() {
  for (let i = 0; i < nbr_yeux; i++) {
    drawCircle(i)
  }
}

function animate() {
  for (var i = 0; i < circles.length; i++) {
    circles[i].x += 0.5
  }
}

function onMouseDown(event) {
  dessinPoint = new PIXI.Graphics()
  dessinPoint.beginFill(0xffffff)
  dessinPoint.moveTo(event.offsetX, event.offsetY)
  stage.addChild(dessinPoint)
  window.addEventListener('mousemove', onMouseDrag)
}

function onMouseDrag(event) {
  dessinPoint.lineStyle(3, 0xffffff)
  dessinPoint.lineTo(event.offsetX, event.offsetY)
}

function onMouseUp(event) {
  dessinPoint.endFill()
  window.removeEventListener('mousemove', onMouseDrag)
}
