import {shooterSkeleton} from './shooter.ui';
import {Ship} from '../../providers/ship';

export class ShooterComponent {

  constructor(homeSection){
    this.homeSection = homeSection;
    this.gameTitle = 'My Shooter Game';
    this.shipsHeader = 'Available ships';
    this.content = document.getElementById('game_display');
    this.initUI();

    this.canvas = document.getElementById('shooterCanvas');
    this.ctx = document.getElementById('shooterCanvas').getContext("2d");
    this.ship = new Ship(this.ctx, 100, this.canvas.height/2, 25);
    this.timer = null;

    // add eventlisteners on play and pause buttons
    document.getElementById("play").addEventListener('click', _ => {
      this.timer = setInterval( _ => {
        this.refreshCanvas();
      }, 1000);
    });

    document.getElementById("pause").addEventListener('click', _ => {
      if(this.timer){
        clearInterval(this.timer);
      }
    });
  }

  initUI(){
    if(this.content){
      gameDisplay.parentNode.removeChild(this.content);
    }

    let pageSkeleton = this.getPageSkeleton();

    this.homeSection.insertAdjacentHTML('beforeEnd', pageSkeleton);
  }

  refreshCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ship.draw();
    console.log("yo!!");
  }

  getPageSkeleton(){
    let data = {}
    data.gameTitle = this.gameTitle;
    data.shipsHeader = this.shipsHeader;

    return shooterSkeleton(data);
  }
}
