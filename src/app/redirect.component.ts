import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  template: `Finalizing Login`
})
export class RedirectComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.loginUser();
    this.router.navigateByUrl('home');
  }

}
