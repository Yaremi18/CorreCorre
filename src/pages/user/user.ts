import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { GooglePlus,Facebook, NativeStorage } from 'ionic-native';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {
  user: any;
  band : string;
  userReady: boolean = false;

  constructor(public navCtrl: NavController, public param:NavParams) {
    this.band = param.get('band');
  }

  ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
        env.userReady = true;
    }, function(error){
      console.log(error);
    });
  }

  doLogout(){
    if(this.band == 'facebook'){
      this.doFbLogout();
    }else{
      this.doGoogleLogout();
    }
  }

  doFbLogout(){
    var nav = this.navCtrl;
    Facebook.logout()
    .then(function(response) {
      //user logged out so we will remove him from the NativeStorage
      NativeStorage.remove('user');
      nav.push(LoginPage);
    }, function(error){
      console.log(error);
    });
  }

  doGoogleLogout(){
  let nav = this.navCtrl;
  GooglePlus.logout()
  .then(function (response) {
    NativeStorage.remove('user');
    nav.push(LoginPage);
  },function (error) {
    console.log(error);
  })
}
}