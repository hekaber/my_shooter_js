import {shooterSkeleton} from './shooter.ui';
import {CanvasManager} from '../../js/canvas/canvasManager';
import { ImagesPreloader } from '../../providers/imagesPreloader';

export class ShooterComponent {

  constructor(homeSection){
    this.homeSection = homeSection;
    this.gameTitle = 'My Shooter Game';
    this.shipsHeader = 'Available ships';
    this.content = document.getElementById('game_display');
    this.initUI();

    this.imagesPreloader = new ImagesPreloader(
        ['../img/warrior_1.png'],
        this.initCanvasManager()
    );

    console.log(this.imagesPreloader);
    // this.initCanvasManager([]);
    // add eventlisteners on play and pause buttons
    document.getElementById("play").addEventListener('click', _ => {
      let images = this.imagesPreloader.getImages();
      console.log(this.imagesPreloader._aImages);
      this.canvasManager.initShapesWithImages(images);
      this.startGame();
    });

    document.getElementById("pause").addEventListener('click', _ => {
      this.pauseGame();
    });
  }

  initCanvasManager(){
    console.log(this);
    console.log('loaded!!!!!!!!!!');
    try {
      this.canvasManager = new CanvasManager(
        document.getElementById('shooterCanvas').getContext("2d"),
        document.getElementById('shooterCanvas')
      );
    } catch(e){
      console.log(e.message, e.name);
    }
  }

  startGame(){
    this.canvasManager.draw();

    this.canvasManager.setKeyListeners();
    this.canvasManager.startAnimate();
  }

  pauseGame(){
    this.canvasManager.unsetKeyListeners();
    this.canvasManager.stopAnimate();
  }

  initUI(){
    if(this.content){
      this.content.parentNode.removeChild(this.content);
    }

    let pageSkeleton = this.getPageSkeleton();

    this.homeSection.insertAdjacentHTML('beforeEnd', pageSkeleton);
  }

  getPageSkeleton(){
    let data = {}
    data.gameTitle = this.gameTitle;
    data.shipsHeader = this.shipsHeader;

    return shooterSkeleton(data);
  }
}
