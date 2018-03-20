import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([{
      path: '',
      component: WelcomeComponent
    }])
  ],
  declarations: [WelcomeComponent]
})
export class LandingPageModule {
  constructor(private router: Router) { }
}
