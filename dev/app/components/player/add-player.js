import { addPlayerSkeleton } from './add-player.ui';
import { ShooterComponent } from '../../components/shooter/shooter';


export class AddPlayerComponent {
  constructor(homeContent){
    this.homeContent = homeContent;
    this.pageTitle = 'Add new player';
    this.initUI();

    document.getElementById('addPlayer').addEventListener('click', _ => {
      // TODO call firebase service to add new player
      this.initShooter();
    });

  }

  initUI(){
    let divContent = document.getElementsById('home_content');
    if(divContent){
      section.parentNode.removeChild(divContent);
    }

    let pageSkeleton = this.getPageSkeleton();

    this.appBody.insertAdjacentHTML('afterBegin', pageSkeleton);

  }

  initShooter(){
    this.shooter = new ShooterComponent(document.getElementsByTagName('section')[0]);
  }

  getPageSkeleton(){
    let data = {};
    data.pageTitle = this.pageTitle;

    return addPlayerSkeleton(data);
  }

}
