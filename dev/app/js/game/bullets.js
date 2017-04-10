import {Shape} from './shape';

export class Bullet extends Shape {
  constructor(ctx, coordX, coordY, width, height){
    super(ctx, coordX, coordY);
    this.width = width;
    this.height = height;
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
