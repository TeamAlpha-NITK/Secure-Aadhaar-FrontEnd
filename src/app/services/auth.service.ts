import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  isUserLoggedIn = true;

  constructor() {
    if (localStorage.getItem('Logged-In')) {
      this.isUserLoggedIn = true;
    }
  }

  loginUser() {
    localStorage.getItem('Logged-In');
    this.isUserLoggedIn = true;
  }

  isLoggedIn() {
    return this.isUserLoggedIn;
  }
}
