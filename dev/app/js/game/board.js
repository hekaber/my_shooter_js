import { Life } from './life';

export class Board {
  constructor(ctx, canvas, coordX, coordY, lifeImage){
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = Math.floor(canvas.height/10);
    this.x = coordX;
    this.y = coordY;
    this.lifes = [];
    this.nbLifes = 3;
    this.lifeImage = lifeImage;
    this.score = 0;
  }

  init(){
    let life = null;
    for(let i=0; i<this.nbLifes; i++){
      if(life){
        let x_gap = life.x + life.width + 5;
        life = new Life(this.ctx, x_gap, life.y, this.lifeImage);
      }
      else{
        life = new Life(this.ctx, this.x + 10, this.y + 10, this.lifeImage);
      }
      this.lifes.push(life);
    }
  }

  setScoreIncrement(points){
    this.score += points;
  }

  setScoreDecrement(points){
    this.score -= points;
  }

  dropLife(){
    this.nbLifes--;
    this.lifes.pop();
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.font="20px Georgia";
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Score ' + this.score, this.x + 110, this.y + 30);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
    this.ctx.closePath();
    this.lifes.forEach((life) => {
      life.draw();
    });

  }
}
