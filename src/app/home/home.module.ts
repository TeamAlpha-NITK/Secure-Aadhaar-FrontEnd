import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent, RequestAadhaarComponent, ViewAadhaarComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatButtonModule, MatCardModule, MatTabsModule, MatSnackBar,
   MatSnackBarModule, MatDialogModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { SecureAadhaarApiService } from '../services/secure-aadhaar-api.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    HttpModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      }
    ])
  ],
  declarations: [DashboardComponent, RequestAadhaarComponent, ViewAadhaarComponent],
  entryComponents: [RequestAadhaarComponent, ViewAadhaarComponent],
  providers: [SecureAadhaarApiService, CookieService, AuthService]
})
export class HomeModule { }
