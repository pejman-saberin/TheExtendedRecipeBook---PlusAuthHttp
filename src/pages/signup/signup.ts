import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
 

import {AuthService} from "../../services/auth";



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(private authService: AuthService){}
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form:NgForm){
    //console.log(form.value);
    this.authService.signup(form.value.email,form.value.password)
      .then(data=> console.log(data) )
      .catch(error=>console.log(error));
  }



}
