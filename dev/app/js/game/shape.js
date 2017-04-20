export const SHAPE_TYPE = {
  NONE : -1,
  SHIP: 0,
  BULLET: 1,
  S_ENNEMY: 2
}

export class Shape {
  constructor(ctx, coordX, coordY, image){
      this.ctx = ctx;
      this.x = coordX;
      this.y = coordY;
      this.image = image;
      this.type = SHAPE_TYPE.NONE;
      this.ID = this.guid();
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.fill();
    this.ctx.closePath();
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
