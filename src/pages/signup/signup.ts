import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoadingController, AlertController} from 'ionic-angular'


import {AuthService} from "../../services/auth";



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(private authService: AuthService, private loadingCtrl:LoadingController, private alertCtrl: AlertController){}
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form:NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing you up:...'
    });
    loading.present();
    //console.log(form.value);
    this.authService.signup(form.value.email,form.value.password)
      .then(data=> {
        loading.dismiss();
      })
      .catch(error=>{
        loading.dismiss();
        const alert=this.alertCtrl.create({
          title:'Signup failed',
          message:error.message,
          buttons: ['ok']
        });
        alert.present();
      });
  }
}
