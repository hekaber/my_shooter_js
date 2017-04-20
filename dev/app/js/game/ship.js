import { Shape, SHAPE_TYPE } from './shape';

export class Ship extends Shape {
  constructor(ctx, coordX, coordY, size, image){
    super(ctx, coordX, coordY, image);
    this.height = Math.floor(this.image.height * 0.2);
    this.width = Math.floor(this.image.width * 0.2);
    this.bullet_start = {
      x: this.x + this.width,
      y: this.y + Math.floor(this.height/2)
    };

    this.type = SHAPE_TYPE.SHIP;
    this.dy = 4;
  }

  moveUp(){
    this.y -= this.dy;
    this.bullet_start.y -= this.dy;
  }

  moveDown(){
    this.y += this.dy;
    this.bullet_start.y += this.dy;
  }

  isOverZero(){
    return this.y > 0;
  }

  isUnderHeight(h){
    return this.y + this.height < h;
  }
}
