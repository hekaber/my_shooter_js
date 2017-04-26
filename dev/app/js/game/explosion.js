import { Shape, SHAPE_TYPE } from './shape';

export class Explosion extends Shape{
  constructor(ctx, coordX, coordY, images){
    super(ctx, coordX, coordY, null);
    this.images = images;
    this.imgCount = 0;
    this.drawInterval = 10;
    this.type = SHAPE_TYPE.EXPL;
  }

  draw(){
    if(this.imgCount < 11){
      this.ctx.beginPath();
      let currImage = this.images[this.imgCount];
      let width = Math.floor(currImage.width * 0.25);
      let height = Math.floor(currImage.height * 0.25);
      this.ctx.drawImage(currImage, this.x, this.y, width, height);
      this.ctx.fill();
      this.ctx.closePath();
      this.imgCount++;
    }
  }
}
