window.onload = function() {
  initCanvas()
}

/*** LISTENERS ***/
window.addEventListener('resize', handleResize)
window.addEventListener('keydown',  keyDetected)


/*** SCENE SETUP ***/
let renderer,
    stage
let nbr_yeux = 30

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
  renderer.render(stage)
}

// RESIZE
function handleResize() {
  renderer.resize(window.innerWidth, window.innerHeight)
}

function drawCircle(i) {
  var circle = new PIXI.Graphics();
  circle.beginFill(0xffffff);
  circle.drawCircle(0, 0, Math.random()*10*i);
  circle.endFill();
  circle.x = Math.random()*1000*i;
  circle.y = Math.random()*100*i;
  stage.addChild(circle);
}

function drawManyCircles() {
  for (let i = 0; i < nbr_yeux; i++) {
    drawCircle(i);
  }
}

function keyDetected(event) {
  var key = event.keyCode || event.which;
    switch(key) {
      case 89 :  // touche y  
        alert("TOUCHE Y APPUYEE");
        break;
      default :
        return true;
    }
}