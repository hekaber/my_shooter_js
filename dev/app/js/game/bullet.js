import {Shape, SHAPE_TYPE} from './shape';

export class Bullet extends Shape {
  constructor(ctx, coordX, coordY, image){
    super(ctx, coordX, coordY, image);
    this.width = Math.floor(image.width * 0.25);
    this.height = Math.floor(image.height * 0.25);
    this.type = SHAPE_TYPE.BULLET;
    this.dx = 7;
    this.front = {
      x: this.x + this.width,
      y: this.y + Math.floor(this.height/2)
    }
  }

  hits(candidate){
      if(this.front.x >= candidate.x
        && this.front.y >= candidate.y
        && this.front.y <= candidate.y + candidate.height){

        // console.log('hit!!!!! bID: ' + this.ID + ' bullet_x ' + this.front.x +
        //             ' bullet_y ' + this.front.y +
        //             ' candidateID ' + candidate.ID +
        //             ' candidate_x ' + candidate.x +
        //             ' candidate_y ' + candidate.y +
        //             ' candidate_y_down ' + candidate_down +
        //             ' candidate_type ' + candidate.type
        //            );
        return true;
      }
      else{
        return false;
      }
  }

  move(){
    this.x += this.dx;
    this.front.x += this.dx;
  }
}
