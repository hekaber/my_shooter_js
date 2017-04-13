export const SHAPE_TYPE = {
  NONE : -1,
  SHIP: 0,
  BULLET: 1,
  S_ENNEMY: 2
}

export class Shape {
  constructor(ctx, coordX, coordY){
      this.ctx = ctx;
      this.x = coordX;
      this.y = coordY;
      this.width = 0;
      this.height = 0;
      this.drawIt = false;
      this.type = SHAPE_TYPE.NONE;
      this.ID = this.guid();
  }

  draw(){

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
