import { Shape } from './shape';

// simple ennemy is a canvas circle
export class simpleEnnemy extends Shape {
  constructor(ctx, coordX, coordY, radius, startAngle, endAngle){
    super(ctx, coordX, coordY);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.startAngle,
      this.endAngle, true);
    this.ctx.fill();
    this.ctx.closePath();
  }
  
}
