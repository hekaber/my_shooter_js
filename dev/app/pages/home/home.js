// dev/app/pages/home/home.js
import {homeSkeleton} from './home.ui';
import { ShooterPage } from '../shooter/shooter.js';
import { UnsplashService } from '../../providers/unsplash/unsplash-service.js';

export class HomePage {
  constructor(appBody){
    this.appBody = appBody;
    this.pageTitle = 'My Shooter';
    this.initUI();
    this.initShooterPage();

  }

  initUI(){
    let section = document.getElementsByTagName('section')[0]
    if(section){
      section.parentNode.removeChild(section);
    }

    let pageSkeleton = this.getPageSkeleton();

    this.appBody.insertAdjacentHTML('afterBegin', pageSkeleton);

    this.getBackgroundIMG();

  }

  initShooterPage(){
    this.shooterPage = new ShooterPage(document.getElementsByTagName('section')[0]);
    this.shooterPage.refreshCanvas();
  }

  getPageSkeleton(){
    let data = {};
    data.pageTitle = this.pageTitle;
    data.gameTitle = this.gameTitle;

    return homeSkeleton(data);
  }

  getBackgroundIMG(){
    let unsplashService = new UnsplashService();

    unsplashService.getRandomImg().then((value) => {
      var jsonResponse = JSON.parse(value);
      this.displayBackground(jsonResponse);
    });
  }

  displayBackground(data){
    // console.log('service response-> ')
    // console.log( data[0] )
    let pageContainer = document.getElementsByTagName("section")[0]
    if(pageContainer){
      // some css with JS for BG
      pageContainer.style.height = `100%`;
      pageContainer.style.width = `100%`;
      pageContainer.style.position = `absolute`;
      pageContainer.style.top = `0`;
      pageContainer.style.left = `0`;
      pageContainer.style.padding = `0px`;
      pageContainer.style.textAlign = `center`;
      pageContainer.style.color = `#fff`;
      pageContainer.style.opacity = `1`;
      pageContainer.style.background = `url(${data[0].urls.regular}) center center no-repeat`;
      pageContainer.style.backgroundSize = `cover`;

    }
  }
}
