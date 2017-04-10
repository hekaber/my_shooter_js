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
      this.timer = setInterval( _ => {
        this.refreshCanvas();
      }, 10);
    });

    document.getElementById("pause").addEventListener('click', _ => {
      if(this.timer){
        this.canvasManager.unsetKeyListeners();
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
    this.canvasManager.refresh();
  }

  getPageSkeleton(){
    let data = {}
    data.gameTitle = this.gameTitle;
    data.shipsHeader = this.shipsHeader;

    return shooterSkeleton(data);
  }
}
