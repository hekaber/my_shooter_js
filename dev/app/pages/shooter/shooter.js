import {shooterSkeleton} from './shooter.ui';
import {Ship} from '../../providers/ship';

export class ShooterPage {

  constructor(appBody){
    this.appBody = appBody;
    this.gameTitle = 'My Shooter Game';
    this.shipsHeader = 'Available ships';
    this.initUI();


    this.canvas = document.getElementById('shooterCanvas');
    this.ctx = document.getElementById('shooterCanvas').getContext("2d");
    this.ship = new Ship(this.ctx, 100, this.canvas.height/2, 25);
  }

  initUI(){
    if(document.getElementsByTagName('section')[1]){
      document.getElementsByTagName('section')[1]
      .parentNode.removeChild(document.getElementsByTagName('section')[1]);
    }

    let pageSkeleton = this.getPageSkeleton();

    this.appBody.insertAdjacentHTML('beforeEnd', pageSkeleton);
  }

  refreshCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ship.draw();
  }

  // launchTimer(){
  //   this.timer = setInterval(this.refreshCanvas, 1000);
  // }

  getPageSkeleton(){
    let data = {}
    data.gameTitle = this.gameTitle;
    data.shipsHeader = this.shipsHeader;

    return shooterSkeleton(data);
  }
}
