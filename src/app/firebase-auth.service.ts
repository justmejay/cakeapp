import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    public angularFireAuth: AngularFireAuth
  ) { }

  signInWithEmail(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
  signUpWithEmail(email: string, password: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }
    
}
