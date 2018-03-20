import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SecureAadhaarApiService } from '../../services/secure-aadhaar-api.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  genders = [
    'MALE',
    'FEMALE',
    'OTHER'
  ];

  myform: FormGroup;

  issueAadhaarRequest() {
    console.log(this.myform.value);
    this.aadhaarService.issueAadhaarRequest(this.myform.value).subscribe(resp => {
      if (resp.success) {
        const success = this.snackbar.open('You have successfully registered!', 'Login', {duration: 5000});
        success.onAction().subscribe(() => {
          // this.router.navigateByUrl('/login');
          success.dismiss();
        });
      }
    });
  }

  constructor(private aadhaarService: SecureAadhaarApiService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.myform = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dob: new FormGroup({
        date: new FormControl('', Validators.required),
        month: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
      }),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ]),
      address: new FormControl('', Validators.required),
      gender: new FormControl()
    });
  }

}
