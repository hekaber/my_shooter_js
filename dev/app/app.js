// app/app.js
import { HomePage } from './pages/home/home.js';
import { FB_APP_ID } from './providers/facebook/fbapi-config';

class MyShooterApp {

  constructor(){
    this.appBody = document.getElementsByTagName('app')[0];
  }

  start(){
    let homePage = new HomePage(this.appBody);
    //init facebook SDK
    window.fbAsyncInit = function() {
      FB.init({
        appId      : FB_APP_ID,
        xfbml      : true,
        version    : 'v2.8'
      });
      FB.AppEvents.logPageView();
    };

    this.insertFBAPI();
  }

  insertFBAPI(){
    let js, ref;
    let id = 'facebook-jssdk';

    ref = document.getElementsByTagName('script')[0];
    if (document.getElementById(id)) {return;}
    js = document.createElement('script');
    js.id = id;
    js.src = "//connect.facebook.net/fr_FR/sdk.js";
    ref.parentNode.insertBefore(js, ref);
  }
}

let app = new MyShooterApp();

app.start();
