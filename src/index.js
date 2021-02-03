import '../scss/main.scss';
import * as PIXI from 'pixi.js';

/*--------------------------------------------------
Vars
--------------------------------------------------*/
let canvas = document.getElementById('myCanvas')
let winW = window.innerWidth,
    winH = window.innerHeight,
    ticker = 0,
    Blobs = [];




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
  }
  
  stage () {
    app.stage.addChild(this.el);
    if (this.shadow) {
      this.shadowFilter = new PIXI.filters.BlurFilter();
      this.shadowFilter.blur = 20;
      this.el.filters = [this.shadowFilter];
      this.el.alpha = .25;
    } else {
    }
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


let blob6 = new Blob({fill: 0x001d32, radius: 300, parkinson: 11});


/*--------------------------------------------------
Animation
--------------------------------------------------*/
app.ticker.add(function() {
  ticker += 0.1;
  blob6.animate()
});


