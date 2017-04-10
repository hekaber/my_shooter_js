import {Ship} from '../game/ship';
import {CanvasException} from '../exceptions/canvas';
import {ControlManager} from '../control/controlManager'


export class CanvasManager {
  constructor(ctx, canvas){
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
    this.controlManager = null;
  }

  refresh(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
  }

  draw(){
    let dx_fire = 5;
    let dy = 2;

    this.ship.draw();
    if (this.controlManager){
      if(this.controlManager.firePressed){
        console.log('fire!!');
        // bullet.x = triangle.x;
        // bullet.y = triangle.y;
        //
        // my_bullets.push(bullet);
        // firePressed = false;
      }
      else if(this.controlManager.upPressed &&
        this.ship.y - this.ship.size + dy > 0){

        this.ship.y -= dy;
      }
      else if(this.controlManager.downPressed &&
        this.ship.y + this.ship.size + dy < this.canvas.height){
          
        this.ship.y += dy;
      }
    }
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
