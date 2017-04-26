import { aboutSkeleton } from './about.ui';
import { clearComponents } from '../clear-components';

export class AboutComponent {
  constructor(mainContainer){
    this.mainContainer = mainContainer;
    this.pageTitle = 'About';
    this.initUI();
  }

  initUI(){
    clearComponents();

    let pageSkeleton = this.getPageSkeleton();

    this.mainContainer.insertAdjacentHTML('beforeEnd', pageSkeleton);

  }

  getPageSkeleton(){
    let data = {};
    data.pageTitle = this.pageTitle;

    return aboutSkeleton(data);
  }

}
