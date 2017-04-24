import { Shape, SHAPE_TYPE } from './shape';

export class Ship extends Shape {
  constructor(ctx, coordX, coordY, size, image){
    super(ctx, coordX, coordY, image);
    this.height = Math.floor(this.image.height * 0.15);
    this.width = Math.floor(this.image.width * 0.15);
    this.front = {
      x: this.x + this.width,
      y: this.y + Math.floor(this.height/2)
    };

    this.type = SHAPE_TYPE.SHIP;
    this.dy = 4;
    this.collapseCount = 0;
    this.toggle = true;
  }

  hits(candidate){
    // for console log
    // let candidate_down = candidate.y + candidate.height;
    if(this.front.x >= candidate.x
      && this.front.y >= candidate.y
      && this.front.y <= candidate.y + candidate.height){

        // console.log('hit!!!!! sID: ' + this.ID + ' ship_x ' + this.front.x +
        //             ' ship_y ' + this.front.y +
        //             ' candidateID ' + candidate.ID +
        //             ' candidate_x ' + candidate.x +
        //             ' candidate_y ' + candidate.y +
        //             ' candidate_y_down ' + candidate_down +
        //             ' candidate_type ' + candidate.type
        //            );
        return true
    }
    else {
      return false;
    }
  }

  draw(){
    this.ctx.beginPath();
    // if(this.collapseCount > 0){
    //   if(this.toggle) this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    //   if(this.collapseCount % 10 == 0) this.toggle = false;
    //   this.collapseCount--;
    // }
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.fill();
    this.ctx.closePath();
  }

  collapse(){
      this.collapseCount = 100;
  }

  setLifes(lifes){

  }

  moveUp(){
    this.y -= this.dy;
    this.front.y -= this.dy;
  }

  moveDown(){
    this.y += this.dy;
    this.front.y += this.dy;
  }

  isOverZero(){
    return this.y > 0;
  }

  isUnderHeight(h){
    return this.y + this.height < h;
  }
}
