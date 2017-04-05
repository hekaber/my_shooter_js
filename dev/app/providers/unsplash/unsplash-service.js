import {API_KEY} from './apiKey-config';

export class UnsplashService {
  constructor(){
    this.API_KEY = API_KEY;
    this.providerURL = "https://api.unsplash.com/photos/random?count=1&client_id=";
  }

  getRandomImg(){
    return new Promise(
      (resolve, reject) => {

          let req = new XMLHttpRequest();
          req.open('GET', this.providerURL + this.API_KEY, true);

          req.onload = () => {
            if(req.status == 200){
              resolve(req.responseText);
            }
            else {
              reject(Error(req.statusText));
            }
          };

          req.onerror = () => {
            reject(Error("Network error!!"));
          };

          req.send();
      });
  }
}
