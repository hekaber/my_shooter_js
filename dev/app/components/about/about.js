import { aboutSkeleton } from './about.ui';

export class AboutComponent {
  constructor(mainContainer){
    this.mainContainer = mainContainer;
    this.pageTitle = 'About';
    this.initUI();
  }

  initUI(){
    let divContent = document.getElementById('home_content');
    if(divContent){
      divContent.parentNode.removeChild(divContent);
    }

    let pageSkeleton = this.getPageSkeleton();

    this.mainContainer.insertAdjacentHTML('beforeEnd', pageSkeleton);

  }

  getPageSkeleton(){
    let data = {};
    data.pageTitle = this.pageTitle;

    return aboutSkeleton(data);
  }

}
