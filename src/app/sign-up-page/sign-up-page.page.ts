import { Component, OnInit } from '@angular/core';


import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FirebaseAuthService } from '../firebase-auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.page.html',
  styleUrls: ['./sign-up-page.page.scss'],
})
export class SignUpPagePage implements OnInit {
  signUpForm: FormGroup
   validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  constructor(
    public angularFire: AngularFireAuth,
    public router: Router,
    public authService: FirebaseAuthService,
    public toastController: ToastController
  ) { 

    this.signUpForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  signUpWithEmail(){
    this.authService.signUpWithEmail(this.signUpForm.value['email'], this.signUpForm.value['password'])
    .then(user => {
      // navigate to user profile
      console.log("Account Created!", user.user.uid)
      this.router.navigate(["/home"]);
    })
    .catch(error => {
      if(error.code == "auth/email-already-in-use"){
        this.presentToast("Email is already used!")
      }
      
    });
   }
  
   async presentToast(errorMessage) {
    const toast = await this.toastController.create({
      message: errorMessage,
      duration: 3000,
      cssClass: 'custom-toast',
      position: 'top',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });
  
    await toast.present();
  }
  


  



  ngOnInit() {
  }

}
function signUpWithEmail() {
  throw new Error('Function not implemented.');
}

