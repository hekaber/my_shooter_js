import { Ship } from '../game/ship';
import { SHAPE_TYPE } from '../game/shape';
import { Bullet } from '../game/bullet';
import { SimpleEnnemy } from '../game/simpleEnnemy';
import { Explosion } from '../game/explosion';
import { Board } from '../game/board';
import { CanvasException } from '../exceptions/canvas';
import { ControlManager } from '../control/controlManager';
import { AudioManager } from '../control/audioManager';

const FRAMES_PER_SEC = 60;


export class CanvasManager {
  constructor(ctx, canvas, images){
    this.animreqID = 0;
    this.fps = 30;
    this.fpsInterval = 1000 / this.fps;
    this.startTime = 0;
    this.then = 0;
    this.images = null;
    this.ship = null;
    this.bullets = {};
    this.ennemies = {};
    this.explosions = {};
    this.controlManager = null;
    this.audioManager = null;
    this.images = images;
    this.explosionImages = [
      images['expl_1'], images['expl_2'], images['expl_3'],
      images['expl_4'], images['expl_5'], images['expl_6'],
      images['expl_7'], images['expl_8'], images['expl_9'],
      images['expl_10'], images['expl_11']
    ];
    //ennemyAppereance between every 100ms and 1s
    this.ennemyAppereance = Math.floor(Math.random() * 100) + 10;

    if (canvas) {
      this.canvas = canvas;
      this.quadTree = new Quadtree({
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height
      }, 5, 5);
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
    this.board = new Board(ctx, canvas, 0, 0, this.images['heart']);
    this.board.init();
  }

  setImages(images){
    this.images = images;
  }

  setAudios(audios){
    this.audioManager = new AudioManager(audios);
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

  startAudio(){
    if(this.audioManager){
      this.audioManager.startMusic();
    }
  }

  pauseAudio(){
    if(this.audioManager){
      this.audioManager.pauseMusic();
    }
  }

  draw(){

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    /*
      GAME BOARD
    */
    /*
      SHIP MANAGEMENT
    */
    if (this.controlManager && this.ship){
      if(this.controlManager.firePressed){

        let bullet = new Bullet(this.ctx, this.ship.front.x,
          this.ship.front.y, this.images['bullet_1']);
        // console.log('fire!! bID ' + bullet.ID + 'front_x ' + this.ship.front.x +
        //   ' front_y ' + this.ship.front.y
        // );
        this.bullets[bullet.ID] = bullet;
        this.audioManager.playFire();
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

    /*
      ENNEMIES MANAGEMENT
    */
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

    /*
      COLLISION DETECTION BEGIN
    */
    // put all elements in the quad tree
    this.fillQuadTree();

    if(this.ship){
      let ship_candidates = this.quadTree.retrieve(this.ship);

      ship_candidates.forEach((candidate) => {
        if(candidate.type == SHAPE_TYPE.S_ENNEMY){
          // let my_candidates = [];
          if(this.ship.hits(candidate)){
            // my_candidates.push(candidate);
            //GAME OVER process or Ship life -1
            this.audioManager.playExpl2();
            this.quadTree.removeObject(this.ship);
            this.quadTree.removeObject(candidate);
            this.board.dropLife();

            if(this.board.nbLifes > 0){
              this.ship.collapse();
            }
            else {
              // GAME OVER
              this.ship = null;
            }

            delete this.ennemies[candidate.ID];
          }
          // console.log('candidates for ship ' + this.ship.ID + ' coordx ' + this.ship.front.x + ' coordy ' + this.ship.front.y + ' candidates ');
          // console.log(my_candidates);
        }
      });
    }

    for(var b_key in this.bullets){
      let bullet = this.bullets[b_key];

      // Quadtree.retrieve returns an array
      let candidates = this.quadTree.retrieve(bullet);
      candidates.forEach((candidate) => {
        // let my_candidates = [];
        if(candidate.type == SHAPE_TYPE.S_ENNEMY){
          // my_candidates.push(candidate);
          if(bullet.hits(candidate)){

            this.board.setScoreIncrement(100);
            this.quadTree.removeObject(bullet);
            this.quadTree.removeObject(candidate);
            delete this.bullets[bullet.ID];
            delete this.ennemies[candidate.ID];
            this.audioManager.playExpl1();
            let explosion = new Explosion(
              this.ctx, candidate.x - candidate.width,
              candidate.y - candidate.height,
              this.explosionImages
            );
            this.explosions[explosion.ID] = explosion;
          }
        }
        // console.log('candidates for bullet ' + bullet.ID + ' coordx ' + bullet.x + ' coordy ' + bullet.y + ' candidates ');
        // console.log(my_candidates);
      });
      this.quadTree.cleanup();
    }
    /*
      COLLISION DETECTION END
    */

    /*
      DRAW ELEMENTS IN CANVAS
    */

    /*background*/
    this.drawBackground();
    this.board.draw();
    /*ship*/
    if(this.ship){
      this.ship.draw();
    }

    /*ship bullets*/
    this.bullets = this.drawElements(this.bullets);
    // console.log(this.bullets);
    /*ennemies*/
    this.ennemies = this.drawElements(this.ennemies);
    /*explosions*/
    this.explosions = this.drawExplosions(this.explosions);
  }

  drawExplosions(explosions){
    for(var key in explosions){
      let explosion = explosions[key];
      if(explosion.imgCount >= 11) delete explosions[key];
      explosion.draw();
    }
    return explosions;
  }

  drawElements(elements){
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

  drawBackground(){
    this.ctx.beginPath();
    this.ctx.drawImage(this.images['BG'], 0, 0,
                       this.canvas.width, this.canvas.height);
    this.ctx.fill();
    this.ctx.closePath();
  }

  fillQuadTree(){
    this.quadTree.clear();
    if(this.ship){
      this.quadTree.insert(this.ship);
    }

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
