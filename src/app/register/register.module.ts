import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueComponent } from './issue/issue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule, MatSidenavModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatSnackBarModule
} from '@angular/material';
import { SecureAadhaarApiService } from '../services/secure-aadhaar-api.service';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpModule,
    RouterModule.forChild([{
      path: 'issue',
      component: IssueComponent
    }])
  ],
  declarations: [IssueComponent],
  providers: [SecureAadhaarApiService]
})
export class RegisterModule { }
