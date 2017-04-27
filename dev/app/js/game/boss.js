import { Shape, SHAPE_TYPE } from './shape';
import { Explosion } from './explosion';

// simple ennemy is a canvas circle
export class Boss extends Shape {
  constructor(ctx, canvas, coordX, coordY, image, profileImage){
    super(ctx, coordX, coordY, image);
    this.profileImage = profileImage;
    this.finalExplosions = [];
    console.log(this.finalExplosions);
    this.feLenght = 15;
    this.feIndex = 0;
    this.canvas = canvas;
    this.width = Math.floor(image.width * 0.2);
    this.height = Math.floor(image.height * 0.2);
    this.type = SHAPE_TYPE.BOSS;
    this.life = 100;
    this.destruction = false;
    this.dx = 5;
    this.dy = 5;
    this.front = {
      x: this.x,
      y: this.y + Math.floor(this.height/2)
    }
  }

  initFinalExplosions(explosionImages){
    for(let i=0; i<this.feLenght; i++){
      this.finalExplosions.push(
        new Explosion(this.ctx, 0, 0, explosionImages)
      );
    }
  }

  decrementLife(){
    this.life -= 10;
    if(this.life == 0) this.destruction = true;
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    let piX = this.x + Math.floor(this.width * 0.6);
    let piY = this.y + Math.floor(this.height * 0.75);
    this.ctx.drawImage(
      this.profileImage, piX, piY,
      Math.floor(this.width * 0.2), Math.floor(this.height * 0.2)
    );
    this.ctx.fill();
    this.ctx.closePath();

    if(this.destruction){
      if(this.feIndex < this.feLenght){
        let currExplosion = this.finalExplosions[this.feIndex];
        if(currExplosion.x == 0 && currExplosion.y == 0){
          currExplosion.x = this.genRandomCoord(this.x, this.width);
          currExplosion.y = this.genRandomCoord(this.y, this.height);
        }
        currExplosion.draw();
        if(currExplosion.imgCount >= 10){
          this.feIndex++;
        }
      }
    }
  }

  move(){
    if(this.destruction){
      this.dy = Math.abs(this.dy);
      this.y += this.dy;
      this.x -= Math.floor(this.dx * 0.5);
    }
    else if(this.x <= this.canvas.width - (this.width + 50)){
      this.y += this.dy;

      if(this.y + this.height >= this.canvas.height || this.y <= 0){
        this.dy = -this.dy;
      }
    }
    else {
      this.x -= this.dx;
    }
  }


}
