import { Shape, SHAPE_TYPE } from './shape';

export class Life extends Shape {
  constructor(ctx, coordX, coordY, image){
    super(ctx, coordX, coordY, image);
    this.width = Math.floor(image.width * 0.05);
    this.height = Math.floor(image.height * 0.05);
    this.type = SHAPE_TYPE.LIFE;
    this.dx = 5;
    this.front = {
      x: this.x + this.width,
      y: this.y + Math.floor(this.height/2)
    }
  }
}
