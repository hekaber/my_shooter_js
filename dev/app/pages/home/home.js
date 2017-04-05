// dev/app/pages/home/home.js
import {homeSkeleton} from './home.ui';

export class HomePage {
  constructor(appBody){
    this.appBody = appBody;
    this.pageTitle = 'My Shooter';
    this.initUI();
  }

  initUI(){

    if(document.getElementsByTagName('section')[0]){
      document.getElementsByTagName('section')[0]
      .parentNode.removeChild(document.getElementsByTagName('section')[0]);
    }

    let pageSkeleton = this.getPageSkeleton();

    this.appBody.insertAdjacentHTML('afterBegin', pageSkeleton);
  }

  getPageSkeleton(){
    let data = {};
    data.pageTitle = this.pageTitle;
    data.gameTitle = this.gameTitle;

    return homeSkeleton(data);
  }
}
