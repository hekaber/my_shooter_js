import {Ship} from '../game/ship';
import {SHAPE_TYPE} from '../game/shape';
import {Bullet} from '../game/bullet';
import {SimpleEnnemy} from '../game/simpleEnnemy';
import {CanvasException} from '../exceptions/canvas';
import {ControlManager} from '../control/controlManager';

const FRAMES_PER_SEC = 60;

export class CanvasManager {
  constructor(ctx, canvas){
    this.animreqID = 0;
    this.fps = 60;
    this.fpsInterval = 1000 / this.fps;
    this.startTime = 0;
    this.then = 0;
    //ennemyAppereance between every 100ms and 1s
    this.ennemyAppereance = Math.floor(Math.random() * 100) + 10;


    if (canvas) {
      this.canvas = canvas;
      this.quadTree = new Quadtree({
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height
      }, 4, 20);
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

    this.bullets = {};
    this.ennemies = {};
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
        let bullet = new Bullet(this.ctx, this.ship.x, this.ship.y, 5, 5);
        this.bullets[bullet.ID] = bullet
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
    this.ennemyAppereance--;
    //ennemyAppearance draws circle every random time * 10ms
    if(this.ennemyAppereance < 0){
      // constructor(ctx, coordX, coordY, radius, startAngle, endAngle)
      let radius = 20;

      let ennemy = new SimpleEnnemy(
          this.ctx,
          this.canvas.width - radius/2,
          Math.floor(Math.random() * (this.canvas.height - 2*radius)) + 2*radius,
          radius,
          0,
          Math.PI * 2
        );
      this.ennemies[ennemy.ID] = ennemy;

      this.ennemyAppereance = Math.floor(Math.random() * 100) + 10;
    }

    // ennemies and bullets are generated
    this.fill_quadTree();

    for(var b_key in this.bullets){
      let bullet = this.bullets[b_key];

      // Quadtree.retrieve returns an array
      let candidates = this.quadTree.retrieve(bullet);
      candidates.forEach((candidate) => {
        if(candidate.type !== SHAPE_TYPE.BULLET){
          if(bullet.x >= (candidate.x - candidate.radius) && bullet.x <= (candidate.x + candidate.radius)
            && bullet.y >= (candidate.y - candidate.radius) && bullet.y <= (candidate.y + candidate.radius)){
              this.quadTree.removeObject(bullet);
              this.quadTree.removeObject(candidate);
              delete this.bullets[bullet.ID];
              delete this.ennemies[candidate.ID];
          }
        }
      });
      this.quadTree.cleanup();
    }

    this.bullets = this.draw_elements(this.bullets);
    this.ennemies = this.draw_elements(this.ennemies);

  }

  draw_elements(elements){
    for(var key in elements){
      let element = elements[key];
      if(element.x >= 0){
        element.move();
        element.draw();
        elements[key] = element;
      }
      else {
        delete elements[key];
      }
    }
    return elements;
  }

  fill_quadTree(){
    this.quadTree.clear();
    this.quadTree.insert(this.ship);

    for(var key in this.bullets){
      this.quadTree.insert(this.bullets[key]);
    }

    for(var key in this.ennemies){
      this.quadTree.insert(this.ennemies[key]);
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
