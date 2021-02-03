/*--------------------------------------------------
Vars
--------------------------------------------------*/
let winW = window.innerWidth,
    winH = window.innerHeight,
    ticker = 0,
    Blobs = [];


/*--------------------
Get Mouse
--------------------*/
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, dir: '' };
let shadowMove = {x: 1, y: 1};
let clicked = false;
const getMouse = (e) => {
  mouse = {
    x: e.clientX || e.pageX || e.touches[0].pageX || 0 || window.innerWidth / 2,
    y: e.clientY || e.pageX || e.touches[0].pageY || 0 || window.innerHeight / 2,
    dir: (getMouse.x > e.clientX) ? 'left' : 'right'
  }
  
  shadowMove.x = (winW / 2 - mouse.x) / 10;
  shadowMove.y = (winH / 2 - mouse.y) / 10;
};
['mousemove', 'touchstart', 'touchmove'].forEach(e => {
  window.addEventListener(e, getMouse);
});
window.addEventListener('mousedown', (e) => {
  e.preventDefault();
  clicked = true;
});
window.addEventListener('mouseup', () => {
  clicked = false;
});


/*--------------------------------------------------
Init
--------------------------------------------------*/
var app = new PIXI.Application({width: winW, height: winH, transparent: true, antialias: true, view: canvas});
app.renderer.autoResize = true;


/*--------------------------------------------------
Blob
--------------------------------------------------*/
class Blob {
  constructor(options) {
    Object.assign(this, options);
    this.el = new PIXI.Graphics();
    this.stage();
    this.resize();
    
  }
  
  stage () {
    app.stage.addChild(this.el);
    if (this.shadow) {
      this.shadowFilter = new PIXI.filters.BlurFilter();
      this.shadowFilter.blur = 10;
      this.el.filters = [this.shadowFilter];
      this.el.alpha = .25;
    } else {
    }
  }
  
  resize() {
    
  }
  
  animate() {
    this.el.clear();
    this.el.beginFill(this.fill);
    this.el.x = winW / 2 + ((this.shadow) ? shadowMove.x : 0);
    this.el.y = winH / 2 + ((this.shadow) ? shadowMove.y : 0);

    let moveSin = Math.sin(ticker) * this.parkinson;
    let moveCos = Math.cos(ticker) * this.parkinson;
    
    this.el.moveTo(0, -this.radius);
    this.el.quadraticCurveTo(this.radius, -this.radius , this.radius, 0 + moveSin);
    this.el.quadraticCurveTo(this.radius - moveCos, this.radius + moveSin, 0 - moveCos, this.radius + moveSin);
    this.el.quadraticCurveTo(-this.radius + moveCos, this.radius, -this.radius, 0 - moveSin);
    this.el.quadraticCurveTo(-this.radius, -this.radius, 0, -this.radius);
    
    this.el.endFill();
    
    this.el.rotation = ticker / 10;
  }
}

let shadow6 = new Blob({fill: 0x000000, radius: 280, parkinson: 16, shadow: true});
Blobs.push(shadow6);

let blob6 = new Blob({fill: 0x001d32, radius: 300, parkinson: 11});
Blobs.push(blob6);

let shadow5 = new Blob({fill: 0x000000, radius: 250, parkinson: 16, shadow: true});
Blobs.push(shadow5);

let blob5 = new Blob({fill: 0x012e55, radius: 250, parkinson: 20});
Blobs.push(blob5);

let shadow4 = new Blob({fill: 0x000000, radius: 200, parkinson: 15, shadow: true});
Blobs.push(shadow4);

let blob4 = new Blob({fill: 0x005c9d, radius: 200, parkinson: 19});
Blobs.push(blob4);

let shadow3 = new Blob({fill: 0x000000, radius: 160, parkinson: 12, shadow: true});
Blobs.push(shadow3);

let blob3 = new Blob({fill: 0x028abe, radius: 160, parkinson: 16});
Blobs.push(blob3);

let shadow2 = new Blob({fill: 0x000000, radius: 120, parkinson: 11, shadow: true});
Blobs.push(shadow2);

let blob2 = new Blob({fill: 0x02b2ed, radius: 120, parkinson: 13});
Blobs.push(blob2);

let shadow1 = new Blob({fill: 0x000000, radius: 80, parkinson: 13, shadow: true});
Blobs.push(shadow1);

let blob1 = new Blob({fill: 0x93e1ed, radius: 80, parkinson: 12});
Blobs.push(blob1);


/*--------------------------------------------------
Animation
--------------------------------------------------*/
app.ticker.add(function() {
  ticker += 0.1;
  Blobs.forEach(b => {
    b.animate();
  });
  
  shadowMove.x += Math.cos(ticker) * 1;
  shadowMove.y += Math.sin(ticker) * 1;
});


/*--------------------------------------------------
Resize
--------------------------------------------------*/
const resize = () => {
  winW = window.innerWidth;
  winH = window.innerHeight;
  app.renderer.resize(winW, winH);
  Blobs.forEach(b => {
    b.resize();
  });
}
window.addEventListener('resize', resize);




























import '../scss/main.scss';
import * as PIXI from 'pixi.js';

const canvas = document.getElementById('myCanvas');
let winW = window.innerWidth
let winH = window.innerHeight

const app = new PIXI.Application({
    view: canvas,
    width: winW, height: winH, transparent: true,
    resolution: window.devicePixelRatio || 1,
});
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight)

let moveSin = 16
let moveCos = 16
let radius = 175
let ticker = 0
const graphics = new PIXI.Graphics()
graphics.x = winW / 2;
graphics.y = winH / 2;
graphics.beginFill(0xa103fc);

graphics.moveTo(0, -radius);
graphics.quadraticCurveTo(radius, -radius , radius, 0 + moveSin);
graphics.quadraticCurveTo(radius - moveCos, radius + moveSin, 0 - moveCos, radius + moveSin);
graphics.quadraticCurveTo(-radius + moveCos, radius, -radius, 0 - moveSin);
graphics.quadraticCurveTo(-radius, -radius, 0, -radius);
graphics.endFill()

let myFilter = new PIXI.filters.BlurFilter()
myFilter.blur = 10
myFilter.alpha = 0.25
graphics.filters = [myFilter]

graphics.rotation = ticker / 10
app.ticker.add(() => {
    ticker += 0.1;
})
console.log(app.ticker)

app.stage.addChild(graphics);




// (this.radius, -this.radius , this.radius, 0 + moveSin);
// (this.radius - moveCos, this.radius + moveSin, 0 - moveCos, this.radius + moveSin);
// (-this.radius + moveCos, this.radius, -this.radius, 0 - moveSin);
// (-this.radius, -this.radius, 0, -this.radius);
      