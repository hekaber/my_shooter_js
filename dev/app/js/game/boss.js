import { Shape, SHAPE_TYPE } from './shape';

// simple ennemy is a canvas circle
export class Boss extends Shape {
  constructor(ctx, coordX, coordY, image, profileImage){
    super(ctx, coordX, coordY, image);
    this.profileImage = profileImage;
    this.width = Math.floor(image.width * 0.25);
    this.height = Math.floor(image.height * 0.25);
    this.type = SHAPE_TYPE.BOSS;
    this.dx = 5;
    this.front = {
      x: this.x,
      y: this.y + Math.floor(this.height/2)
    }
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.drawImage(
      this.profileImage, this.x, this.y,
      Math.floor(this.width * 0.5), Math.floor(this.height * 0.5)
    );
    this.ctx.fill();
    this.ctx.closePath();
  }

  move(){
      this.x -= this.dx;
  }
}
