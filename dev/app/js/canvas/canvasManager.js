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
    this.fps = 30;
    this.fpsInterval = 1000 / this.fps;
    this.startTime = 0;
    this.then = 0;
    this.images = null;
    //ennemyAppereance between every 100ms and 1s
    this.ennemyAppereance = Math.floor(Math.random() * 100) + 10;

    if (canvas) {
      this.canvas = canvas;
      this.quadTree = new Quadtree({
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height
      }, 5, 10);
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

    this.ship = null;

    this.bullets = {};
    this.ennemies = {};
    this.controlManager = null;

  }

  setImages(images){
    this.images = images;
  }

  createShip(){
    this.ship = new Ship(this.ctx, 100, this.canvas.height/2, 25,
      this.images['warrior_1']);
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

        let bullet = new Bullet(this.ctx, this.ship.bullet_start.x,
          this.ship.bullet_start.y, this.images['bullet_1']);
        // console.log('fire!! bID ' + bullet.ID + 'bullet_start_x ' + this.ship.bullet_start.x +
        //   ' bullet_start_y ' + this.ship.bullet_start.y
        // );
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

      let ennemyImage = this.images['drone_1_reverse'];
      let ennemyX = this.canvas.width;
      let ennemyY = Math.floor(Math.random()*(this.canvas.height - Math.floor(ennemyImage.height * 0.25))) + 2 * Math.floor(ennemyImage.height * 0.25);
      let ennemy = new SimpleEnnemy(this.ctx, ennemyX, ennemyY, ennemyImage);
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
        let my_candidates = [];
        if(candidate.type == SHAPE_TYPE.S_ENNEMY){
          my_candidates.push(candidate);
          if(bullet.hits(candidate)){
            this.quadTree.removeObject(bullet);
            this.quadTree.removeObject(candidate);
            delete this.bullets[bullet.ID];
            delete this.ennemies[candidate.ID];
          }
        }
        // console.log('candidates for bullet ' + bullet.ID + ' coordx ' + bullet.x + ' coordy ' + bullet.y + ' candidates ');
        // console.log(my_candidates);
      });
      this.quadTree.cleanup();
    }

    this.bullets = this.draw_elements(this.bullets);
    console.log(this.bullets);
    this.ennemies = this.draw_elements(this.ennemies);

  }

  draw_elements(elements){
    for(var key in elements){
      let element = elements[key];
      let condition = false;
      switch (element.type) {
        case SHAPE_TYPE.BULLET:
          condition = element.x <= this.canvas.width;
          break;
        case SHAPE_TYPE.S_ENNEMY:
          condition = element.x + element.width >= 0;
        default:
          console.log('Not an existing type!!!');
      }

      if(condition){
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
