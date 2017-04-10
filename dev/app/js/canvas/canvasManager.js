import {Ship} from '../game/ship';
import {Bullet} from '../game/bullet';
import {CanvasException} from '../exceptions/canvas';
import {ControlManager} from '../control/controlManager'

const FRAMES_PER_SEC = 60;

export class CanvasManager {
  constructor(ctx, canvas){
    this.animreqID = 0;
    this.fps = 60;
    this.fpsInterval = 1000 / this.fps;
    this.startTime = 0;
    this.then = 0;

    if (canvas) {
      this.canvas = canvas;
    }
    else {
      throw new CanvasException("Canvas is undefined!!!");
    }

    if (ctx) {
      this.ctx = ctx;
    }
    else {
      throw new CanvasException("Context is undefined!!");
    }

    this.ship = new Ship(this.ctx, 100, this.canvas.height/2, 25);
    this.bullets = [];
    this.controlManager = null;
  }

  startAnimate(){
    this.then = Date.now();
    this.startTime = this.then;
    this.animate();
  }

  animate(){
    this.animreqID = requestAnimationFrame( _ => this.animate());

    let now = Date.now();
    let elapsed = now - this.then;

    if (elapsed > this.fpsInterval){
      this.then = now - (elapsed % this.fpsInterval);
      this.draw();
    }
  }

  stopAnimate(){
    if(this.animreqID !== 0){
      window.cancelAnimationFrame(this.animreqID);
    }
  }

  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ship.draw();
    if (this.controlManager){
      if(this.controlManager.firePressed){
        console.log('fire!!');
        this.bullets.push(new Bullet(this.ctx, this.ship.x, this.ship.y, 5, 5));
        this.controlManager.firePressed = false;
      }
      else if(this.controlManager.upPressed && this.ship.isOverZero()){
        this.ship.moveUp();
      }
      else if(this.controlManager.downPressed &&
        this.ship.isUnderHeight(this.canvas.height)){

        this.ship.moveDown();
      }
    }
    this.draw_bullets();
  }

  draw_bullets(){
    this.bullets.forEach((element, index) => {
      if(element.x >= 0){
        //test if element is a circle
        element.move();
        element.draw();
        this.bullets[index] = element;
      }
      else {
        this.bullets.splice(index, 1);
      }
    });
  }

  setKeyListeners(){
    if (this.controlManager){
        this.controlManager.setListeners();
    }
    else {
      this.controlManager = new ControlManager();
    }
  }

  unsetKeyListeners(){
    if(this.controlManager){
      this.controlManager.unsetListeners();
    }
  }
}
