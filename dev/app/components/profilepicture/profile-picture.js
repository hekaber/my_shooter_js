import { profilePictureSkeleton } from './profile-picture.ui';
import { clearComponents } from '../clear-components';
import { ShooterComponent } from '../shooter/shooter';

export class ProfilePictureComponent {
  constructor(mainContainer){
    this.mainContainer = mainContainer;
    this.pageTitle = 'Shoot my face!!!';
    this.contraints = { audio: false, video: { width: 500, height: 500 } };
    this.initUI();
    this.video = null;
    this.profilePicture = new Image();
    this.userMedia = navigator.mediaDevices.getUserMedia(this.contraints);
    console.log(this.userMedia);

    this.userMedia.then(
      (mediaStream) => {
        console.log(mediaStream);
        this.video = document.querySelector('video');
        this.video.srcObject = mediaStream;
        this.video.track = mediaStream.getTracks()[0];
        this.video.onloadedmetadata = (e) => {
          this.video.play();
        };
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); });

    document.getElementById('snapshot').addEventListener('click', _ => {
      let canvas = document.getElementById('pictCanvas');
      if(canvas){
        canvas.parentNode.removeChild(canvas);
      }

      document.getElementById('pictContainer').insertAdjacentHTML(
        'beforeEnd',
        `<canvas id="pictCanvas" width="200"></canvas>
         <div id="saveAndStart" class="customBtn">Save image and start</div>
        `
      );
      canvas = document.getElementById('pictCanvas');
      let context = canvas.getContext('2d');

      if(this.video){
        context.drawImage(this.video, 0, 0, 200, 150);
        this.profilePicture.src = canvas.toDataURL();
      }

      document.getElementById('saveAndStart').addEventListener('click', _ => {
          this.initShooter();
      });
    });
  }

  initUI(){
    clearComponents();

    let pageSkeleton = this.getPageSkeleton();

    this.mainContainer.insertAdjacentHTML('beforeEnd', pageSkeleton);

  }

  initShooter(){
    let profile_display = document.getElementById('profile_display');
    profile_display.parentNode.removeChild(profile_display);
    this.video.track.stop();
    this.shooter = new ShooterComponent(
      document.getElementById('home_content'),
      this.profilePicture
    );
  }

  getPageSkeleton(){
    let data = {};
    data.pageTitle = this.pageTitle;

    return profilePictureSkeleton(data);
  }

}
