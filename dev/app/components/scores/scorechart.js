import { scoreChartSkeleton } from './scorechart.ui';
import { clearComponents } from '../clear-components';


export class ScoreChartComponent {
  constructor(homeSection, firebaseService){
    this.homeSection = homeSection;
    this.firebaseService = firebaseService;
    this.initUI();
    this.firebaseService.getPlayers().then(result => {
      result.forEach((current) => {

        document.getElementById('scoresList').innerHTML += '<li>'+ current.name +'</li>';

        console.log(current.val());
      });
    });
  }

  initUI(){
    clearComponents();

    let pageSkeleton = this.getPageSkeleton();
    this.homeSection.insertAdjacentHTML('beforeEnd', pageSkeleton);
  }

  getPageSkeleton(){
    let data = {}

    return scoreChartSkeleton(data);
  }
}
