import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {AuthService} from "../../services/auth";



@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  constructor(private authService: AuthService ) {
  }

  onSignin(form:NgForm){
    console.log(form.value);
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
