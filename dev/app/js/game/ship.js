import { Shape } from './shape';

export class Ship extends Shape {
  constructor(ctx, coordX, coordY, size){
    super(ctx, coordX, coordY);
    this.size = size;
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - this.size, this.y + this.size);
    this.ctx.lineTo(this.x - this.size, this.y - this.size);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
