window.onload = function() {
  initCanvas()
}

/*** SCENE SETUP ***/
let renderer,
    stage,
    bg,
    bgFront,
    light2,
    light1,
    frite,
    mask,
    container
let count = 0

/*** CANVAS DRAWING ***/

function initCanvas() {
  renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { antialias: true })
  renderer.backgroundColor = 0x000000
  renderer.autoResize = true
  document.body.appendChild(renderer.view)

  stage = new PIXI.Container()
  stage.interactive = true

  setImages()
  createMask()
  listeners()
  animate()
}

function setImages() {
  // bg = PIXI.Sprite.fromImage('./assets/carousel-1.jpg')
  // bg.anchor.x = 0.5
  // bg.anchor.y = 0.5
  // bg.position.x = window.innerWidth / 2
  // bg.position.y = window.innerHeight / 2
  // stage.addChild(bg)

  container = new PIXI.Container()
  container.position.x = window.innerWidth / 2
  container.position.y = window.innerHeight / 2

  // bgFront = PIXI.Sprite.fromImage('./assets/carousel-1.jpg')
  // bgFront.anchor.x = 0.5
  // bgFront.anchor.y = 0.5
  // container.addChild(bgFront)

  // light2 = PIXI.Sprite.fromImage('./assets/carousel-1.jpg')
  // light2.anchor.x = 0.5
  // light2.anchor.y = 0.5
  // container.addChild(light2)

  // light1 = PIXI.Sprite.fromImage('./assets/carousel-3.jpg')
  // light1.anchor.x = 0.5
  // light1.anchor.y = 0.5
  // container.addChild(light1)

  frite = PIXI.Sprite.fromImage('./assets/carre_bleu.png')
  frite.anchor.x = 0.5
  frite.anchor.y = 0.5
  container.addChild(frite)

  stage.addChild(container)
}

function createMask() {
  // let's create a moving mask
  // mask = new PIXI.Graphics()
  // stage.addChild(mask)
  // mask.position.x = window.innerWidth / 2
  // mask.position.y = window.innerHeight / 2
  // mask.lineStyle(0)
  // container.mask = mask

  mask = PIXI.Sprite.fromImage('./assets/carre_rouge.png')
  stage.addChild(mask)
  mask.position.x = window.innerWidth / 2 - 100
  mask.position.y = window.innerHeight / 2 - 100
  container.mask = mask
}

function listeners() {
  stage.on('click', onClick)
  stage.on('tap', onClick)
}

function onClick() {
  if(!container.mask) {
    container.mask = mask
  } else {
    container.mask = null
  }
}

function animate() {
    // bg.rotation += 0.01
    // bgFront.rotation -= 0.01

    //light1.rotation += 0.01
    // light2.rotation += 0.01

    // frite.scale.x = 1 + Math.sin(count) * 0.04
    // frite.scale.y = 1 + Math.cos(count) * 0.04

    // count += 0.1

    //mask.clear()

  // mask.beginFill(0x8bc5ff, 0.4)
  // mask.moveTo(-120, -180)
  // mask.lineTo(-120, 250)
  // mask.lineTo(120, -150)
  // mask.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20)
  // mask.lineTo(-320 + Math.cos(count)* 20, 100 + Math.sin(count)* 20)
  // mask.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count)* 20)
  // mask.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count)* 20)
  // mask.lineTo(-120 + Math.cos(count)* 20, 100 + Math.sin(count)* 20)
  // mask.lineTo(-120 + Math.sin(count) * 20, -300 + Math.cos(count)* 20)
  // mask.lineTo(-320 + Math.sin(count) * 20, -100 + Math.cos(count)* 20)
  // mask.rotation = count * 0.1

  render()
}

function render() {
  requestAnimationFrame(animate)
  renderer.render(stage)
}






