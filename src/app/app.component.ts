import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = LoginPage;
  
  @ViewChild(Nav) nav: Nav;
  //rootPage: any;

  constructor(platform: Platform) {
    platform.ready().then(() => {
     let env = this;
      NativeStorage.getItem('user')
      .then( function (data) {
        // user is previously logged and we have his data
        // we will let him access the app
        env.nav.push(UserPage);
        Splashscreen.hide();
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        env.nav.push(LoginPage);
        Splashscreen.hide();
      });

      StatusBar.styleDefault();
    });
  }
}
