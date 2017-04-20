import { Shape, SHAPE_TYPE } from './shape';

// simple ennemy is a canvas circle
export class SimpleEnnemy extends Shape {
  constructor(ctx, coordX, coordY, image){
    super(ctx, coordX, coordY, image);
    this.width = Math.floor(image.width * 0.25);
    this.height = Math.floor(image.height * 0.25);
    this.type = SHAPE_TYPE.S_ENNEMY;
    this.dx = 5;
  }

  move(){
      this.x -= this.dx;
  }
}
