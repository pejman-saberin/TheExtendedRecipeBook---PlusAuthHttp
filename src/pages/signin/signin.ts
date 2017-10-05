import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoadingController, AlertController} from 'ionic-angular'

import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController ) {
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SigninPage');
    }

  onSignin(form:NgForm){
    //console.log(form.value);
    const loading=this.loadingCtrl.create({
      content: 'Signing you in ...'
    })
    this.authService.signin(form.value.email,form.value.password)
      .then(data=> {

        loading.dismiss();
      })
      .catch(error=>{
        loading.dismiss();
        const alert=this.alertCtrl.create({
          title: 'Signin failed',
          message: error.message,
          buttons: ['ok']
        });
        alert.present ();
      });
    }
  }
