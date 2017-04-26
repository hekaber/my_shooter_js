import { shooterSkeleton } from './shooter.ui';
import { clearComponents } from '../clear-components';
import { CanvasManager } from '../../js/canvas/canvasManager';
import { ImagesPreloader } from '../../providers/imagesPreloader';
import { AudioPreloader} from '../../providers/audioPreloader';


export class ShooterComponent {

  constructor(homeSection){
    this.homeSection = homeSection;
    this.gameTitle = 'My Shooter Game';
    this.shipsHeader = 'Available ships';
    this.content = document.getElementById('game_display');
    this.initUI();
    let images = null;
    let imagesPreloader = new ImagesPreloader(
        ['./img/warrior_1.png',
         './img/bullet_1.png',
         './img/drone_1_reverse.png',
         './img/BG.png',
         './img/heart.png',
         './img/expl_1.png',
         './img/expl_2.png',
         './img/expl_3.png',
         './img/expl_4.png',
         './img/expl_5.png',
         './img/expl_6.png',
         './img/expl_7.png',
         './img/expl_8.png',
         './img/expl_9.png',
         './img/expl_10.png',
         './img/expl_11.png'
        ]
    );
    imagesPreloader.load().then((loadedImages) => {
      this.initCanvasManager(loadedImages);
    });

    let audiosPreloader = new AudioPreloader(
      ['./audio/game_music.mp3',
       './audio/expl_01.mp3',
       './audio/expl_02.mp3',
       './audio/sfx_laser1.mp3'
      ]
    );

    audiosPreloader.load().then((loadedAudios) => {
      this.canvasManager.setAudios(loadedAudios);
      console.log(loadedAudios);
    });

    // add eventlisteners on play and pause buttons
    document.getElementById("play").addEventListener('click', _ => {
      this.canvasManager.createShip();
      this.startGame();
    });

    document.getElementById("pause").addEventListener('click', _ => {
      this.pauseGame();
    });
  }

  initCanvasManager(images){
    try {
      this.canvasManager = new CanvasManager(
        document.getElementById('shooterCanvas').getContext("2d"),
        document.getElementById('shooterCanvas'),
        images
      );


    } catch(e){
      console.log(e.message, e.name);
    }
  }

  startGame(){
    this.canvasManager.draw();

    this.canvasManager.setKeyListeners();
    this.canvasManager.startAnimate();
    this.canvasManager.startAudio();
  }

  pauseGame(){
    this.canvasManager.unsetKeyListeners();
    this.canvasManager.pauseAudio();
    this.canvasManager.stopAnimate();
  }

  initUI(){
    if(this.content){
      this.content.parentNode.removeChild(this.content);
    }

    clearComponents();

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
