// app/app.js
import { HomePage } from './pages/home/home.js';

class MyShooterApp {

  constructor(){
    this.appBody = document.getElementsByTagName('app')[0];
  }

  start(){
    let homePage = new HomePage(this.appBody);

    // let timer = setInterval( _ => {
    //   shooterPage.refreshCanvas();
    // }, 1000);
  }
}

let app = new MyShooterApp();

app.start();
