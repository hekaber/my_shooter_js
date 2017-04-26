import { config } from './firebase-config';
import * as firebase from "firebase";

export class FirebaseService {
  constructor(){
    this.config = config;
    this.app = firebase.initializeApp(this.config);
    this.database = this.app.database();
    this.playerRef = this.database.ref('players');
  }

  getPlayers(){
    return this.playerRef.orderByChild('best_score').once("value");
  }

  writePlayerData(name, level, best_score, last_score) {
    let newPlayerKey = firebase.database().ref().child('players').push().key;
    this.database.ref('players/' + newPlayerKey).set({
      name: name,
      email: email,
      best_score : best_score,
      last_score : last_score
    });
  }
}
