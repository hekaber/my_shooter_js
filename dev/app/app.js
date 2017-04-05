// app/app.js
import { HomePage } from './pages/home/home.js';
import { ShooterPage } from './pages/shooter/shooter.js';
import { UnsplashService } from './providers/unsplash/unsplash-service.js';

class MyShooterApp {

  constructor(){
    this.appBody = document.getElementsByTagName('app')[0];
    this.body = document.getElementsByTagName('body')[0];
  }

  start(){
    let homePage = new HomePage(this.appBody);
    let shooterPage = new ShooterPage(this.appBody);
    let unsplashService = new UnsplashService();

    unsplashService.getRandomImg().then((value) => {
      var jsonResponse = JSON.parse(value);
      console.log(jsonResponse);
    }

    );

    console.log(shooterPage.ctx);

    let timer = setInterval( _ => {
      shooterPage.refreshCanvas();
    }, 1000);
  }
}

let app = new MyShooterApp();

app.start();
