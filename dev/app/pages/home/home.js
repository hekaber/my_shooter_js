// dev/app/pages/home/home.js
import { homeSkeleton } from './home.ui';
import { ShooterComponent } from '../../components/shooter/shooter';
import { ProfilePictureComponent } from '../../components/profilepicture/profile-picture';
import { ScoreChartComponent } from '../../components/scores/scorechart';
import { AboutComponent } from '../../components/about/about';
import { UnsplashService } from '../../providers/unsplash/unsplash-service';
import { FirebaseService } from '../../providers/firebase/firebase-service';

export class HomePage {
  constructor(appBody){
    this.appBody = appBody;
    this.pageTitle = 'My Shooter';
    this.firebaseService = new FirebaseService();

    this.initUI();

    document.getElementById('startBtn').addEventListener('click', _ => {
      this.initProfilePicture();
        // this.initShooter();
    });

    document.getElementById('scoresBtn').addEventListener('click', _ => {
      this.initScores();
    });
    document.getElementById('aboutBtn').addEventListener('click', _ => {
      this.initAbout();
    });
  }

  initUI(){
    let section = document.getElementsByTagName('section')[0];

    if(section){
      section.parentNode.removeChild(section);
    }

    let pageSkeleton = this.getPageSkeleton();

    this.appBody.insertAdjacentHTML('afterBegin', pageSkeleton);

    this.getBackgroundIMG();

  }

  initShooter(){
    this.shooter = new ShooterComponent(document.getElementById('home_content'));
  }

  initProfilePicture(){
      this.profilePicture = new ProfilePictureComponent(document.getElementById('home_content'));
  }

  initScores(){
    this.scoreChart = new ScoreChartComponent(document.getElementById('home_content'), this.firebaseService);
  }

  initAbout(){
    this.about = new AboutComponent(document.getElementById('home_content'));
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

      let img = new Image();
      img.src = data[0].urls.regular;

      pageContainer.style.background = `url(${data[0].urls.regular}) center center no-repeat`;
      pageContainer.style.backgroundSize = `cover`;

      img.addEventListener('load', event => {
        pageContainer.classList.add('fadeIn');
      });

    }
  }
}
