import { gameTitleSkeleton } from './gametitle.ui';
import { ShooterComponent } from '../shooter/shooter.js';

export class GameTitleComponent {
  constructor(homeSection){
    this.homeSection = homeSection;
    this.initUI();

    document.getElementById('playBtn').addEventListener('click', _ => {
        this.initShooter();
    });
  }

  initUI(){
    if(this.content){
      this.content.parentNode.removeChild(this.content);
    }

    let pageSkeleton = this.getPageSkeleton();

    this.homeSection.insertAdjacentHTML('beforeEnd', pageSkeleton);
  }

  initShooter(){
    this.shooter = new ShooterComponent(document.getElementsByTagName('section')[0]);
  }

  getPageSkeleton(){
    let data = {}

    return gameTitleSkeleton(data);
  }

}
