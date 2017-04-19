import { FaceBookService } from '../../providers/facebook/facebook-service';
import { facebookSkeleton } from './facebook.ui';

export class FacebookComponent {
  constructor(homeSection){
    this.homeSection = homeSection;
    this.title = 'Facebook interface';
    this.content = document.getElementById('fb_display');
    this.initUI();
    this.fbService = new FaceBookService(this.serviceCallback);

    document.getElementById("fblogin").addEventListener('click', _=> {
      this.fbService.checkLoginState();
      // if(this.fbService.isConnected){
      //   this.fbService.logout();
      //   document.getElementById('fblogin').innerHTML = "Login with Facebook";
      // }
    });

    document.getElementById('getfriends').addEventListener('click', _ => {
      this.fbService.fetchAvatars((response) => this.displayAvatars(response));
    });
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
    data.title = this.title;

    return facebookSkeleton(data);
  }

  serviceCallback(response){
    if(response.status === "connected"){
        document.getElementById('status').innerHTML =
          'You are connected with your facebook account!';
        document.getElementById('fblogin').innerHTML = "Logout";
    }
    else {
      document.getElementById('status').innerHTML =
        'Please log into this app.';
    }
  }

  displayAvatars(response){
    
  }

  updateLoginState(){

  }
}
