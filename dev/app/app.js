// app/app.js
import { HomePage } from './pages/home/home.js';
import { ShooterPage } from './pages/shooter/shooter.js';

class MyShooterApp {

  constructor(){
    this.appBody = document.getElementsByTagName('app')[0];
  }

  start(){
    let homePage = new HomePage(this.appBody);
    let shooterPage = new ShooterPage(this.appBody);
    console.log(shooterPage.ctx);

    let timer = setInterval( _ => {
      shooterPage.refreshCanvas();
    }, 1000);
  }
}

let app = new MyShooterApp();

app.start();
