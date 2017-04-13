import { Shape, SHAPE_TYPE } from './shape';

// simple ennemy is a canvas circle
export class SimpleEnnemy extends Shape {
  constructor(ctx, coordX, coordY, radius, startAngle, endAngle){
    super(ctx, coordX, coordY);
    this.radius = radius;
    this.width = radius * 2;
    this.height = radius * 2;
    this.type = SHAPE_TYPE.S_ENNEMY;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.dx = 1;
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.startAngle,
      this.endAngle, true);
    this.ctx.fill();
    this.ctx.closePath();
  }

  move(){
      this.x -= this.dx;
  }
}
