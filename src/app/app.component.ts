import { Component,ViewChild } from '@angular/core';
import { Platform, NavController,MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import firebase from  'firebase';


import {TabsPage} from "../pages/tabs/tabs";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from "../services/auth";

//import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;  //:any is important, I forgot to add it before, changing this to rootpage is important because when firebase makes a call, the call finishes before the page is loaded: video 156
  signinPage=SigninPage;
  signupPage=SignupPage;
  isAuthenticated=false;



  @ViewChild('nav')nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl:MenuController,
              private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyDaVXoCfCisRwFYgIihU228AC2ksxOwpNU",
      authDomain: "ionic-recipebpook.firebaseapp.com",
    });
     //for managing user state
    firebase.auth().onAuthStateChanged(user=>{
      if (user){
        this.isAuthenticated=true;
        //this.nav.setRoot(this.tabsPage);
        this.rootPage=TabsPage;//you can't user nav.setRoot here yet -->changing this to rootpage is important because when firebase makes a call, the call finishes before the page is loaded: video 156
      }else{
        this.isAuthenticated=false;
        //this.nav.setRoot(this.signinPage);
        this.rootPage=SigninPage;//you can't user nav.setRoot here yet -->changing this to rootpage is important because when firebase makes a call, the call finishes before the page is loaded: video 156
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page:any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(){
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage); //navigate to signin page once you are loggedout
  }
}
