import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `Logging you in`
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.location.href = 'https://52.226.34.85:3000/auth/github';
  }

}
