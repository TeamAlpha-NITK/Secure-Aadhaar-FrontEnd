import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule, MatTabsModule } from '@angular/material';
import { SecureAadhaarApiService } from '../services/secure-aadhaar-api.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    HttpModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      }
    ])
  ],
  declarations: [DashboardComponent],
  providers: [SecureAadhaarApiService]
})
export class HomeModule { }
