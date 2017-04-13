import { Shape, SHAPE_TYPE } from './shape';

export class Ship extends Shape {
  constructor(ctx, coordX, coordY, size){
    super(ctx, coordX, coordY);
    this.size = size;
    this.width = size * 2;
    this.height = size * 2;
    this.type = SHAPE_TYPE.SHIP;
    this.dy = 2;
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - this.size, this.y + this.size);
    this.ctx.lineTo(this.x - this.size, this.y - this.size);
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
