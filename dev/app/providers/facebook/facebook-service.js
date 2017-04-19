import { FB_APP_ID } from './fbapi-config'

export class FaceBookService {
  constructor(statusCallback){
      this.FB_APP_ID = FB_APP_ID;
      this.authResponse = null;
      this.isConnected = false;
      this.statusCallback = statusCallback;
  }

  checkLoginState(){
    FB.getLoginStatus((response) => this.statusChangeCallback(response));
  }

  logout(){
    this.isConnected = false;
    FB.logout((response) => this.handleLogoutCallback(response));
  }

  handleLogoutCallback(response){
    console.log(response);
  }

  statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    console.log(response);
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      // if(this.authResponse !== null)
      this.authResponse = response.authResponse;
      this.userId = response.authResponse.userID;
      this.accessToken = response.authResponse.accessToken;
      this.isConnected = true;
      this.statusCallback(response);

    }
    else {
      // The person is not logged into your app or we are unable to tell.
      FB.login(function(response){
        console.log(response);
      }, {scope: 'user_friends, user_photos'});
    }

  }

  fetchAvatars(callback){
    FB.api(this.userId + '/albums', function (response) {
      console.log('Got friends: ', response.data);
    });
  }

}
