import { Component } from '@angular/core';
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

    ionViewDidLoad() {
      console.log('ionViewDidLoad SigninPage');
    }

  onSignin(form:NgForm){
    //console.log(form.value);
    this.authService.signin(form.value.email,form.value.password)
      .then(data=> {
        console.log(data);
      })
      .catch(error=>{
        console.log(error);
      });
    }
  }
