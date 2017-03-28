import { Component } from '@angular/core';
import { GooglePlus, Facebook, NativeStorage } from 'ionic-native';
import { NavController, LoadingController } from 'ionic-angular';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  FB_APP_ID: number = 1389573857770577;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFbLogin(){
    var band = {"band":"facebook"};
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.push(UserPage,band);
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  }

  doGoogleLogin(){
    var band = {"band":"google"};
  let nav = this.navCtrl;
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
  GooglePlus.login({
    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': '168082340103-techor81idkq73qb4flfic3dhbv907r5.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    'offline': true
  })
  .then(function (user) {
    loading.dismiss();

    NativeStorage.setItem('user', {
      name: user.displayName,
      email: user.email,
      picture: user.imageUrl
    })
    .then(function(){
      nav.push(UserPage,band);
    }, function (error) {
      console.log(error);
    })
  }, function (error) {
    loading.dismiss();
  });
}
}