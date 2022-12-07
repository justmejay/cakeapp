import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router: Router
  ) {
    this.initializeApp()
  }

  initializeApp(){    
    if (!localStorage.getItem('welcome')) {
      localStorage.setItem('welcome', 'true');
      this.router.navigateByUrl('/welcome');
    }else{
      this.router.navigateByUrl('/splash');
    }
    
  }
}
