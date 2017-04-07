import {shooterSkeleton} from './shooter.ui';
import {Ship} from '../../providers/ship';

export class ShooterPage {

  constructor(homeSection){
    this.homeSection = homeSection;
    this.gameTitle = 'My Shooter Game';
    this.shipsHeader = 'Available ships';
    this.initUI();


    this.canvas = document.getElementById('shooterCanvas');
    this.ctx = document.getElementById('shooterCanvas').getContext("2d");
    this.ship = new Ship(this.ctx, 100, this.canvas.height/2, 25);
  }

  initUI(){
    let gameDisplay = document.getElementById('game_display');
    
    if(gameDisplay){
      gameDisplay.parentNode.removeChild(gameDisplay);
    }

    let pageSkeleton = this.getPageSkeleton();

    this.homeSection.insertAdjacentHTML('beforeEnd', pageSkeleton);
  }

  refreshCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ship.draw();
  }

  getPageSkeleton(){
    let data = {}
    data.gameTitle = this.gameTitle;
    data.shipsHeader = this.shipsHeader;

    return shooterSkeleton(data);
  }
}
