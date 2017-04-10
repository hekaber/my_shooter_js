import {shooterSkeleton} from './shooter.ui';
import {CanvasManager} from '../../js/canvas/canvasManager';

export class ShooterComponent {

  constructor(homeSection){
    this.homeSection = homeSection;
    this.gameTitle = 'My Shooter Game';
    this.shipsHeader = 'Available ships';
    this.content = document.getElementById('game_display');
    this.initUI();

    try {
      this.canvasManager = new CanvasManager(
        document.getElementById('shooterCanvas').getContext("2d"),
        document.getElementById('shooterCanvas')
      );
    } catch(e){
      console.log(e.message, e.name);
    }

    this.timer = null;

    // add eventlisteners on play and pause buttons
    document.getElementById("play").addEventListener('click', _ => {
      this.canvasManager.setKeyListeners();
      this.canvasManager.startAnimate();
    });

    document.getElementById("pause").addEventListener('click', _ => {
      if(this.timer){
        this.canvasManager.unsetKeyListeners();
        this.canvasManager.stopAnimate();
      }
    });
  }

  initUI(){
    if(this.content){
      this.content.parentNode.removeChild(this.content);
    }

    let pageSkeleton = this.getPageSkeleton();

    this.homeSection.insertAdjacentHTML('beforeEnd', pageSkeleton);
  }

  initCanvas(){
    this.canvasManager.draw();
  }
  // refreshCanvas(){
  //   this.canvasManager.refresh();
  // }

  getPageSkeleton(){
    let data = {}
    data.gameTitle = this.gameTitle;
    data.shipsHeader = this.shipsHeader;

    return shooterSkeleton(data);
  }
}
