import { Shape, SHAPE_TYPE } from './shape';

export class Ship extends Shape {
  constructor(ctx, coordX, coordY, size, image){
    super(ctx, coordX, coordY);
    this.size = size;
    this.width = size * 2;
    this.height = size * 2;
    this.image = image;
    this.type = SHAPE_TYPE.SHIP;
    this.dy = 4;
  }

  draw(){
    this.ctx.beginPath();
    if(this.image){
      // TODO: set the size in a cleaner way
      this.ctx.drawImage(this.image, this.x, this.y, 110, 46);
    }
    else {
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.x - this.size, this.y + this.size);
      this.ctx.lineTo(this.x - this.size, this.y - this.size);
    }

    this.ctx.fill();
    this.ctx.closePath();
  }

  moveUp(){
    this.y -= this.dy;
  }

  moveDown(){
    this.y += this.dy;
  }

  isOverZero(){
    return this.y - this.size + this.dy > 0;
  }

  isUnderHeight(h){
    return this.y + this.size + this.dy < h;
  }
}
