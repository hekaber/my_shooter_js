// app/app.js
import { HomePage } from './pages/home/home.js';

class MyShooterApp {

  constructor(){
    this.appBody = document.getElementsByTagName('app')[0];
  }

  start(){
    let homePage = new HomePage(this.appBody);
  }
}

let app = new MyShooterApp();

app.start();
